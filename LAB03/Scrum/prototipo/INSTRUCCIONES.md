# INVENTA — Instrucciones de uso

## Inicio rápido (sin instalar frameworks)

1. Abrir `index.html` con Chrome o Edge desde la carpeta `LAB03/Scrum/prototipo`.
2. Pulsar **Cargar datos de ejemplo** para iniciar con productos de prueba.
3. Explorar **Inicio**, **Productos**, **Movimientos**, **Ventas** y **Reportes** desde el menú lateral.
4. Los datos se guardan en `localStorage` del navegador. Al cerrar y volver a abrir en el mismo navegador, deben persistir.
5. Cargar datos de ejemplo nuevamente reemplaza los datos actuales: hacerlo solo cuando se quiera reiniciar la demostración.

## Funciones disponibles

- Catálogo: CRUD de alta, consulta/búsqueda, edición y **eliminación con confirmación**, además de restauración y validación de datos (HU-03, HU-04).
- Inventario: entradas de mercadería, visualización de cantidades y estados (HU-05, HU-06).
- Alerta visual por mínimo o agotamiento y ajustes justificados (HU-07, HU-08).
- Ventas con uno o varios productos, descuento de existencias y registro del historial (HU-09, HU-10).
- Movimientos consultables por período y exportación CSV como utilidad adicional (HU-11).

## Eliminar o restaurar un producto

En **Productos**, pulsa **Eliminar** y confirma. El producto deja de mostrarse y no está disponible para ventas ni movimientos. Para recuperarlo, activa **Mostrar eliminados** y pulsa **Restaurar**. Esta es una **baja lógica**, no un borrado definitivo: se conservan las ventas y los movimientos anteriores. Los códigos de productos eliminados permanecen reservados para preservar la trazabilidad. Los datos anteriores guardados en `localStorage` siguen siendo compatibles.

## Pruebas

Desde la carpeta `prototipo`, si tienes Node.js instalado:

```powershell
node tests/core.test.js
node --test tests/historias.test.js
```

Estos comandos verifican reglas internas. Además hay que efectuar las pruebas manuales en pantalla documentadas en `../pruebas.md` para validar interfaz, integración y criterios de aceptación.

## Advertencias del alcance

Este es un prototipo de un único navegador, sin servidor ni base de datos compartida. La etiqueta visual «Administrador» **no representa autenticación real**. HU-01 y HU-02 están pendientes, así como HU-12 y HU-13 en su alcance completo. **No debe utilizarse con datos reales de clientes o ventas comerciales.**

## Compatibilidad

HTML, CSS y JavaScript sin librerías externas. Interfaz adaptable a distintas resoluciones. El archivo CSV utiliza separador `;` y UTF-8 para facilitar su apertura en Excel con configuración regional en español.
