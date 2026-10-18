const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js');
const fixture=()=>C.registerProduct(C.emptyState(),{code:'P001',name:'Arroz extra',category:'Abarrotes',price:4.8,min:5,stock:20},null,'2026-10-16T12:00:00.000Z');

test('HU-03: registra producto con código único y no admite duplicado',()=>{
  const s=fixture();assert.equal(s.products.length,1);assert.equal(s.products[0].code,'P001');
  assert.throws(()=>C.registerProduct(s,{code:'p001',name:'Otro',category:'A',price:1,min:1,stock:1}),/existe/);
});
test('HU-03: permite actualizar precio y no altera stock al editar',()=>{
 const s=fixture();const id=s.products[0].id;const e=C.registerProduct(s,{code:'P001',name:'Arroz extra',category:'Abarrotes',price:5,min:5,stock:999},id);
 assert.equal(e.products[0].price,5);assert.equal(e.products[0].stock,20);
});
test('HU-05: entrada aumenta stock y registra movimiento',()=>{
 let s=fixture();s=C.moveStock(s,s.products[0].id,'Entrada',5,{text:'',deltaSign:'1'});
 assert.equal(s.products[0].stock,25);assert.equal(s.movements[0].delta,5);
});
test('HU-06 y HU-07: distingue disponible, bajo mínimo y agotado',()=>{
 assert.equal(C.stockStatus({stock:10,min:5}),'Disponible');
 assert.equal(C.stockStatus({stock:5,min:5}),'Bajo mínimo');
 assert.equal(C.stockStatus({stock:0,min:5}),'Agotado');
});
test('HU-08: ajuste negativo exige motivo y no permite stock negativo',()=>{
 let s=fixture(),id=s.products[0].id;
 assert.throws(()=>C.moveStock(s,id,'Ajuste',1,{text:'',deltaSign:'-1'}),/motivo/);
 assert.throws(()=>C.moveStock(s,id,'Ajuste',25,{text:'Merma',deltaSign:'-1'}),/negativo/);
 s=C.moveStock(s,id,'Ajuste',2,{text:'Merma',deltaSign:'-1'});
 assert.equal(s.products[0].stock,18);assert.equal(s.movements[0].reason,'Merma');
});
test('HU-09: venta de varios productos descuenta existencias',()=>{
 let s=fixture();s=C.registerProduct(s,{code:'P002',name:'Azúcar',category:'Abarrotes',price:4,min:2,stock:10});
 s=C.registerSale(s,[{productId:s.products[0].id,quantity:2},{productId:s.products[1].id,quantity:3}]);
 assert.equal(s.products[0].stock,18);assert.equal(s.products[1].stock,7);assert.equal(s.sales[0].total,21.6);
 assert.equal(s.movements.filter(m=>m.type==='Venta').length,2);
});
test('HU-09: no permite ventas con stock insuficiente',()=>{
 let s=fixture();assert.throws(()=>C.registerSale(s,[{productId:s.products[0].id,quantity:21}]),/insuficiente/);
 assert.equal(s.products[0].stock,20);
});
test('HU-10: registra líneas, cantidades, fecha y total',()=>{
 let s=fixture();s=C.registerSale(s,[{productId:s.products[0].id,quantity:2}],'2026-10-17T12:00:00.000Z');
 assert.equal(s.sales[0].at,'2026-10-17T12:00:00.000Z');assert.equal(s.sales[0].lines[0].quantity,2);assert.equal(s.sales[0].total,9.6);
});
test('HU-11: filtra los movimientos por fecha y tipo',()=>{
 let s=fixture();s=C.moveStock(s,s.products[0].id,'Entrada',3,{text:'',deltaSign:1},'2026-10-17T10:00:00.000Z');
 s=C.moveStock(s,s.products[0].id,'Ajuste',1,{text:'Merma',deltaSign:-1},'2026-10-18T10:00:00.000Z');
 const f=s.movements.filter(m=>C.dateInRange(m.at,'2026-10-17','2026-10-17'));
 assert.equal(f.length,1);assert.equal(f[0].type,'Entrada');
});

test('HU-03: eliminar oculta producto y conserva historial',()=>{
  let s=fixture(); const p=s.products[0]; const movement=s.movements[0];
  s=C.deleteProduct(s,p.id,'2026-10-17T20:00:00Z');
  assert.equal(C.activeProducts(s).length,0);
  assert.equal(C.totals(s).products,0);
  assert.equal(C.totals(s).stockValue,0);
  assert.equal(s.movements[0].id,movement.id);
  assert.throws(()=>C.moveStock(s,p.id,'Entrada',1),/eliminado/);
  assert.throws(()=>C.registerSale(s,[{productId:p.id,quantity:1}]),/eliminado/);
  assert.throws(()=>C.registerProduct(s,{code:'P001',name:'Duplicado',category:'A',price:2,min:1,stock:0}),/existe/);
});
test('HU-03: restaurar conserva el mismo stock, ventas y movimientos',()=>{
  let s=fixture(); const id=s.products[0].id;
  s=C.registerSale(s,[{productId:id,quantity:3}]);
  const m=s.movements.length, v=s.sales.length;
  s=C.deleteProduct(s,id);s=C.restoreProduct(s,id);
  assert.equal(C.totals(s).products,1);
  assert.equal(s.products[0].stock,17);
  assert.equal(s.movements.length,m);
  assert.equal(s.sales.length,v);
  s=C.registerSale(s,[{productId:id,quantity:2}]);assert.equal(s.products[0].stock,15);
});
test('HU-03: rechaza operaciones de eliminar/restaurar inválidas',()=>{
  let s=fixture(),id=s.products[0].id;
  assert.throws(()=>C.deleteProduct(s,'inexistente'),/no encontrado/);
  assert.throws(()=>C.restoreProduct(s,id),/ya está activo/);
  s=C.deleteProduct(s,id);
  assert.throws(()=>C.deleteProduct(s,id),/ya fue eliminado/);
  assert.throws(()=>C.registerProduct(s,{code:'P001',name:'Arroz',category:'A',price:2,min:1},id),/No se puede editar/);
});
