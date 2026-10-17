# Preparación académica — «Sprint 0»

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista  
**Metodología:** Scrum (simulación académica)  
**Días del escenario:** 1 y 2 de 12  
**Jornada prevista de coordinación real:** 10/10/2026  
**Responsables:** Christian Henry — Product Owner / Developer; Jael Emerson — Scrum Master / Developer  
**Estado:** Planificación documentada y Product Backlog validado por el Product Owner. Ejecución y evidencias pendientes de registro.

> En este laboratorio, «Sprint 0» es únicamente el nombre informal de la preparación. No es un sprint oficial de la Guía Scrum: los sprints formales deben orientarse a crear un incremento utilizable. Se conserva la planificación inicial del coordinador sin sobrescribirla.

## 1. Objetivo

Preparar el trabajo del equipo para los dos sprints del caso simulado: disponer de un Product Backlog priorizado, identificar dependencias, acordar una Definition of Done, organizar las ramas de Git y establecer un prototipo local ejecutable.

## 2. Product Backlog de referencia

Se utiliza `LAB03/requisitos-reales.md` con **13 historias de usuario en cinco épicas**. Christian, como Product Owner, **validó el orden y la prioridad** detallados en `product-backlog.md`; la estimación conjunta y el compromiso de trabajo se confirman durante cada Sprint Planning.

| Destino | Historias | Puntos de historia de referencia | Objetivo |
|---|---|---:|---|
| Sprint 1 | HU-03, HU-04, HU-05, HU-06 | 13 | Catálogo, entradas y existencias |
| Sprint 2 | HU-09, HU-10, HU-07, HU-08, HU-11 | 18 | Ventas, alertas, ajustes y movimientos |
| Product Backlog pendiente | HU-01, HU-02, HU-12, HU-13 | 18 | Implementación o validación posterior |
| **Total** | **13 HU** | **49** | **Alcance completo del producto** |

La decisión de aplazar HU-01 y HU-02 obedece al carácter **local y demostrativo** del prototipo: un navegador con HTML/JavaScript no implementa por sí solo autenticación y autorización seguras. Las prioridades base siguen siendo **Obligatorio** para HU-01 a HU-12 y **Deseable** para HU-13; aplazar una historia no reduce su prioridad de negocio.

## 3. Entorno y decisiones técnicas del prototipo

| Elemento | Definición de trabajo | Alcance o limitación |
|---|---|---|
| Interfaz | HTML, CSS y JavaScript | Abre mediante `prototipo/index.html` |
| Persistencia | `localStorage` | Datos disponibles solo en el navegador local |
| Versiones | Git y GitHub (`LAB_GSTI`) | Ramas `equipo-scrum`, `scrum/jael`, `scrum/christian` |
| Documentación | Markdown (`.md`) | Archivos en `LAB03/Scrum/` |
| Prototipo | Productos, inventario, ventas y reportes | Incrementos verificables por funciones, no sistema comercial terminado |
| Fuera de implementación actual | Login seguro, roles efectivos, concurrencia | HU-01 y HU-02 siguen pendientes |

**Regla de integración:** cada integrante trabaja en su rama personal y propone sus cambios para integrarlos a `equipo-scrum`. La rama `main` se actualiza únicamente después de la revisión del equipo/coordinador. Los commits deben reflejar aportes realmente revisados o realizados.

## 4. Definition of Done (criterios de terminado)

Una historia solo se marca **Finalizada** si: (1) funciona como indica el criterio de aceptación; (2) su código está integrado en la rama del equipo; (3) tiene al menos una prueba funcional documentada y aprobada; (4) registra correctamente los datos o movimientos que le corresponden; y (5) puede demostrarse durante la Sprint Review. El Product Owner contrasta el incremento con las necesidades del producto.

**«Product Backlog validado» no equivale a «historias finalizadas».** La aceptación de una historia depende de evidencias y de la Definition of Done.

## 5. Responsabilidades acordadas para el ejercicio

- **Christian (Product Owner / Developer):** ordenar y mantener el Product Backlog; desarrollar y validar principalmente HU-03, HU-04, HU-07 y HU-10.
- **Jael (Scrum Master / Developer):** facilitar los eventos y documentar impedimentos, pruebas y retrospectivas; desarrollar y validar principalmente HU-05, HU-06, HU-08 y HU-09.
- **Ambos:** estimar, seleccionar trabajo, integrar el incremento, verificar HU-11 y participar en las revisiones.

El reparto describe responsabilidades de trabajo; ambos Developers colaboran cuando existe una dependencia o un problema de integración.

## 6. Resultado y evidencia de preparación

## 6. Resultado y evidencia de preparación

Como resultado de la etapa preparatoria, se establecieron las herramientas de desarrollo, la organización del repositorio, las responsabilidades del equipo y los criterios necesarios para ejecutar los dos sprints del proyecto.

- **Estado del Product Backlog:** Validado por Christian Henry (Product Owner), versión 1.0, con 13 historias de usuario priorizadas.
- **Estimaciones de esfuerzo:** Se establecieron 49 puntos de historia como referencia inicial, distribuidos en 13 SP para el Sprint 1, 18 SP para el Sprint 2 y 18 SP pendientes. La confirmación conjunta de las estimaciones se registrará durante el Sprint Planning.
- **Tecnología seleccionada:** HTML, CSS y JavaScript, utilizando `localStorage` para el almacenamiento local de información.
- **Herramientas de trabajo:** Visual Studio Code, Git, GitHub y Google Meet.
- **Organización del repositorio:** Se estableció la rama compartida `equipo-scrum` y las ramas personales `scrum/jael` y `scrum/christian`.
- **Definition of Done:** Se definieron criterios de aceptación, integración, pruebas funcionales y demostración de incrementos.
- **Reunión de preparación y Sprint Planning 1:** Pendiente de registrar la fecha, hora y acuerdos de la reunión realizada.
- **Ejecución del entorno local:** Prototipo preparado; pendiente de registrar la verificación por ambos integrantes.
- **Impedimentos identificados:** Se presentó inicialmente un problema de permisos en GitHub debido a una invitación de colaboración caducada. Este inconveniente se solucionó mediante el envío y aceptación de una nueva invitación.
- **Evidencia E01:** `evidencias/01-preparacion-planning-sprint1.png` — Pendiente de incorporar la captura real de la reunión.

**Cierre de esta etapa:** Se dispone del Product Backlog validado, las herramientas seleccionadas, los criterios de terminado y la estructura de trabajo colaborativo. Los acuerdos y evidencias de ejecución se incorporarán una vez verificados. El Sprint 1 utilizará las historias seleccionadas en `sprint-1.md`.
