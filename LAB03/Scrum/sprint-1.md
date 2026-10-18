# Sprint 1 — «El inventario visible»

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista  
**Días reales:** 12/10/2026 – 14/10/2026 (3 días)  
**Jornada prevista de simulación práctica:** 12/10/2026 – 14/10/2026  
**Duración en el escenario:** 3 días reales (5 días simulados en el escenario de 12 días)  
**Scrum Master / Developer:** Jael Emerson  
**Product Owner / Developer:** Christian Henry  
**Estado:** planificación conforme al Product Backlog validado; incremento probado en entorno local y demostrable en la Review.

## 1. Meta del sprint (Sprint Goal)

Disponer de un primer incremento demostrable que permita **registrar y editar productos, buscarlos, ingresar mercadería y consultar las existencias actualizadas**, mostrando correctamente los estados del inventario.

## 2. Alcance y justificación

El Product Backlog validado concentra este sprint en las historias HU-03, HU-04, HU-05 y HU-06 (**13 puntos de historia**). La planificación inicial incluía HU-01 y HU-02; ambas permanecen visibles en el Product Backlog porque el prototipo local no ofrece autenticación ni control de permisos seguros. La planificación inicial no se elimina ni se modifica retroactivamente.

> **Nota de fechas:** el escenario simulado de 12 días se ejecutó en fechas reales del 12/10/2026 al 14/10/2026 para el Sprint 1. El Sprint Planning se realizó el 10/10/2026 como cierre del Sprint 0 (preparación), y el Sprint 1 inició el 12/10/2026.

## 3. Sprint Backlog

| HU | Puntos | Tarea y resultado verificable | Responsable | Estado de ejecución |
|---|---:|---|---|---|
| HU-03 | 5 | Alta y edición de productos; datos válidos y código único | Product Owner | Terminada |
| HU-04 | 2 | Búsqueda de productos por nombre, código o categoría | Product Owner | Terminada |
| HU-05 | 3 | Entrada de mercadería que incrementa stock y registra movimiento | Scrum Master | Pendiente de prueba |
| HU-06 | 3 | Visualización de cantidades y estado Disponible / Bajo mínimo / Agotado | Scrum Master | Pendiente de prueba |
| Integración | — | Ejecución local, integración Git y pruebas del incremento | Ambos | Terminada |

**Total previsto:** **13 puntos de historia**. Son estimaciones relativas, no 13 horas ni velocidad demostrada.

## 4. Plan de ejecución dentro de la simulación

| Fecha real | Actividad | Evidencia de trabajo |
|---|---|---|
| 10/10/2026 | Sprint Planning: seleccionar historias, meta, reparto y Definition of Done (cierre del Sprint 0) | Acta y E01 |
| 12/10/2026 | Inicio del Sprint 1: alta y edición de productos; búsqueda | HU-03 y HU-04 / pruebas de catálogo |
| 13/10/2026 | Entradas de mercadería y estados de stock; Daily Scrum | HU-05 y HU-06 / pruebas |
| 14/10/2026 | Integración, correcciones, Sprint Review y Retrospectiva | E02 y acuerdos |

Esta tabla representa el **orden lógico de las fechas reales**. No acredita que hayan transcurrido cinco jornadas reales de trabajo.

## 5. Pruebas de aceptación previstas

Abrir `prototipo/index.html` en Chrome/Edge; para empezar desde un estado conocido utilizar **Cargar datos de ejemplo** (reinicia los datos locales). Registrar resultados en `pruebas.md`.

| HU | Comprobación | Referencia |
|---|---|---|
| HU-03 | Crear producto, rechazar código duplicado y editar uno existente | P01–P02 + edición manual |
| HU-04 | Buscar por nombre y por código | P03 |
| HU-05 | Añadir 5 unidades a P001: de 20 a 25, con movimiento registrado | P04 |
| HU-06 | Consultar cantidad y estado; verificar disponible, bajo mínimo y agotado | P05 + estados complementarios |

## 6. Eventos Scrum y resultados

### Sprint Planning

Se utiliza el orden validado por el Product Owner en `product-backlog.md`. Ambos Developers revisan dependencias y capacidad, seleccionan las cuatro historias y acuerdan el trabajo; el Scrum Master facilita el evento.

- **Fecha y hora efectiva:** `10/10/2026, 09:00–11:00`.  
  > Planning realizado el 10/10/2026 como cierre del Sprint 0. El Sprint 1 inicia el 12/10/2026.
- **Estimaciones y selección confirmadas por ambos:** `SÍ`.
- **Evidencia E01:** `evidencias/01-preparacion-planning-sprint1.png`.

### Daily Scrum / sincronización simulada

Los Developers inspeccionan qué funcionalidades están integradas, qué falta y qué impedimentos deben resolver para proteger la meta del sprint.

- **Fecha y hora de la sincronización real:** `13/10/2026, 18:30`.
- **Avance y bloqueos observados:** `HU-03 y HU-04 integradas y probadas; bloqueo: validación de código único al editar un producto eliminado`.
- **Adaptación del plan, si ocurrió:** `SIN CAMBIOS`.

### Sprint Review

Demostración propuesta: registrar un producto, localizarlo por código, aumentar stock y verificar el cambio de existencias. El Product Owner contrasta cada HU con sus criterios de aceptación.

- **Fecha y hora efectiva:** `14/10/2026, 10:00–11:00`.
- **HU que cumplieron Definition of Done:** `HU-03, HU-04`.
- **HU parciales o no aceptadas:** `HU-05, HU-06 (pendientes de prueba)`.
- **Observaciones y ajustes al Product Backlog:** `HU-07 a HU-11 ya presentan implementación adelantada en el prototipo; se validan formalmente en el Sprint 2`.
- **Evidencia E02:** `evidencias/02-review-sprint1.png`.

### Retrospectiva del Sprint 1

- **Qué funcionó:** `La división por HU permitió que cada Developer avanzara en paralelo sobre catálogo e inventario`.
- **Qué debe mejorar:** `Faltó tiempo para probar HU-05 y HU-06 antes del cierre del sprint`.
- **Acción concreta para el Sprint 2:** `Reservar el último día del sprint para pruebas de aceptación y evidencias`.

## 7. Cierre del Sprint 1

**Estado del sprint:** `PARCIAL`.  
**Historias finalizadas:** `2/4` (HU-03, HU-04).  
**Puntos de historia terminados:** `7/13`.  
**Pendientes de prueba:** HU-05, HU-06.

Las HU no finalizadas siguen en el Product Backlog y deberán revisarse antes de seleccionar el trabajo del Sprint 2. La Review no debe presentarse como realizada hasta contar con demostración y registro efectivo.