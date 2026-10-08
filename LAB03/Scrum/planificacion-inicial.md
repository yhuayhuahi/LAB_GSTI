# Planificación Inicial — Equipo Scrum
## Sistema de Gestión de Inventarios para Tienda Minorista

> **Duración del laboratorio:** 12 días (2 semanas).
> **Objetivo del equipo:** entregar **incrementos de producto funcionales por sprint**, priorizando las funcionalidades esenciales. **No** es objetivo agotar todo el backlog: las historias no desarrolladas permanecen en el Product Backlog ordenado — eso es parte del aprendizaje de la metodología.
> **Base de trabajo:** documento "Sistema de Gestión de Inventarios para Tienda Minorista — Requisitos Base" (13 historias de usuario, 5 épicas).

---

## 1. Roles del equipo (2 integrantes)

Con 2 personas, cada una sostiene **una accountability oficial de Scrum** y ambas son Developers. Es la adaptación mínima que preserva las tres accountabilities sin combinarlas en una sola persona:

### Rol 1 — Product Owner / Developer

| Responsabilidad | Detalle |
|---|---|
| Product Backlog | Es el único responsable de ordenar y priorizar el backlog (las 13 HU) |
| Alcance del sprint | Decide qué entra a cada Sprint Backlog según valor y dependencias |
| Aceptación del trabajo | Acepta o rechaza los incrementos en el Sprint Review (criterios de aceptación de cada HU) |
| Desarrollo | Escribe código como Developer |

### Rol 2 — Scrum Master / Developer

| Responsabilidad | Detalle |
|---|---|
| Proceso | Garantiza que el equipo siga las prácticas de Scrum (timeboxes, ceremonias, Definition of Done) |
| Impedimentos | Detecta y ayuda a resolver bloqueos (ej. entorno técnico, dependencias) |
| Facilitación | Facilita el Sprint Planning y la Retrospective |
| Desarrollo | Escribe código como Developer |

> **Nota de adaptación:** Scrum define 3 accountabilities (PO, SM, Developers) y no contempla equipos de 2. Al ser 2 personas, cada una asume una accountability y comparten la de Developers. El Coordinador del laboratorio actúa como **stakeholder invitado** en los Sprint Reviews (observa, no dirige).

---

## 2. Estructura de sprints (12 días)

| Sprint | Días | Duración | Naturaleza |
|---|---|---|---|
| Sprint 0 | 1–2 | 2 días | Preparación (sin incremento) |
| Sprint 1 | 3–7 | 5 días | Incremento 1 |
| Sprint 2 | 8–12 | 5 días | Incremento 2 |

### Sprint 0 — Preparación (días 1–2)

> **Nota de fidelidad:** el "Sprint 0" **no existe en la Guía de Scrum** (todo sprint oficial debe producir un incremento). Es una práctica extendida de la industria para preparar el arranque. En este laboratorio se justifica porque el equipo necesita refinar y estimar el backlog base (~80% de claridad sobre qué se hará) y preparar el entorno.

Actividades:
- **Refinamiento del backlog:** dividir las 13 historias en tareas técnicas y detectar dependencias (ej. HU-09 ventas requiere HU-03 catálogo).
- **Estimación:** puntuar las historias (Planning Poker, escala simple: 1/2/3/5/8 puntos).
- **Orden del backlog:** el PO ordena por valor + dependencias (no por épica).
- **Definición de Done:** acordar el criterio de "terminado" (ver sección 4).
- **Entorno técnico:** decidir stack, repositorio/control de versiones, y proyecto base funcionando.

**Entregable del Sprint 0:** Product Backlog refinado y estimado + entorno listo. *No hay incremento ni Review.*

### Sprint 1 — "El inventario visible" (días 3–7)

| Elemento | Contenido |
|---|---|
| **Meta del Sprint** | El sistema permite iniciar sesión, gestionar el catálogo y ver el stock en tiempo real |
| **Historias comprometidas** | HU-01 (login), HU-02 (roles), HU-03 (catálogo), HU-04 (búsqueda), HU-05 (entradas de stock), HU-06 (niveles en tiempo real) |
| **Incremento esperado** | App funcionando: login por rol + CRUD de productos + consulta de stock actualizado |

### Sprint 2 — "Vender y reportar" (días 8–12)

| Elemento | Contenido |
|---|---|
| **Meta del Sprint** | Las ventas descuentan stock automáticamente y se puede consultar el primer reporte |
| **Historias comprometidas** | HU-07 (alertas stock bajo), HU-08 (ajustes manuales), HU-09 (registro de ventas), HU-10 (historial de ventas), HU-11 (reporte de movimientos) |
| **Incremento esperado** | Sistema completo de los 3 módulos en versión esencial: stock + ventas + reporte básico |

### Lo que NO se desarrolla (permanece en el backlog)

- **HU-12** (reporte de ventas por período) y **HU-13** (dashboard de KPIs) quedan en el Product Backlog ordenadas para un hipotético Sprint 3.

> 📌 **Esto es deliberado:** en Scrum el backlog nunca "se termina"; se prioriza y se entrega lo más valioso primero. Quedarían 2 historias pendientes de las 13 — y el producto sigue siendo usable y demostrable sin ellas.

---

## 3. Ceremonias (timeboxes)

| Ceremonia | Cuándo | Duración | Responsable |
|---|---|---|---|
| Sprint Planning | Día 3 y día 8 (inicio de cada sprint) | ~2 h | Todo el equipo (facilita el SM) |
| Daily Scrum | Cada día de sprint | 10 min | Developers |
| Sprint Review | Día 7 y día 12 | ~1 h | Todo el equipo + Coordinador (stakeholder) |
| Retrospective | Tras cada Review | ~45 min | Todo el equipo (facilita el SM) |

> La **Review** es donde el Coordinador ve el incremento y el PO puede **repriorizar** el backlog restante. Con requisitos estables no hay redescubrimiento de necesidades, pero la repriorización entre sprints sigue ocurriendo (ej. si algo quedó a medias, sube en el orden).

---

## 4. Artefactos y Definition of Done

| Artefacto | En este laboratorio |
|---|---|
| **Product Backlog** | Las 13 HU ordenadas por el PO (existe ya en el documento base; se refina en Sprint 0) |
| **Sprint Backlog** | Historias + tareas del sprint actual; se actualiza a diario |
| **Incremento** | Producto funcionando al final de cada sprint |

**Definition of Done (propuesta, el equipo la confirma en Sprint 0):**

- Funcionalidad implementada y probada básicamente (prueba manual del flujo).
- Integrada al repositorio del proyecto (el resto del equipo puede ejecutarla).
- Cumple los criterios de aceptación de la historia (formato "quiero / para").
- Demostrable en el Sprint Review.

---

## 5. Cómo opera Scrum con requisitos estables (nota metodológica)

En el caso clásico (requerimientos cambiantes + usuario involucrado), cada iteración redescubre requisitos y el PO reformula el backlog con el feedback del usuario. Aquí los requisitos ya son estables (documento base común), así que la iteración se manifiesta distinto:

1. **El valor se entrega por incrementos:** cada sprint produce producto usable, no documentos (contraste directo con Cascada).
2. **La priorización sigue viva:** el PO decide qué historia entra a cada sprint por valor y dependencia, no por orden del documento.
3. **La Review reordena, no redescubre:** si un sprint entrega de menos, el PO reprioriza el backlog en lugar de "estirar" el sprint.
4. **El alcance entre sprints es ajustable; dentro del sprint no:** una historia comprometida no se cambia a mitad de sprint (protege el objetivo); los cambios van al backlog para el siguiente sprint.

---

## 6. Reglas de trabajo (fiel a la metodología)

- Sprints de duración fija (**timeboxed**): no se extienden, se recorta el alcance.
- Cada sprint tiene una **meta**; si se vuelve inalcanzable, el PO renegocia el alcance con el equipo.
- **Diseño emergente:** no hay fase de diseño global previa (contraste con Cascada); el diseño se hace dentro de cada sprint, lo justo para las historias comprometidas.
- El incremento debe estar **integrado y funcionando** al final del sprint, no "casi listo".
- Transparencia: el Sprint Backlog es visible y refleja el estado real a diario.