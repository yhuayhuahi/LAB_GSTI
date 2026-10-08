# Sistema de Gestión de Inventarios para Tienda Minorista
## Documentación base de requisitos (fuente: vault de historias de usuario)

> **Propósito:** este documento traduce y consolida el "vault" de historias de usuario del Stock Management System (STMS) como base de requisitos común para que el **Equipo Scrum** y el **Equipo Cascada** comiencen desde la misma información. Los elementos adaptados al contexto minorista del laboratorio están marcados con ⚙️.

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
| Control de stock | Seguimiento de existencias en tiempo real, entradas/salidas, alertas de stock bajo, ajustes manuales |
| Registro de ventas ⚙️ | Toda venta genera salida de stock (descuento automático) y queda registrada en el historial |
| Generación de reportes | Reportes de movimiento de stock, rotación, consumo y dashboards con KPIs |

---

## 2. Objetivos del sistema

- Proporcionar visibilidad del inventario en tiempo real.
- Automatizar la actualización de existencias tras cada venta o movimiento.
- Generar alertas de inventario bajo y estados críticos de stock.
- Mantener un historial completo de transacciones de inventario.
- Mejorar la toma de decisiones mediante reportes y analítica de inventario.
- Controlar el acceso mediante roles y permisos.

---

## 3. Alcance del proyecto

### Dentro del alcance (In Scope)

- Registro y actualización de entradas y salidas de stock.
- Seguimiento de niveles de stock en tiempo real.
- Sistema de notificaciones para stock bajo y estados críticos.
- Flujo de solicitud y aprobación de retiro de artículos.
- Reportes de movimiento de inventario (entradas y salidas).
- Dashboards para supervisión y analítica.
- Gestión de usuarios con autenticación y permisos por rol.

### Fuera del alcance (Out of Scope)

- Aplicación móvil nativa.
- Integración con sistemas contables/financieros externos.
- Automatización de la gestión de proveedores.
- Comercio electrónico / ventas en línea.

---

## 4. Roles de usuario (actores)

| Rol original (fuente) | Rol adaptado al minorista ⚙️ | Responsabilidad |
|---|---|---|
| Executive | Dueño de la tienda / Gerente general | Toma de decisiones basada en dashboards y analítica |
| System Administrator | Administrador del sistema | Gestión de cuentas, accesos y datos maestros |
| Stock Keeper | Encargado de almacén (almacenero) | Registra entradas/salidas y mantiene el stock al día |
| Stock Manager | Jefe de inventario / Supervisor | Supervisa el proceso completo y aprueba solicitudes |
| Technician | Vendedor | Solicita/retira artículos del stock para venderlos |

---

## 5. Historias de usuario por rol

### Dueño de la tienda / Gerente (Executive)

1. Como dueño de la tienda, quiero acceder a un dashboard integral, para tomar decisiones informadas basadas en datos y analítica en tiempo real.
2. Como dueño de la tienda, quiero recibir notificaciones sobre estados críticos de stock e inventario bajo, para tomar medidas proactivas ante posibles problemas.
3. Como dueño de la tienda, quiero acceder al dashboard de soporte a decisiones, para obtener información basada en datos sobre reabastecimiento y escenarios de gestión de inventario.

### Administrador del sistema (System Administrator)

1. Como administrador del sistema, quiero gestionar cuentas de usuario (crear, actualizar y eliminar), para que solo usuarios autorizados accedan al sistema.
2. Como administrador del sistema, quiero registrar y gestionar productos y clientes dentro del sistema ⚙️, para mantener los datos organizados y atribuir correctamente las transacciones de inventario.

### Encargado de almacén (Stock Keeper)

1. Como almacenero, quiero registrar fácilmente el stock recibido y el stock despachado, para mantener registros de inventario exactos y actualizados.
2. Como almacenero, quiero ver los niveles de stock en tiempo real de los distintos artículos, para identificar rápidamente cuándo el stock está bajo y necesita reabastecerse.
3. Como almacenero, quiero generar reportes de movimiento de stock, incluyendo entradas y salidas, para hacer seguimiento a los cambios de inventario a lo largo del tiempo.
4. Como almacenero, quiero acceder a un dashboard simplificado con información crítica de stock, para monitorear eficientemente el estado del inventario.
5. Como almacenero, quiero participar en el proceso de solicitud y aprobación de artículos, para asegurar que el stock se asigne adecuadamente según las necesidades.

### Jefe de inventario (Stock Manager)

1. Como jefe de inventario, quiero supervisar todo el proceso de gestión de stock, desde la entrada hasta el despacho, para asegurar un control de inventario exacto y eficiente.
2. Como jefe de inventario, quiero acceder a un dashboard con datos y analítica de stock en tiempo real, para monitorear los niveles de inventario y tomar decisiones informadas.
3. Como jefe de inventario, quiero aprobar o rechazar solicitudes de artículos de los vendedores u otras áreas, para asegurar una correcta asignación y utilización del stock.
4. Como jefe de inventario, quiero recibir notificaciones de eventos de stock (inventario bajo, estados críticos), para mantener niveles de stock óptimos.
5. Como jefe de inventario, quiero crear y gestionar registros completos de productos y clientes ⚙️, incluyendo asignación y uso de stock específico, para proporcionar datos detallados y organizados.

### Vendedor (Technician → adaptado)

1. Como vendedor, quiero crear solicitudes para retirar artículos del stock ⚙️ (procesar la venta), para atender las necesidades de los clientes.
2. Como vendedor, quiero que mis solicitudes de artículos sean revisadas y aprobadas por el jefe de inventario, para que el proceso sea ordenado y siga los protocolos de la tienda.
3. Como vendedor, quiero ser notificado cuando mi solicitud sea aprobada y los artículos estén listos, para planificar mi trabajo sin demoras innecesarias.
4. Como vendedor, quiero un proceso ágil para retirar los artículos aprobados del stock, para completar la venta sin contratiempos y volver a atender clientes promptly.

---

## 6. Priorización (MoSCoW simplificada)

Dado el flujo operativo y las dependencias entre funcionalidades, la gestión de productos y clientes es prioritaria porque es el elemento estructural que da contexto a las transacciones de inventario, las solicitudes y los reportes.

### Must Have (indispensable)

- **Gestión de usuarios** → fundamental para la seguridad del sistema y las funcionalidades por rol.
- **Gestión de productos y clientes** ⚙️ → crítica para dar contexto a las transacciones de stock y que solicitudes, gestión de inventario y reportes queden correctamente asociados.
- **Gestión de inventario** → central para el seguimiento y gestión del stock.
- **Flujo de solicitud y aprobación** ⚙️ (registro de ventas) → clave para la funcionalidad operativa, permitiendo registrar salidas de stock por venta dentro del contexto de cada producto/cliente.

### Should Have (deseable)

- **Sistema de dashboards** → importante para supervisión e insights, pero depende de los datos provistos por las funcionalidades "Must Have".
- **Sistema de notificaciones** → esencial para la gestión proactiva; su utilidad se maximiza una vez que las estructuras de datos base existen.
- **Sistema de reportes** → necesario para insights operativos y seguimiento; su pleno potencial se desbloquea con datos completos de productos, clientes e inventario.

---

## 7. Backlog priorizado (formato tablero tipo Jira)

1. Como **administrador del sistema**, quiero gestionar cuentas de usuario, para que solo usuarios autorizados accedan al sistema.
2. Como **administrador del sistema**, quiero registrar y gestionar productos y clientes en el sistema ⚙️, para asegurar que todas las transacciones de stock se atribuyan correctamente.
3. Como **almacenero**, quiero registrar los detalles del stock entrante y saliente, para asegurar su correcta asociación con los productos correspondientes.
4. Como **vendedor**, quiero crear solicitudes de artículos (ventas) ⚙️, especificando a qué producto/cliente corresponden, para una gestión exacta del stock.
5. Como **jefe de inventario**, quiero revisar y aprobar solicitudes de artículos en su contexto, para mantener una utilización eficiente del stock.
6. Como **dueño de la tienda**, quiero ver un dashboard integral con datos y analítica en tiempo real sobre niveles de stock, consumo y actividad de clientes, para decidir con información.
7. Como **jefe de inventario**, quiero configurar y recibir notificaciones sobre niveles de stock y necesidades de reabastecimiento, para asegurar disponibilidad óptima de stock.

> Este enfoque asegura que el desarrollo se concentre primero en los elementos estructurales, apoyando la integridad y utilidad del sistema a medida que se expande a funcionalidades más complejas.

---

## 8. Épicas e historias de usuario/tareas (desglose para desarrollo)

El desarrollo se organiza en **7 épicas**, con historias de backend y frontend para cubrir el esfuerzo completo:

### Épica 1: Gestión de usuarios
- **Backend:** Implementar el sistema de autenticación y autorización de usuarios.
- **Frontend:** Diseñar y desarrollar la interfaz de inicio de sesión y registro de usuarios.

### Épica 2: Gestión de productos y clientes ⚙️
- **Backend:** Crear modelos de base de datos para productos y clientes. Desarrollar las APIs para su gestión.
- **Frontend:** Diseñar y desarrollar las interfaces para agregar, editar y ver productos y clientes.

### Épica 3: Gestión de inventario (control de stock)
- **Backend:** Implementar modelos de seguimiento de inventario y APIs para transacciones de artículos de stock.
- **Frontend:** Crear componentes de interfaz para entradas, actualizaciones y reportes de inventario.

### Épica 4: Flujo de solicitud y aprobación (registro de ventas ⚙️)
- **Backend:** Desarrollar el sistema de flujo para el envío y aprobación de solicitudes de artículos.
- **Frontend:** Diseñar el formulario de envío de solicitudes y la interfaz de gestión de aprobaciones.

### Épica 5: Sistema de notificaciones
- **Backend:** Implementar un servicio de notificaciones para alertas de estado de stock y aprobaciones.
- **Frontend:** Integrar las alertas de notificación en el dashboard del usuario.

### Épica 6: Sistema de reportes (generación de reportes)
- **Backend:** Desarrollar herramientas de reportes de inventario, productos y clientes.
- **Frontend:** Diseñar e implementar dashboards de reportes y funciones de exportación.

### Épica 7: Reportes ejecutivos y dashboards
- **Backend:** Crear endpoints de agregación de datos y analítica para insights ejecutivos.
- **Frontend:** Diseñar y desarrollar el dashboard ejecutivo con analítica y visualización de datos en tiempo real.

---

## 9. Consideraciones adicionales de desarrollo

- Todas las interfaces frontend deben ser responsivas y fáciles de usar, adaptándose a distintos dispositivos y tamaños de pantalla.
- El backend debe priorizar el manejo de datos seguro, escalable y eficiente, con documentación clara de APIs para la integración con el frontend.
- La colaboración entre los equipos de frontend y backend es esencial para alinear los requisitos de datos, las expectativas de interfaz y garantizar una integración y experiencia de usuario fluidas.

> Este marco proporciona una hoja de ruta al equipo de desarrollo: al dividir el proyecto en elementos específicos y accionables, los equipos pueden asignar recursos eficientemente, hacer seguimiento del progreso y asegurar que todos los aspectos del sistema se desarrollen conforme a las necesidades del negocio.

---

## 10. Cómo usar esta base en el laboratorio

| Equipo | Uso del documento |
|---|---|
| **Scrum** | Toma las secciones 5, 6 y 7: el backlog de producto ya está priorizado (Must/Should). En la reunión de planificación del Sprint estiman las historias (p. ej. con Planning Poker), definen la meta del Sprint y deciden cuántos sprints necesitan (sugerencia: Must Have = Sprints 1–2, Should Have = Sprint 3). |
| **Cascada** | Toma las secciones 1–4 y 9: fija requisitos (historias convertidas en requisitos funcionales), luego diseña (épicas como módulos), implementa, prueba (criterios de las historias como casos de prueba) y define el mantenimiento. La planificación es completa desde el inicio, sin replanificaciones. |

---

## 11. Registro de adaptaciones sobre la fuente original ⚙️

| Elemento original (STMS) | Adaptación (laboratorio) | Justificación |
|---|---|---|
| Contexto: gestión de stock para proyectos con técnicos | Tienda de comercio minorista | Encaje con el punto 1.2 del laboratorio |
| Technician (solicita ítems para proyectos) | Vendedor (procesa ventas que retiran stock) | El "despacho de stock" en retail es la venta |
| Project and Customer Management | Gestión de productos y clientes | En retail, el maestro de datos es el catálogo de productos, no proyectos |
| Request and Approval Workflow | Flujo de venta / solicitud y aprobación | Registra la salida de stock por venta |
| Dispatch of stock | Salida de stock por venta | Equivalencia operativa en minoristas |

*Todo lo demás (historias, priorización, épicas, consideraciones) es traducción fiel de la fuente.*