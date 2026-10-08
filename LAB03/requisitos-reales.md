# Sistema de Gestión de Inventarios para Tienda Minorista
## Documentación base de requisitos — Versión limitada (laboratorio de 12 días)

> **Propósito:** base de requisitos común para el **Equipo Scrum** y el **Equipo Cascada**, traducida y adaptada del vault de historias de usuario del STMS, y **limitada a lo alcanzable en 12 días (2 semanas)**. Los elementos adaptados al contexto minorista están marcados con ⚙️.

---

## Referencia de la fuente

**Formato APA 7:**

> iradukunda, L. M. K. (2024, 7 de marzo). *User Stories for Stock Management System*. HackMD. https://hackmd.io/@esteem-tech-stms/rySIStw6T

---

## 1. Presentación del caso

Una tienda de comercio minorista necesita reemplazar el control manual de su inventario por un sistema centralizado de gestión de inventarios. El registro manual genera errores de digitación, los niveles de stock no se actualizan en tiempo real, el inventario registrado difiere del stock físico y las decisiones de reabastecimiento se retrasan, provocando quiebres de stock.

El sistema a desarrollar debe cubrir los **tres módulos del laboratorio**:

| Módulo del laboratorio | Cobertura |
|---|---|
| Control de stock | Niveles de stock en tiempo real, entradas/salidas, alertas de stock bajo, ajustes manuales |
| Registro de ventas | Toda venta genera salida de stock (descuento automático) y queda registrada en el historial |
| Generación de reportes | Reportes de movimiento de stock, ventas y un dashboard con KPIs |

---

## 2. Objetivos del sistema

- Proporcionar visibilidad del inventario en tiempo real.
- Automatizar la actualización de existencias tras cada venta o movimiento.
- Identificar productos con stock bajo mediante alertas simples.
- Mantener un historial de transacciones de inventario y ventas.
- Apoyar la toma de decisiones con reportes básicos y un dashboard de KPIs.
- Controlar el acceso mediante roles y permisos.

---

## 3. Alcance del proyecto (limitado a 12 días)

### Dentro del alcance (In Scope)

- Inicio de sesión con roles (administrador, almacenero, vendedor).
- Catálogo de productos (registro, edición, búsqueda, stock inicial).
- Registro de entradas de stock y ajustes manuales con motivo.
- Niveles de stock en tiempo real con estados: Disponible / Bajo mínimo / Agotado.
- Alertas de stock bajo (umbral por producto).
- Registro de ventas con descuento automático de stock e historial.
- Reportes de movimiento de stock y de ventas por período.
- Dashboard simple con KPIs (valor de inventario, productos bajo mínimo, ventas del día).

### Fuera del alcance (Out of Scope) — recortado por tiempo

- Aplicación móvil nativa y responsividad multi-dispositivo completa.
- Integración con sistemas contables/financieros externos.
- Comercio electrónico / ventas en línea.
- **Gestión de clientes** (existía en la fuente; recortada: no es necesaria para los 3 módulos).
- **Flujo de solicitud y aprobación** (existía en la fuente; recortado: la venta descuenta stock directamente).
- **Notificaciones como servicio separado** (existía en la fuente; sustituido por alertas simples en pantalla).
- **Dashboard ejecutivo avanzado** (existía en la fuente; sustituido por KPIs básicos).
- Exportación de reportes a PDF/Excel (queda como *Should Have* opcional si hay tiempo).

---

## 4. Roles de usuario (actores)

| Rol adaptado al minorista ⚙️ | Responsabilidad |
|---|---|
| Dueño de la tienda / Gerente general | Toma de decisiones basada en reportes y dashboard |
| Administrador del sistema | Gestiona usuarios, roles y el catálogo de productos |
| Encargado de almacén (almacenero) | Registra entradas, ajustes y monitorea el stock |
| Vendedor | Registra ventas, que descuentan stock automáticamente |

---

## 5. Historias de usuario del backlog (versión limitada)

> Total: **13 historias** (12 Must + 1 Should). Formato: "Como [rol], quiero [funcionalidad], para [beneficio]".

### Épica A — Gestión de usuarios y accesos *(Must Have)*

- **HU-01.** Como administrador, quiero iniciar sesión con usuario y contraseña, para acceder al sistema de forma segura.
- **HU-02.** Como administrador, quiero que el sistema distinga roles (administrador, almacenero, vendedor), para que cada usuario solo vea las funciones que le corresponden.

### Épica B — Catálogo de productos *(Must Have)*

- **HU-03.** Como administrador, quiero registrar y editar productos (código, nombre, categoría, precio, stock mínimo y stock inicial), para mantener el catálogo de la tienda.
- **HU-04.** Como vendedor, quiero buscar productos por código o nombre, para consultar rápidamente su disponibilidad y precio.

### Épica C — Control de stock *(Must Have)*

- **HU-05.** Como almacenero, quiero registrar entradas de stock (recepción de mercadería), para mantener las cantidades exactas.
- **HU-06.** Como almacenero, quiero ver los niveles de stock en tiempo real con su estado (Disponible / Bajo mínimo / Agotado), para saber qué reabastecer.
- **HU-07.** Como almacenero, quiero recibir alertas cuando un producto caiga por debajo de su stock mínimo, para reponerlo a tiempo.
- **HU-08.** Como almacenero, quiero ajustar manualmente el stock con un motivo (conteo físico, merma), para corregir diferencias dejando registro del cambio.

### Épica D — Registro de ventas *(Must Have)*

- **HU-09.** Como vendedor, quiero registrar una venta de uno o más productos, para que el stock se descuente automáticamente al momento de la transacción.
- **HU-10.** Como vendedor, quiero que cada venta quede registrada con fecha, hora, productos y cantidades, para mantener un historial de transacciones consultable.

### Épica E — Reportes y dashboard *(Must Have + 1 Should)*

- **HU-11.** Como dueño de la tienda, quiero un reporte de movimiento de stock (entradas y salidas) por período, para hacer seguimiento a los cambios de inventario.
- **HU-12.** Como dueño de la tienda, quiero un reporte de ventas por día, semana y producto, para identificar tendencias.
- **HU-13** *(Should Have)*.** Como dueño de la tienda, quiero un dashboard con KPIs (valor total del inventario, productos bajo mínimo, ventas del día), para decidir con información sin generar reportes manualmente.

### Priorización resumida

| Prioridad | Épicas | Justificación |
|---|---|---|
| **Must Have** | A, B, C, D, E (HU-01 a HU-12) | Base estructural: sin acceso, catálogo y stock no hay ventas ni reportes |
| **Should Have** | HU-13 (dashboard) | Depende de los datos generados por las Must Have |

---

## 6. Consideraciones adicionales de desarrollo

- Las interfaces deben ser simples y usables; se prioriza funcionalidad sobre estética dentro del plazo.
- El backend debe priorizar manejo de datos seguro y eficiente (autenticación, integridad del stock).
- Al ser un proyecto de 12 días, se recomienda una tecnología conocida por el equipo (p. ej. web con base de datos relacional, o incluso escritorio con BD local).

---

## 7. Registro de adaptaciones sobre la fuente original ⚙️

| Elemento original (STMS) | Adaptación (laboratorio) | Justificación |
|---|---|---|
| Contexto: gestión de stock para proyectos con técnicos | Tienda de comercio minorista | Encaje con el punto 1.2 del laboratorio |
| Technician (solicita ítems para proyectos) | Vendedor (registrar ventas que retiran stock) | El "despacho de stock" en retail es la venta |
| Project and Customer Management | Catálogo de productos | En retail, el maestro de datos es el catálogo; gestión de clientes recortada por tiempo |
| Request and Approval Workflow | Registro de venta directa con descuento de stock | Simplificación: sin flujo de aprobación, la venta descuenta directamente |
| Notification System (servicio separado) | Alertas simples de stock bajo en pantalla | Suficiente para el módulo de control de stock; servicio completo fuera de plazo |
| Dashboard ejecutivo avanzado (Epic 7) | Dashboard con 3 KPIs (HU-13) | Versión mínima viable del dashboard |
| 22+ historias / 7 épicas | 13 historias / 5 épicas | Alcance alcanzable en 12 días |

*Todo lo demás (formato de historias, lógica de priorización, estructura por épicas) sigue la fuente.*