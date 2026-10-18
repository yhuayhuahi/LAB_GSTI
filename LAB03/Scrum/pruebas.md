
# Plan y registro de pruebas — INVENTA

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista (INVENTA)  
**Metodología:** Scrum  
**Responsable del seguimiento:** Scrum Master (SM) / Developer  
**Responsable de aprobación funcional:** Product Owner (PO) / Developer  
**Período del proyecto simulado:** 10/10/2026 al 19/10/2026  
**Fecha de ejecución de pruebas manuales:** 17/10/2026  
**Fecha de confirmación funcional registrada:** 17/10/2026  
**Estado de las pruebas manuales:** 9 de 9 aprobadas (100 %)  
**Revisión conjunta de HU-11:** Confirmada por el PO  
**Aceptación funcional:** Confirmada por el PO para las nueve historias seleccionadas  
**Alcance:** HU-03 a HU-11, correspondientes a los Sprints 1 y 2.

Las historias HU-01, HU-02, HU-12 y HU-13 permanecen en el Product Backlog, pero no fueron seleccionadas para estos sprints y no se consideran implementadas ni finalizadas.

## 1. Objetivo

Verificar el funcionamiento de las principales funcionalidades del sistema INVENTA mediante pruebas manuales basadas en las nueve historias de usuario seleccionadas para los Sprints 1 y 2.

Las pruebas permiten comprobar la gestión de productos, búsqueda, consulta de existencias, alertas de stock, movimientos de inventario, ajustes, registro de ventas, historial y reportes.

Los resultados obtenidos permiten verificar los criterios de aceptación, identificar posibles errores y respaldar la aceptación funcional por parte del Product Owner (PO).

## 2. Condiciones previas

Para ejecutar las pruebas se consideran las siguientes condiciones:

1. Abrir `prototipo/index.html` utilizando Google Chrome o Microsoft Edge.
2. Seleccionar la opción **Cargar datos de ejemplo**.
3. Comprobar que los productos iniciales se encuentren registrados correctamente.
4. Realizar las pruebas respetando las dependencias entre las operaciones.
5. Registrar cada resultado como **Aprobada**, **Fallida** o **Pendiente**.

Los productos utilizados como datos iniciales son:

| Código | Producto | Stock inicial | Stock mínimo | Estado esperado |
|---|---|---:|---:|---|
| P001 | Arroz extra 1 kg | 20 | 5 | Disponible |
| P002 | Azúcar rubia 1 kg | 9 | 4 | Disponible |
| P003 | Aceite vegetal 1 L | 2 | 3 | Bajo mínimo |
| P004 | Galletas de vainilla | 0 | 6 | Agotado |

**Nota:** Las pruebas del SM / Developer se ejecutaron secuencialmente sobre los mismos datos. No se reinició el inventario entre las pruebas de entrada de mercadería, ajuste, venta y reporte.

El sistema utiliza `localStorage`, por lo que los datos almacenados en un navegador no se comparten automáticamente con otro equipo. Para sus verificaciones, el PO / Developer utilizó su entorno de prueba y preparó los datos necesarios según cada historia.

### 2.1. Cronograma de referencia

| Actividad | Fecha programada | Horario simulado |
|---|---|---|
| Preparación y Sprint Planning 1 | 10/10/2026 | 17:00 – 17:30 |
| Inicio del Sprint 1 | 12/10/2026 | Desde las 09:00 |
| Sprint Review 1 y cierre del Sprint 1 | 14/10/2026 | 18:00 – 18:25 |
| Sprint Planning 2 | 15/10/2026 | 08:30 – 08:55 |
| Inicio del Sprint 2 | 15/10/2026 | Desde las 09:00 |
| Ejecución real de pruebas manuales | 17/10/2026 | Horario no registrado |
| Sprint Review 2 y cierre del Sprint 2 | 18/10/2026 | 18:00 – 18:30 |
| Retrospectiva final y cierre general | 19/10/2026 | 19:00 – 19:25 |

Las fechas y horarios de los eventos Scrum corresponden al escenario simulado del laboratorio. Las pruebas manuales fueron ejecutadas y registradas el 17/10/2026.

La validación posterior de las funcionalidades del Sprint 1 no modifica la fecha de cierre establecida para su escenario simulado.

## 3. Sprint 1 — Catálogo e inventario

**Período programado:** 12/10/2026 al 14/10/2026  
**Sprint Review simulada:** 14/10/2026, de 18:00 a 18:25  
**Fecha real de ejecución de pruebas:** 17/10/2026

En el Sprint 1 se consideran cuatro historias de usuario relacionadas con la administración de productos y el control inicial de existencias.

### 3.1. Registro de pruebas funcionales

| HU | Funcionalidad | Responsable | Procedimiento de prueba | Resultado esperado | Resultado real |
|---|---|---|---|---|---|
| HU-03 | Registrar y editar productos | PO / Developer | Registrar P005 con nombre `Leche 1 L`, precio `5.60` y stock `7`. Modificar su precio a `5.90`, comprobar el rechazo de códigos duplicados y verificar la eliminación y restauración de un producto. | Los productos se registran y editan correctamente, no se permiten códigos duplicados y funciona la eliminación lógica. | **Aprobada.** Se verificó el registro, edición, rechazo de códigos duplicados, eliminación y restauración de productos. |
| HU-04 | Buscar productos | PO / Developer | Buscar productos utilizando el nombre `Arroz` y el código `P003`. | El catálogo muestra únicamente los productos que coinciden con la búsqueda. | **Aprobada.** La búsqueda por nombre y código mostró correctamente los productos correspondientes. |
| HU-05 | Registrar entrada de mercadería | SM / Developer | Registrar una entrada de 5 unidades para el producto P001. | El stock aumenta de 20 a 25 unidades y se registra el movimiento correspondiente. | **Aprobada.** Se registró correctamente la entrada y el stock aumentó de 20 a 25 unidades. |
| HU-06 | Consultar existencias | SM / Developer | Consultar los productos P001, P003 y P004 después de registrar la entrada de mercadería. | P001 muestra 25 unidades y estado Disponible; P003 muestra 2 y estado Bajo mínimo; P004 muestra 0 y estado Agotado. | **Aprobada.** Se verificaron correctamente las cantidades y los estados de los tres productos. |

### 3.2. Observaciones del Sprint 1

Las cuatro pruebas funcionales del Sprint 1 fueron ejecutadas satisfactoriamente el 17/10/2026.

El PO / Developer verificó las funcionalidades de registro, edición y búsqueda de productos, así como las validaciones de códigos duplicados y las operaciones adicionales de eliminación lógica y restauración.

El SM / Developer comprobó el registro de entradas de mercadería y la consulta de existencias, verificando la actualización del stock y los estados de los productos.

No se reportaron errores durante las cuatro pruebas ejecutadas.

**Resultado de pruebas del Sprint 1:** 4 de 4 aprobadas.  
**Pruebas fallidas:** 0.  
**Fecha de ejecución:** 17/10/2026.  
**Aceptación funcional:** Confirmada por el PO para HU-03, HU-04, HU-05 y HU-06.

### 3.3. Validación y evidencia del Sprint 1

**Evento de referencia:** Sprint Review 1.  
**Fecha simulada:** 14/10/2026.  
**Horario simulado:** 18:00 – 18:25.  
**Historias verificadas:** HU-03, HU-04, HU-05 y HU-06.  
**Resultado funcional:** 4 de 4 aprobadas.  
**Responsable de aceptación:** PO.  
**Estado de aceptación funcional:** Confirmada.

**Evidencia Scrum:** `evidencias/02-review-sprint1.png`  
**Estado de la evidencia:** Adjuntada.

El registro del evento simulado y su evidencia se encuentran documentados en `reuniones-y-evidencias.md`.

La fecha simulada de la revisión y la fecha real de ejecución de pruebas se mantienen diferenciadas.

## 4. Sprint 2 — Alertas, ajustes, ventas y reportes

**Período programado:** 15/10/2026 al 18/10/2026  
**Sprint Review simulada:** 18/10/2026, de 18:00 a 18:30  
**Fecha real de ejecución de pruebas:** 17/10/2026

En el Sprint 2 se consideran cinco historias de usuario relacionadas con las alertas de inventario, ajustes de stock, ventas, historial y reportes.

### 4.1. Registro de pruebas funcionales

| HU | Funcionalidad | Responsable | Procedimiento de prueba | Resultado esperado | Resultado real |
|---|---|---|---|---|---|
| HU-07 | Alertas de stock bajo | PO / Developer | Ingresar a Inicio y consultar las alertas correspondientes a P003 y P004. | P003 aparece con stock bajo y P004 como agotado. | **Aprobada.** Se comprobó la visualización de las alertas para productos con stock bajo y agotado. |
| HU-08 | Ajustar inventario | SM / Developer | Reducir 2 unidades de P001 con motivo `Merma`. Después intentar un ajuste sin motivo y otro superior al stock disponible. | El stock disminuye de 25 a 23 unidades. Los ajustes inválidos son rechazados. | **Aprobada.** Se registró el ajuste de 2 unidades y el sistema rechazó las operaciones inválidas. |
| HU-09 | Registrar ventas | SM / Developer | Vender 3 unidades de P001. Después intentar vender una unidad de P004, que se encuentra agotado. | Se registra la venta por S/ 14.40, el stock de P001 disminuye de 23 a 20 y se rechaza la venta sin existencias. | **Aprobada.** La venta se registró correctamente, se descontó el stock y se impidió vender el producto agotado. |
| HU-10 | Consultar historial de ventas | PO / Developer | Abrir el historial de ventas y consultar una operación de 3 unidades de P001. Preparar previamente esa venta si se utiliza otro navegador. | Se muestra la venta de Arroz extra 1 kg × 3 por S/ 14.40, con su fecha y hora. | **Aprobada.** El historial mostró correctamente la información de la venta registrada. |
| HU-11 | Reportar movimientos de inventario | SM / Developer, con revisión del PO | Ingresar a Reportes y filtrar los movimientos por la fecha de las pruebas. | Se muestran los movimientos de P001: entrada de +5 unidades, ajuste de −2 y venta de −3. | **Aprobada.** Se verificaron los tres movimientos y el PO confirmó la revisión conjunta del reporte. |

### 4.2. Observaciones del Sprint 2

Las cinco pruebas funcionales del Sprint 2 fueron ejecutadas satisfactoriamente el 17/10/2026.

El PO / Developer comprobó la visualización de alertas de stock bajo y agotado, así como la consulta del historial de ventas.

El SM / Developer verificó las operaciones de ajuste de inventario, registro de ventas y consulta de reportes.

En HU-08 se comprobó que el sistema exige un motivo para realizar ajustes y que no permite reducir las existencias por encima del stock disponible.

En HU-09 se registró una venta de tres unidades del producto P001 por S/ 14.40. El sistema actualizó las existencias automáticamente e impidió realizar una venta sobre un producto agotado.

En HU-11 se verificó que el reporte muestra las entradas, ajustes y ventas realizadas durante las pruebas.

El PO confirmó la revisión conjunta de HU-11.

No se reportaron errores durante las cinco pruebas funcionales.

**Resultado de pruebas del Sprint 2:** 5 de 5 aprobadas.  
**Pruebas fallidas:** 0.  
**Fecha de ejecución:** 17/10/2026.  
**Aceptación funcional:** Confirmada por el PO para HU-07, HU-08, HU-09, HU-10 y HU-11.

### 4.3. Secuencia verificada de movimientos

Como parte de las pruebas del SM / Developer, se ejecutaron las siguientes operaciones sobre el producto P001:

| Operación | Cantidad | Stock resultante |
|---|---:|---:|
| Stock inicial | — | 20 |
| Entrada de mercadería | +5 | 25 |
| Ajuste por merma | −2 | 23 |
| Venta registrada | −3 | 20 |

**Resultado:** El stock final fue de 20 unidades y la venta registrada tuvo un importe de S/ 14.40.

El reporte de movimientos permitió comprobar la trazabilidad de las tres operaciones.

### 4.4. Validación y evidencia del Sprint 2

**Evento de referencia:** Sprint Review 2.  
**Fecha simulada:** 18/10/2026.  
**Horario simulado:** 18:00 – 18:30.  
**Historias verificadas:** HU-07, HU-08, HU-09, HU-10 y HU-11.  
**Resultado funcional:** 5 de 5 aprobadas.  
**Responsable de aceptación:** PO.  
**Revisión conjunta de HU-11:** Confirmada.  
**Estado de aceptación funcional:** Confirmada.

**Evidencia Scrum:** `evidencias/04-review-sprint2.png`  
**Estado de la evidencia:** Adjuntada.

El registro del evento simulado y su evidencia se encuentran documentados en `reuniones-y-evidencias.md`.

## 5. Evidencias complementarias de las pruebas

Durante la ejecución manual realizada el 17/10/2026 se obtuvieron dos capturas de pantalla para respaldar los resultados observados.

| ID | Evidencia | Historia relacionada | Estado |
|---|---|---|---|
| EP-01 | `evidencias/pruebas/01-consulta-existencias.png` | HU-06 | Adjuntada |
| EP-02 | `evidencias/pruebas/02-reporte-movimientos.png` | HU-11 | Adjuntada |

### 5.1. Consulta de existencias

La primera evidencia muestra la información de los productos registrados y permite comprobar que el sistema presenta las existencias actualizadas y sus respectivos estados.

![Consulta de existencias](./evidencias/pruebas/01-consulta-existencias.png)

**Figura 1.** Consulta de existencias y estados de stock del sistema INVENTA.

### 5.2. Reporte de movimientos

La segunda evidencia muestra los movimientos registrados durante las pruebas funcionales, permitiendo verificar las entradas de mercadería, ajustes de inventario y ventas.

![Reporte de movimientos](./evidencias/pruebas/02-reporte-movimientos.png)

**Figura 2.** Reporte de movimientos de inventario del sistema INVENTA.

### 5.3. Evidencias de los eventos Scrum

Además de las capturas de pruebas, se adjuntaron las cinco evidencias previstas para la documentación de Scrum.

| ID | Evento | Fecha simulada | Archivo | Estado |
|---|---|---|---|---|
| E01 | Preparación y Sprint Planning 1 | 10/10/2026 | `evidencias/01-preparacion-planning-sprint1.png` | Adjuntada |
| E02 | Sprint Review 1 | 14/10/2026 | `evidencias/02-review-sprint1.png` | Adjuntada |
| E03 | Sprint Planning 2 | 15/10/2026 | `evidencias/03-planning-sprint2.png` | Adjuntada |
| E04 | Sprint Review 2 | 18/10/2026 | `evidencias/04-review-sprint2.png` | Adjuntada |
| E05 | Retrospectiva final | 19/10/2026 | `evidencias/05-retrospectiva-final.png` | Adjuntada |

**Resultado documental:** 5 de 5 evidencias Scrum adjuntadas.

Las fechas corresponden al escenario simulado del laboratorio y no necesariamente a las fechas reales en que fueron tomadas las capturas.

La descripción completa de cada evento se encuentra en `reuniones-y-evidencias.md`.

## 6. Pruebas automatizadas

Como complemento de las verificaciones manuales, el prototipo dispone de dos archivos destinados a comprobar reglas de negocio mediante JavaScript.

Los archivos se encuentran en:

- `prototipo/tests/core.test.js`
- `prototipo/tests/historias.test.js`

Para ejecutarlos, abrir una terminal dentro de `LAB03/Scrum/prototipo/` y utilizar:

```powershell
node tests/core.test.js
node --test tests/historias.test.js
```

Estas pruebas permiten revisar validaciones, operaciones de inventario, ventas y otras reglas del sistema.

**Estado:** Los archivos de pruebas automatizadas están disponibles en el prototipo. No se consigna un resultado de ejecución local del equipo porque no se dispone de ese registro en este documento.

Las pruebas automatizadas son complementarias y no se incluyen en el conteo de las nueve pruebas funcionales manuales.

## 7. Criterios de evaluación

Para registrar los resultados de las pruebas manuales se consideran los siguientes estados:

- **Aprobada:** La funcionalidad cumple con el resultado esperado durante la ejecución de la prueba.
- **Fallida:** Se identifica un comportamiento diferente al esperado.
- **Pendiente:** La prueba todavía no se ejecutó o falta confirmar su resultado.

Cuando se identifica una falla, debe registrarse el problema, realizarse la corrección correspondiente y repetirse la prueba.

### 7.1. Criterios de aceptación funcional

Una historia de usuario se considera aceptada funcionalmente cuando:

1. La funcionalidad puede ejecutarse mediante el prototipo.
2. El comportamiento observado coincide con el resultado esperado.
3. Se cumplen las validaciones correspondientes.
4. La prueba funcional obtiene un resultado satisfactorio.
5. El Product Owner confirma el cumplimiento de los criterios de aceptación.

### 7.2. Relación con la Definition of Done

La aprobación funcional no significa automáticamente que una historia esté completamente finalizada según la Definition of Done.

Para considerar una historia terminada, además de cumplir sus criterios de aceptación, debe verificarse que:

- Los cambios correspondientes estén integrados en el repositorio compartido.
- La funcionalidad pueda ejecutarse correctamente.
- Las pruebas necesarias hayan sido realizadas.
- La documentación y las evidencias estén actualizadas.
- El Product Owner haya confirmado la aceptación funcional.

En el presente ejercicio se confirmó la aceptación funcional de las nueve historias seleccionadas.

La comprobación definitiva de la integración mediante Pull Requests debe realizarse por separado.

## 8. Resumen de resultados

Los resultados de las pruebas funcionales manuales ejecutadas el 17/10/2026 se presentan a continuación.

| Indicador | Resultado |
|---|---|
| Fecha de ejecución manual | 17/10/2026 |
| Total de historias seleccionadas | 9 |
| Pruebas realizadas por el SM / Developer | 5 |
| Pruebas realizadas por el PO / Developer | 4 |
| Total de pruebas manuales | 9 |
| Pruebas aprobadas | **9 de 9 (100 %)** |
| Pruebas fallidas | 0 |
| Pruebas pendientes de ejecución | 0 |
| Evidencias complementarias de pruebas | 2 de 2 adjuntadas |
| Evidencias Scrum | 5 de 5 adjuntadas |
| Revisión conjunta de HU-11 | Confirmada por el PO |
| Pruebas automatizadas | Archivos disponibles; sin registro de ejecución local del equipo |
| Historias aceptadas funcionalmente | **9 de 9, confirmadas por el PO** |
| Integración final mediante Pull Requests | Pendiente de verificación |

### 8.1. Resultados del Sprint 1

**Período programado:** 12/10/2026 al 14/10/2026.  
**Fecha real de pruebas:** 17/10/2026.

| Indicador | Resultado |
|---|---|
| Historias consideradas | 4 |
| Puntos de historia | 13 SP |
| Pruebas aprobadas | 4 |
| Pruebas fallidas | 0 |
| Historias aceptadas funcionalmente por el PO | **4 de 4** |
| Evidencia de Sprint Review 1 | Adjuntada |

### 8.2. Resultados del Sprint 2

**Período programado:** 15/10/2026 al 18/10/2026.  
**Fecha real de pruebas:** 17/10/2026.

| Indicador | Resultado |
|---|---|
| Historias consideradas | 5 |
| Puntos de historia | 18 SP |
| Pruebas aprobadas | 5 |
| Pruebas fallidas | 0 |
| Historias aceptadas funcionalmente por el PO | **5 de 5** |
| Revisión conjunta de HU-11 | Confirmada por el PO |
| Evidencia de Sprint Review 2 | Adjuntada |

### 8.3. Resultado consolidado

| Indicador | Sprint 1 | Sprint 2 | Total |
|---|---:|---:|---:|
| Historias seleccionadas | 4 | 5 | 9 |
| Puntos de historia | 13 | 18 | 31 |
| Pruebas aprobadas | 4 | 5 | 9 |
| Pruebas fallidas | 0 | 0 | 0 |
| Aceptaciones funcionales del PO | 4 | 5 | 9 |

**Resultado general:** Se aprobaron las nueve pruebas funcionales manuales, equivalentes al 100 % de las pruebas previstas para las historias seleccionadas.

Este porcentaje corresponde al conjunto de pruebas ejecutadas y no representa una medición de cobertura total del código fuente.

## 9. Conclusiones de las pruebas

Las nueve pruebas funcionales correspondientes a los Sprints 1 y 2 se completaron satisfactoriamente el 17/10/2026, verificándose la gestión de productos, búsqueda, registro de entradas de mercadería, consulta de existencias, alertas de stock, ajustes de inventario, registro de ventas, historial y reporte de movimientos.

Durante las pruebas realizadas por los Developers no se reportaron errores en las funcionalidades evaluadas. Se comprobó el correcto funcionamiento de las principales operaciones y sus validaciones, incluyendo la actualización del stock y el rechazo de operaciones inválidas.

Las dos capturas complementarias permiten respaldar los resultados relacionados con la consulta de existencias y la visualización de movimientos de inventario. Asimismo, las cinco evidencias Scrum se encuentran adjuntadas como respaldo documental del ejercicio académico.

El Product Owner confirmó la revisión conjunta de HU-11 y aceptó funcionalmente las nueve historias verificadas, distribuidas en cuatro del Sprint 1 y cinco del Sprint 2.

Por tanto, el registro de pruebas manuales queda cerrado con **nueve pruebas aprobadas, cero fallidas y cero pendientes de ejecución**. La documentación de los eventos Scrum se mantiene en `reuniones-y-evidencias.md`, mientras que la integración de los cambios mediante Pull Requests deberá verificarse antes de declarar completada la Definition of Done de cada historia.

