/* INVENTA · Gestión de inventarios. Interfaz sin dependencias externas. */
(()=>{
'use strict';
const C=window.InventoryCore;
const KEY='gsti_lab03_inventa_v1'; // misma clave para conservar datos existentes
let state=load();
let cart=[];
let pendingDeleteId=null;
const $=id=>document.getElementById(id);
const money=n=>'S/ '+Number(n||0).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});
const when=iso=>new Date(iso).toLocaleString('es-PE',{dateStyle:'short',timeStyle:'short'});
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&Array.isArray(s.products)&&Array.isArray(s.movements)&&Array.isArray(s.sales))return s;}catch(e){}return C.emptyState();}
function save(){localStorage.setItem(KEY,JSON.stringify(state));renderAll();}
function notify(message,error=false){const el=$('toast');el.textContent=message;el.className='toast'+(error?' error':'');clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.add('hidden'),4200);}
function action(fn){try{fn();}catch(e){notify(e.message||'Ocurrió un error.',true);}}
function emptyTable(n,text='Todavía no hay registros.'){return `<tr><td colspan="${n}" class="empty">${esc(text)}</td></tr>`;}
function statusPill(p){const s=C.stockStatus(p);return `<span class="pill ${s==='Disponible'?'green':s==='Agotado'?'red':'amber'}">${s}</span>`;}
function showTab(id){document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));const active=document.querySelector('.nav[data-tab="'+id+'"]');if(active)$('breadcrumbCurrent').textContent=active.textContent.trim();window.scrollTo(0,0);renderAll();}
function renderStats(){const t=C.totals(state);const items=[['Productos registrados',t.products,'Catálogo disponible','▣'],['Unidades en stock',t.units,'Existencias actuales','▥'],['Productos bajo mínimo',t.low,'Incluye agotados','!'],['Valor del inventario',money(t.stockValue),'Precio de venta × stock','S/']];$('stats').innerHTML=items.map(([label,val,detail,ic])=>`<div class="stat"><div class="stat-top"><span class="label">${label}</span><span class="stat-icon">${ic}</span></div><strong>${val}</strong><span class="detail">${detail}</span></div>`).join('');
const low=C.activeProducts(state).filter(p=>p.stock<=p.min);$('lowStock').innerHTML=low.length?`<ul class="minirows">${low.map(p=>`<li><span><b>${esc(p.name)}</b><br><small>${esc(p.code)}</small></span><span>${statusPill(p)} <b>${p.stock}</b></span></li>`).join('')}</ul>`:'<div class="empty">No hay productos con stock bajo.</div>';
$('latestMoves').innerHTML=state.movements.length?`<ul class="minirows">${state.movements.slice(0,6).map(m=>`<li><span><b>${esc(m.productName)}</b><br><small>${esc(m.type)} · ${when(m.at)}</small></span><b class="${m.delta>0?'positive':'negative'}">${m.delta>0?'+':''}${m.delta}</b></li>`).join('')}</ul>`:'<div class="empty">No se han registrado movimientos.</div>';
}
function renderProducts(){
  const term=$('search').value.trim().toLocaleLowerCase();
  const showDeleted=$('showDeleted').checked;
  const products=state.products.filter(p=>(showDeleted||!p.deletedAt) && (p.code+' '+p.name+' '+p.category).toLocaleLowerCase().includes(term));
  const deletedCount=state.products.filter(p=>p.deletedAt).length;
  $('archivedCount').textContent=deletedCount ? `(${deletedCount})` : '';
  $('productRows').innerHTML=products.length?products.map(p=>`<tr class="${p.deletedAt?'archived-row':''}"><td><b>${esc(p.code)}</b></td><td>${esc(p.name)}</td><td>${esc(p.category)}</td><td>${money(p.price)}</td><td><b>${p.stock}</b> / mín. ${p.min}</td><td>${p.deletedAt?'<span class="pill gray">Eliminado</span>':statusPill(p)}</td><td><div class="table-actions">${p.deletedAt?`<button class="btn secondary mini" type="button" data-restore="${esc(p.id)}">↺ Restaurar</button>`:`<button class="btn secondary mini" type="button" data-edit="${esc(p.id)}">Editar</button><button class="btn mini danger-outline" type="button" data-delete="${esc(p.id)}">Eliminar</button>`}</div></td></tr>`).join(''):emptyTable(7,'No se encontraron productos.');
  const active=C.activeProducts(state);
  const options=active.map(p=>`<option value="${esc(p.id)}">${esc(p.code)} · ${esc(p.name)} (${p.stock} un.)</option>`).join('');
  for(const id of ['stockProduct','saleProduct']){const el=$(id),old=el.value;el.innerHTML='<option value="">Seleccionar producto</option>'+options;if(active.some(p=>p.id===old))el.value=old;}
}
function renderStock(){ $('stockRows').innerHTML=state.movements.length?state.movements.slice(0,35).map(m=>`<tr><td>${when(m.at)}</td><td>${esc(m.productName)}</td><td>${esc(m.type)}</td><td class="${m.delta>=0?'positive':'negative'}">${m.delta>0?'+':''}${m.delta}</td><td>${esc(m.reason)}</td></tr>`).join(''):emptyTable(5); }
function renderCart(){const valid=cart.filter(i=>state.products.some(p=>p.id===i.productId && !p.deletedAt));cart=valid;const lines=cart.map(i=>{const p=state.products.find(p=>p.id===i.productId);return {...i,p,sub:p.price*i.quantity};});$('cartRows').innerHTML=lines.length?lines.map(i=>`<tr><td>${esc(i.p.name)}</td><td>${i.quantity}</td><td>${money(i.p.price)}</td><td>${money(i.sub)}</td><td><button type="button" class="btn mini danger" data-remove="${esc(i.productId)}">Quitar</button></td></tr>`).join(''):emptyTable(5,'Añade productos para iniciar una venta.');$('cartTotal').textContent=money(lines.reduce((a,i)=>a+i.sub,0));}
function renderSales(){$('saleRows').innerHTML=state.sales.length?state.sales.map(s=>`<tr><td>${when(s.at)}</td><td><small>${esc(s.id)}</small></td><td>${s.lines.map(l=>esc(l.name)+' × '+l.quantity).join(', ')}</td><td><b>${money(s.total)}</b></td></tr>`).join(''):emptyTable(4);}
function renderReports(){const from=$('dateFrom').value,to=$('dateTo').value;const moves=state.movements.filter(m=>C.dateInRange(m.at,from,to));const sales=state.sales.filter(s=>C.dateInRange(s.at,from,to));const total=sales.reduce((a,s)=>a+s.total,0);$('reportStats').innerHTML=[['Movimientos',moves.length,'Durante el período'],['Unidades de entradas',moves.filter(m=>m.delta>0).reduce((a,m)=>a+m.delta,0),'Incluye ajustes positivos'],['Ventas',sales.length,'Transacciones'],['Importe vendido',money(total),'Total de ventas filtradas']].map(([l,v,d])=>`<div class="stat"><div class="stat-top"><span class="label">${l}</span></div><strong>${v}</strong><span class="detail">${d}</span></div>`).join('');$('reportMoveRows').innerHTML=moves.length?moves.map(m=>`<tr><td>${when(m.at)}</td><td>${esc(m.productName)}</td><td>${esc(m.type)}</td><td class="${m.delta>=0?'positive':'negative'}">${m.delta>0?'+':''}${m.delta}</td><td>${esc(m.reason)}</td></tr>`).join(''):emptyTable(5,'No hay movimientos en el período.');$('reportSaleRows').innerHTML=sales.length?sales.map(s=>`<tr><td>${when(s.at)}</td><td>${s.lines.map(l=>esc(l.name)+' × '+l.quantity).join(', ')}</td><td>${money(s.total)}</td></tr>`).join(''):emptyTable(3,'No hay ventas en el período.');}
function renderAll(){renderStats();renderProducts();renderStock();renderCart();renderSales();renderReports();}
document.querySelectorAll('.nav').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));
$('goToSales').addEventListener('click',()=>showTab('ventas'));
$('goToProducts').addEventListener('click',()=>showTab('productos'));
$('todayDate').textContent=new Date().toLocaleDateString('es-PE',{day:'numeric',month:'long',year:'numeric'});
$('loadDemo').addEventListener('click',()=>{if(state.products.length && !confirm('Esto reemplazará los datos de este navegador por un catálogo de ejemplo. ¿Continuar?'))return;state=C.demoState();cart=[];save();notify('Datos de ejemplo cargados.');});
$('productForm').addEventListener('submit',e=>{e.preventDefault();action(()=>{const editId=$('editId').value;const raw={code:$('code').value,name:$('name').value,category:$('category').value,price:$('price').value,min:$('minStock').value,stock:$('initialStock').value};state=C.registerProduct(state,raw,editId||null);save();resetForm();notify(editId?'Producto actualizado.':'Producto creado.');});});
function resetForm(){$('productForm').reset();$('editId').value='';$('initialStock').disabled=false;$('productFormTitle').textContent='Nuevo producto';$('saveProduct').textContent='Guardar producto';$('cancelEdit').classList.add('hidden');}
$('cancelEdit').addEventListener('click',resetForm);
$('productRows').addEventListener('click',e=>{
  const del=e.target.closest('button[data-delete]');
  if(del){
    const p=state.products.find(p=>p.id===del.dataset.delete);
    if(!p||p.deletedAt)return;
    pendingDeleteId=p.id;
    $('deleteProductName').textContent=`${p.name} (${p.code})`;
    $('deleteProductDetail').textContent=`Actualmente tiene ${p.stock} unidad(es). Dejará de aparecer en el catálogo activo y no podrá seleccionarse para movimientos ni ventas. Se conservará el historial.`;
    $('deleteDialog').showModal();
    return;
  }
  const restore=e.target.closest('button[data-restore]');
  if(restore){action(()=>{state=C.restoreProduct(state,restore.dataset.restore);save();notify('Producto restaurado correctamente.');});return;}
  const b=e.target.closest('button[data-edit]');if(!b)return;const p=state.products.find(p=>p.id===b.dataset.edit);if(!p)return;showTab('productos');$('editId').value=p.id;$('code').value=p.code;$('name').value=p.name;$('category').value=p.category;$('price').value=p.price;$('minStock').value=p.min;$('initialStock').value=p.stock;$('initialStock').disabled=true;$('productFormTitle').textContent='Editar producto';$('saveProduct').textContent='Guardar cambios';$('cancelEdit').classList.remove('hidden');$('productForm').scrollIntoView({behavior:'smooth',block:'start'});});
$('search').addEventListener('input',renderProducts);
$('showDeleted').addEventListener('change',renderProducts);
$('deleteDialog').addEventListener('close',()=>{pendingDeleteId=null;});
$('confirmDelete').addEventListener('click',()=>action(()=>{
  if(!pendingDeleteId)throw new Error('No hay producto seleccionado.');
  const id=pendingDeleteId;
  state=C.deleteProduct(state,id);
  cart=cart.filter(i=>i.productId!==id);
  if($('editId').value===id)resetForm();
  $('deleteDialog').close();
  save();
  notify('Producto eliminado del catálogo. Puedes restaurarlo desde «Mostrar eliminados».');
}));
$('stockKind').addEventListener('change',()=>{const adjust=$('stockKind').value==='Ajuste';$('directionWrap').classList.toggle('hidden',!adjust);$('reasonWrap').classList.toggle('hidden',!adjust);$('stockReason').required=adjust;});
$('stockForm').addEventListener('submit',e=>{e.preventDefault();action(()=>{const kind=$('stockKind').value;state=C.moveStock(state,$('stockProduct').value,kind,$('stockAmount').value,{text:$('stockReason').value,deltaSign:$('adjustDirection').value});save();$('stockForm').reset();$('stockKind').dispatchEvent(new Event('change'));notify('Movimiento registrado.');});});
$('addToCart').addEventListener('click',()=>action(()=>{const id=$('saleProduct').value,q=C.positiveInt($('saleQuantity').value,'Cantidad');const p=state.products.find(p=>p.id===id&&!p.deletedAt);if(!p)throw new Error('Selecciona un producto activo.');const current=cart.find(c=>c.productId===id);const sum=q+(current?current.quantity:0);if(sum>p.stock)throw new Error('Stock insuficiente: solo hay '+p.stock+' unidades disponibles.');if(current)current.quantity=sum;else cart.push({productId:id,quantity:q});renderCart();notify('Producto agregado a la venta.');}));
$('cartRows').addEventListener('click',e=>{const b=e.target.closest('button[data-remove]');if(b){cart=cart.filter(c=>c.productId!==b.dataset.remove);renderCart();}});
$('confirmSale').addEventListener('click',()=>action(()=>{state=C.registerSale(state,cart);cart=[];save();notify('Venta registrada. Stock actualizado automáticamente.');}));
$('clearDates').addEventListener('click',()=>{$('dateFrom').value='';$('dateTo').value='';renderReports();});
function reportCsv(){const from=$('dateFrom').value,to=$('dateTo').value;if(from&&to&&from>to){notify('Revisa el rango de fechas antes de exportar.',true);return;}const rows=[['Fecha y hora','Codigo','Producto','Operacion','Unidades','Motivo']];for(const m of state.movements.filter(m=>C.dateInRange(m.at,from,to)))rows.push([when(m.at),m.productCode,m.productName,m.type,m.delta,m.reason]);const csv='\ufeff'+rows.map(row=>row.map(v=>{let text=String(v??'');if(/^[=+@\t\r]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';}).join(';')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='movimientos-inventario.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Reporte CSV generado.');}
$('exportMoves').addEventListener('click',reportCsv);
for(const id of ['dateFrom','dateTo'])$(id).addEventListener('change',()=>{if($('dateFrom').value&&$('dateTo').value&&$('dateFrom').value>$('dateTo').value){notify('El inicio no puede ser posterior al final.',true);$(id).value='';}renderReports();});
renderAll();
})();
