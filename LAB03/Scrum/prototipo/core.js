/* Lógica de negocio pura del prototipo INVENTA.
 * No incluye autenticación ni seguridad multiusuario. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.InventoryCore = api;
})(this, function () {
  function numeric(value, label, integer = false) {
    const n = Number(value);
    if (value === '' || value === null || value === undefined || !Number.isFinite(n) || n < 0 || (integer && !Number.isInteger(n))) {
      throw new Error(label + ': ingresa un número válido no negativo' + (integer ? ' y entero.' : '.'));
    }
    return n;
  }
  function positiveInt(value, label) {
    const n = numeric(value, label, true);
    if (n === 0) throw new Error(label + ': debe ser mayor que cero.');
    return n;
  }
  function validateProduct(raw, products, editingId) {
    const code = String(raw.code || '').trim().toUpperCase();
    const name = String(raw.name || '').trim();
    const category = String(raw.category || '').trim();
    if (!code || !name || !category) throw new Error('Código, nombre y categoría son obligatorios.');
    if (products.some(p => p.code.toUpperCase() === code && p.id !== editingId)) throw new Error('Ya existe un producto con ese código (también puede estar eliminado; restáuralo).');
    return { code, name, category, price: numeric(raw.price, 'Precio'), min: numeric(raw.min, 'Stock mínimo', true) };
  }
  function registerProduct(state, raw, editingId, timestamp) {
    const values = validateProduct(raw, state.products, editingId);
    const now = timestamp || new Date().toISOString();
    const products = state.products.slice();
    const movements = state.movements.slice();
    if (editingId) {
      const i = products.findIndex(p => p.id === editingId);
      if (i < 0) throw new Error('Producto no encontrado.');
      if (products[i].deletedAt) throw new Error('No se puede editar un producto eliminado. Restáuralo primero.');
      products[i] = { ...products[i], ...values };
    } else {
      const initial = numeric(raw.stock, 'Stock inicial', true);
      const id = 'p_' + Math.random().toString(36).slice(2, 11);
      products.push({ id, ...values, stock: initial, deletedAt: null });
      if (initial > 0) movements.unshift({ id:'m_' + Math.random().toString(36).slice(2, 11), productId:id, productCode:values.code, productName:values.name, type:'Inicial', delta:initial, reason:'Alta de producto', at:now });
    }
    return { ...state, products, movements };
  }
  // Baja lógica: las ventas y movimientos históricos no se destruyen.
  function activeProducts(state) { return state.products.filter(p => !p.deletedAt); }
  function deleteProduct(state, productId, timestamp) {
    const p = state.products.find(item => item.id === productId);
    if (!p) throw new Error('Producto no encontrado.');
    if (p.deletedAt) throw new Error('El producto ya fue eliminado.');
    return { ...state, products:state.products.map(item => item.id === productId ? { ...item, deletedAt:timestamp || new Date().toISOString() } : item) };
  }
  function restoreProduct(state, productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) throw new Error('Producto no encontrado.');
    if (!p.deletedAt) throw new Error('El producto ya está activo.');
    return { ...state, products:state.products.map(item => item.id === productId ? { ...item, deletedAt:null } : item) };
  }
  function moveStock(state, productId, kind, amount, reason, timestamp) {
    const quantity = positiveInt(amount, 'Cantidad');
    const products = state.products.slice();
    const i = products.findIndex(p => p.id === productId);
    if (i < 0) throw new Error('Selecciona un producto válido.');
    if (products[i].deletedAt) throw new Error('No se permiten movimientos de un producto eliminado.');
    if (kind !== 'Entrada' && kind !== 'Ajuste') throw new Error('Tipo de movimiento inválido.');
    if (kind === 'Ajuste' && !String(reason && reason.text || '').trim()) throw new Error('El ajuste requiere un motivo.');
    const delta = kind === 'Entrada' ? quantity : Number(reason && reason.deltaSign) === -1 ? -quantity : quantity;
    if (products[i].stock + delta < 0) throw new Error('El ajuste dejaría el stock negativo.');
    const p = products[i];
    products[i] = { ...p, stock:p.stock + delta };
    const movement = { id:'m_' + Math.random().toString(36).slice(2, 11), productId:p.id, productCode:p.code, productName:p.name, type:kind, delta, reason:kind === 'Entrada' ? 'Recepción de mercadería' : String(reason && reason.text || ''), at:timestamp || new Date().toISOString() };
    return { ...state, products, movements:[movement, ...state.movements] };
  }
  function registerSale(state, items, timestamp) {
    if (!Array.isArray(items) || items.length === 0) throw new Error('Agrega al menos un producto a la venta.');
    const combined = new Map();
    for (const item of items) {
      const q = positiveInt(item.quantity, 'Cantidad de venta');
      combined.set(item.productId, (combined.get(item.productId) || 0) + q);
    }
    const products = state.products.map(p => ({ ...p }));
    const lines = [];
    for (const [productId, quantity] of combined) {
      const p = products.find(p => p.id === productId);
      if (!p) throw new Error('Producto de venta no encontrado.');
      if (p.deletedAt) throw new Error('No se puede vender un producto eliminado.');
      if (p.stock < quantity) throw new Error('Stock insuficiente para ' + p.name + ': quedan ' + p.stock + '.');
      lines.push({ productId:p.id, code:p.code, name:p.name, quantity, unitPrice:p.price, subtotal:Math.round(p.price * quantity * 100)/100 });
    }
    const at = timestamp || new Date().toISOString();
    const saleId = 'v_' + Math.random().toString(36).slice(2, 11);
    const movements = [...state.movements];
    for (const line of lines) {
      const p = products.find(p => p.id === line.productId);
      p.stock -= line.quantity;
      movements.unshift({ id:'m_' + Math.random().toString(36).slice(2, 11), productId:p.id, productCode:p.code, productName:p.name, type:'Venta', delta:-line.quantity, reason:'Venta ' + saleId, at });
    }
    const total = Math.round(lines.reduce((sum, l) => sum + l.subtotal, 0) * 100)/100;
    return { ...state, products, movements, sales:[{id:saleId, at, lines, total}, ...state.sales] };
  }
  function stockStatus(p) { return p.stock === 0 ? 'Agotado' : p.stock <= p.min ? 'Bajo mínimo' : 'Disponible'; }
  function dateInRange(iso, from, to) { const d = new Date(iso); const day = [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); return (!from || day >= from) && (!to || day <= to); }
  function totals(state) {
    const products=activeProducts(state);
    return { products:products.length, low:products.filter(p=>p.stock <= p.min).length, units:products.reduce((n,p)=>n+p.stock,0), stockValue:Math.round(products.reduce((n,p)=>n+p.stock*p.price,0)*100)/100, revenue:Math.round(state.sales.reduce((n,s)=>n+s.total,0)*100)/100 };
  }
  function emptyState() { return { products:[], movements:[], sales:[] }; }
  function demoState() {
    let s = emptyState();
    for (const p of [
      {code:'P001', name:'Arroz extra 1 kg', category:'Abarrotes', price:'4.80', min:'5', stock:'20'},
      {code:'P002', name:'Azúcar rubia 1 kg', category:'Abarrotes', price:'4.20', min:'4', stock:'9'},
      {code:'P003', name:'Aceite vegetal 1 L', category:'Abarrotes', price:'9.50', min:'3', stock:'2'},
      {code:'P004', name:'Galletas de vainilla', category:'Snacks', price:'1.80', min:'6', stock:'0'}
    ]) s=registerProduct(s,p);
    return s;
  }
  return { numeric, positiveInt, registerProduct, activeProducts, deleteProduct, restoreProduct, moveStock, registerSale, stockStatus, dateInRange, totals, emptyState, demoState };
});
