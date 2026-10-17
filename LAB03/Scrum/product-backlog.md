# Product Backlog — Sistema de Gestión de Inventarios

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista  
**Metodología:** Scrum  
**Versión:** 1.0  
**Fecha de validación:** 10/10/2026  
**Product Owner / Developer:** Christian Henry  
**Scrum Master / Developer:** Jael Emerson  
**Estado:** Priorización validada por el Product Owner  
**Documento base:** `LAB03/requisitos-reales.md`

## 1. Introducción

El presente Product Backlog contiene las 13 historias de usuario identificadas para el Sistema de Gestión de Inventarios de una tienda minorista, organizadas en cinco épicas funcionales.

La priorización considera el valor que aporta cada funcionalidad al negocio, las dependencias técnicas y el tiempo disponible para el desarrollo. El objetivo es obtener incrementos funcionales mediante Scrum, concentrándose primero en las funcionalidades esenciales para gestionar productos, controlar existencias, registrar ventas y consultar reportes.

El Product Owner revisó y validó la priorización presentada. Las estimaciones en Story Points se utilizan como referencia inicial y serán confirmadas conjuntamente por los Developers durante la planificación de los sprints.

## 2. Criterios de priorización y estimación

Para organizar el Product Backlog se consideraron los siguientes criterios:

- **Valor de negocio:** importancia de la funcionalidad para las operaciones de la tienda.
- **Dependencias técnicas:** funcionalidades necesarias antes de implementar otras historias.
- **Complejidad relativa:** esfuerzo estimado mediante Story Points.
- **Tiempo disponible:** selección de funcionalidades que permitan obtener incrementos demostrables.
- **Prioridad MoSCoW:** clasificación original de historias Must Have y Should Have.

Se utiliza la escala de estimación relativa de **1, 2, 3, 5 y 8 Story Points (SP)**. Estos valores representan complejidad y esfuerzo relativo, no horas de trabajo.

## 3. Product Backlog priorizado

| Orden | HU | Épica | Historia resumida | Prioridad | SP | Dependencias | Sprint previsto | Estado |
|---:|---|---|---|---|---:|---|---|---|
| 1 | HU-03 | B | Registrar y editar productos | Must | 5 | Ninguna | Sprint 1 | Por verificar |
| 2 | HU-04 | B | Buscar productos por código o nombre | Must | 2 | HU-03 | Sprint 1 | Por verificar |
| 3 | HU-05 | C | Registrar entradas de stock | Must | 3 | HU-03 | Sprint 1 | Por verificar |
| 4 | HU-06 | C | Consultar niveles y estados de stock | Must | 3 | HU-03, HU-05 | Sprint 1 | Por verificar |
| 5 | HU-09 | D | Registrar ventas y descontar existencias | Must | 5 | HU-03, HU-04, HU-06 | Sprint 2 | Por verificar |
| 6 | HU-10 | D | Consultar historial de ventas | Must | 3 | HU-09 | Sprint 2 | Por verificar |
| 7 | HU-07 | C | Generar alertas de stock bajo | Must | 2 | HU-06 | Sprint 2 | Por verificar |
| 8 | HU-08 | C | Ajustar inventario con motivo obligatorio | Must | 3 | HU-03, HU-06 | Sprint 2 | Por verificar |
| 9 | HU-11 | E | Reportar movimientos de inventario por período | Must | 5 | HU-05, HU-08, HU-09 | Sprint 2 | Por verificar |
| 10 | HU-01 | A | Autenticación de usuarios | Must | 5 | Mecanismo de autenticación | Backlog pendiente | Pendiente |
| 11 | HU-02 | A | Control de acceso según roles | Must | 5 | HU-01 | Backlog pendiente | Pendiente |
| 12 | HU-12 | E | Reportes de ventas por período y producto | Must | 5 | HU-09, HU-10 | Backlog pendiente | Pendiente |
| 13 | HU-13 | E | Dashboard de indicadores (KPIs) | Should | 3 | HU-06, HU-07, HU-09 | Backlog pendiente | Pendiente |

**Resumen de estimaciones:**

| Agrupación | Historias | Story Points |
|---|---|---:|
| Sprint 1 | HU-03, HU-04, HU-05, HU-06 | 13 |
| Sprint 2 | HU-09, HU-10, HU-07, HU-08, HU-11 | 18 |
| Backlog pendiente | HU-01, HU-02, HU-12, HU-13 | 18 |
| **Total del Product Backlog** | **13 historias** | **49** |

Las asignaciones a los sprints corresponden a la planificación prevista. La selección definitiva del trabajo se acuerda entre los Developers durante el Sprint Planning.

Los Story Points son estimaciones iniciales y no representan velocidad efectivamente alcanzada.

## 4. Distribución de los sprints

### 4.1. Sprint 0 — Preparación

Se conserva la etapa preparatoria propuesta en la planificación inicial del laboratorio.

Las actividades consideradas son:

- Refinamiento y estimación de historias de usuario.
- Priorización del Product Backlog.
- Identificación de dependencias técnicas.
- Selección de herramientas de desarrollo.
- Preparación del repositorio GitHub.
- Definición de los criterios de terminado (Definition of Done).

Esta etapa se utiliza como preparación académica. El Sprint 0 no constituye un evento oficial de la Guía de Scrum.

### 4.2. Sprint 1 — El inventario visible

**Objetivo:** disponer de un primer incremento funcional que permita registrar productos, buscarlos, registrar entradas de mercadería y consultar las existencias disponibles.

**Historias previstas:**

- HU-03: Gestión del catálogo de productos.
- HU-04: Búsqueda de productos.
- HU-05: Registro de entradas de stock.
- HU-06: Consulta de niveles de stock.

**Total estimado:** 13 Story Points.

**Incremento esperado:** módulo básico de productos e inventario, con cantidades actualizadas después de registrar entradas de mercadería.

### 4.3. Sprint 2 — Ventas y reportes

**Objetivo:** ampliar el incremento anterior mediante el registro de ventas, descuento automático de stock, alertas y reportes de movimientos.

**Historias previstas:**

- HU-09: Registro de ventas.
- HU-10: Historial de ventas.
- HU-07: Alertas de stock bajo.
- HU-08: Ajustes manuales de inventario.
- HU-11: Reporte de movimientos.

**Total estimado:** 18 Story Points.

**Incremento esperado:** sistema básico que integra inventario, ventas y reportes de movimientos.

Las funcionalidades serán aceptadas únicamente después de comprobar sus criterios de aceptación y demostrar su funcionamiento.

## 5. Ajustes respecto de la planificación inicial

La planificación inicial del laboratorio contemplaba el desarrollo de HU-01 y HU-02 durante el Sprint 1, junto con las funcionalidades de catálogo e inventario.

Después de revisar el alcance técnico del prototipo y las restricciones de tiempo, el Product Owner validó una nueva priorización que concentra el primer sprint en productos e inventario y el segundo en ventas y reportes.

En consecuencia:

- HU-01 y HU-02 permanecen en el Product Backlog para una implementación posterior.
- HU-12 y HU-13 también quedan pendientes de desarrollo o validación completa.
- Se mantiene la estructura de Sprint 0, Sprint 1 y Sprint 2 del escenario original.
- Las historias no completadas permanecerán visibles y priorizadas en el Product Backlog.

La decisión de posponer HU-01 y HU-02 responde a que una autenticación segura y un control de permisos efectivo requieren mecanismos de seguridad que no deben darse por implementados únicamente mediante una interfaz HTML y JavaScript en el navegador.

Por tanto, el prototipo tendrá limitaciones de seguridad y no se considerará listo para un entorno comercial real.

Este ajuste corresponde a la priorización del alcance de la simulación y no modifica las 13 historias de usuario establecidas en el documento de requisitos base.

## 6. Criterios de aceptación de las historias

| Historia | Criterio de aceptación |
|---|---|
| HU-01 | El usuario puede autenticarse mediante credenciales válidas y se impide el acceso no autorizado. |
| HU-02 | Las funciones disponibles se restringen efectivamente según el rol asignado. |
| HU-03 | Se pueden registrar y editar productos con código único y valores válidos. |
| HU-04 | La búsqueda permite localizar productos mediante su nombre o código. |
| HU-05 | Una entrada de mercadería incrementa correctamente el stock y registra el movimiento. |
| HU-06 | Las existencias y su estado se actualizan después de cada movimiento. |
| HU-07 | Se muestra una alerta cuando el stock es menor o igual al mínimo configurado. |
| HU-08 | Se permiten ajustes de inventario con motivo obligatorio, sin generar existencias negativas. |
| HU-09 | Se pueden registrar ventas de uno o varios productos y descontar sus existencias sin permitir stock negativo. |
| HU-10 | Cada venta queda registrada con fecha, hora, productos, cantidades y total. |
| HU-11 | Se pueden consultar movimientos de entrada, salida y ajuste aplicando un rango de fechas. |
| HU-12 | Se pueden consultar reportes de ventas por día, semana y producto. |
| HU-13 | Se muestran los indicadores de valor del inventario, productos bajo mínimo y ventas del día. |

Los criterios anteriores sirven como referencia para las pruebas funcionales y la aceptación de cada historia durante las Sprint Reviews.

## 7. Definición de terminado(Done)

Una historia de usuario se considerará terminada (Done) cuando cumpla todas las siguientes condiciones:

1. La funcionalidad se encuentra implementada y ejecutable.
2. El código está integrado en la rama correspondiente del proyecto.
3. Se cumplen los criterios de aceptación de la historia.
4. Se ha ejecutado por lo menos una prueba funcional con resultado satisfactorio y evidencia registrada.
5. Los datos y cambios generados por la operación se registran y actualizan correctamente según el alcance del prototipo.
6. La funcionalidad puede demostrarse durante la Sprint Review.

No se considerarán terminadas las historias que solo presenten interfaces visuales sin ejecutar las operaciones correspondientes, ni las que mantengan fallos que incumplan sus criterios de aceptación.

## 8. Gestión y seguimiento del Product Backlog

El Product Owner es responsable de mantener el Product Backlog ordenado según su valor y necesidades del producto.

Durante el desarrollo, el equipo registrará el avance de cada historia utilizando los siguientes estados:

| Estado | Descripción |
|---|---|
| Pendiente | Historia aún no iniciada. |
| En desarrollo | Funcionalidad en implementación. |
| En pruebas | Funcionalidad implementada pendiente de validación. |
| Done | Historia que cumple la Definition of Done. |
| No completada | Historia iniciada que no alcanzó los criterios de terminado dentro del sprint. |

Al finalizar cada sprint, el equipo revisará las funcionalidades terminadas y no completadas. Las historias pendientes permanecerán en el Product Backlog para su posible priorización posterior.

## 9. Validación del Product Backlog

La versión 1.0 de la priorización fue revisada y validada por el Product Owner del equipo Scrum.

**Product Owner:** Christian Henry  
**Scrum Master:** Jael Emerson  
**Fecha:** 10 de octubre de 2026  
**Estado:** Product Backlog priorizado y validado para la planificación de los sprints.

La validación del Product Backlog no implica que todas las historias hayan sido implementadas. Su cumplimiento se verificará mediante los resultados documentados de los respectivos sprints.