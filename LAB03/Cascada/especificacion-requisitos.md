Especificación de Requisitos de Software — Sistema de Gestión de Inventarios

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista 

**Metodología:** Cascada — Fase 1: Requisitos 

**Autor / Analista de Requisitos:** Angelo Jair Vega Figueroa

**Revisor / Arquitecto de Sistemas:** Daniel Wilston Chura Monroy

**Estado:** Finalizado (Día 4)

---

## 1. Introducción y Alcance del Proyecto

### 1.1 Propósito y Objetivos del Sistema
El presente documento define la Especificación de Requisitos de Software (SRS) para el reemplazo del control manual de inventario por un sistema informático centralizado. 
El sistema buscar lo siguiente: 
- Automatizar el control de stock.
- Registrar ventas con descuento automático en tiempo real.
- Emitir alertas de reabastecimiento.
- Generar reportes para la toma de decisiones}.

### 1.2 Alcance del Proyecto (Límite de 12 días)
* **Dentro del Alcance:**
  - Autenticación y roles de usuario
  - Catálogo de productos
  - Entradas y ajustes de stock
  - Alertas de stock bajo
  - Registro de ventas con descuento automático
  - Reportes de movimiento y ventas
  - Dashboard básico con KPIs
  
* **Fuera del Alcance:**
  - Aplicación móvil nativa
  - Integración contable/financiera externa
  - Comercio electrónico
  - Gestión de clientes
  - Flujo complejo de solicitudes y aprobaciones
  - Notificaciones por SMS/email externos

---

## 2. Roles y Actores del Sistema

| Rol / Actor | Responsabilidad en el Sistema |
| :--- | :--- |
| **Administrador del Sistema** | Gestiona usuarios, asigna roles y mantiene el catálogo maestro de productos. |
| **Encargado de Almacén (Almacenero)** | Registra recepciones de mercadería, ajustes de stock por merma o conteo físico y atiende alertas. |
| **Vendedor** | Consulta productos disponibles y procesa ventas con descuento automático de stock. |
| **Dueño de la Tienda / Gerente** | Consulta reportes consolidados y monitorea el dashboard de indicadores (KPIs). |

---

---

## 3. Especificación de requisitos funcionales y no funcionales

*Nota: La especificación de requisitos y su mapeo con las historias de usuario se encuentra respaldada en este documento: https://docs.google.com/document/d/15p-paiSe8IJd8Q8R2E23NbWCgZG-GgkMTj_ijZ_tqwQ/edit?tab=t.0*

### 3.1 Requisitos funcionales (RF)

| ID | Nombre del requisito | Descripción detallada | Origen (HU) | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-01** | Autenticación de usuarios | El sistema debe permitir a los usuarios registrados iniciar sesión mediante nombre de usuario y contraseña cifrada. | HU-01 | Alta |
| **RF-02** | Control de acceso por roles | El sistema debe restringir el acceso a módulos y funciones según el rol asignado (administrador, almacenero, vendedor). | HU-02 | Alta |
| **RF-03** | Gestión de catálogo de productos | El sistema debe permitir al administrador registrar y editar productos con los datos: código, nombre, categoría, precio, stock inicial y stock mínimo. | HU-03 | Alta |
| **RF-04** | Búsqueda de productos | El sistema debe permitir a vendedores y almaceneros buscar productos por código o nombre en tiempo real. | HU-04 | Alta |
| **RF-05** | Registro de entradas de stock | El sistema debe permitir al almacenero registrar ingresos de mercadería, incrementando el stock disponible. | HU-05 | Alta |
| **RF-06** | Niveles de stock en tiempo real | El sistema debe mostrar las existencias en tiempo real indicando su estado: disponible, bajo mínimo o agotado. | HU-06 | Alta |
| **RF-07** | Alertas de stock bajo | El sistema debe emitir alertas automáticas en pantalla cuando el stock de un producto sea menor o igual al umbral mínimo. | HU-07 | Alta |
| **RF-08** | Ajuste manual de inventario | El sistema debe permitir realizar ajustes manuales de stock registrando obligatoriamente el motivo (merma, rotura, conteo físico). | HU-08 | Alta |
| **RF-09** | Registro de ventas con descuento directo | El sistema debe registrar ventas descontando de forma inmediata las unidades del stock disponible. | HU-09 | Alta |
| **RF-10** | Historial de transacciones de venta | El sistema debe almacenar el registro de cada venta con fecha, hora, productos, cantidades, total y vendedor. | HU-10 | Alta |
| **RF-11** | Reporte de movimientos de inventario | El sistema debe generar reportes de entradas, salidas y ajustes por rango de fechas. | HU-11 | Alta |
| **RF-12** | Reporte de ventas por período | El sistema debe generar reportes consolidados de ventas diarias, semanales y por producto. | HU-12 | Alta |
| **RF-13** | Panel de control con indicadores clave (KPIs) | El sistema debe mostrar una pantalla con tres indicadores: valor del inventario, productos bajo mínimo y ventas del día. | HU-13 | Media |

### 3.2 Requisitos no funcionales (RNF)

| ID | Categoría | Descripción | Criterio de aceptación / Métrica |
| :--- | :--- | :--- | :--- |
| **RNF-01** | Seguridad | Autenticación obligatoria con contraseñas encriptadas y control de acceso basado en roles (RBAC). | Ningún usuario no autenticado debe acceder a los módulos del sistema. |
| **RNF-02** | Rendimiento | Tiempo de respuesta para búsquedas de productos y registros de venta inferior a 2 segundos. | Medido en condiciones de carga normal (hasta 20 usuarios concurrentes). |
| **RNF-03** | Disponibilidad | El sistema debe estar operativo el 99% del tiempo durante el horario comercial. | Inactividad no programada menor a 5 horas mensuales. |
| **RNF-04** | Usabilidad | Interfaz intuitiva y adaptable a dispositivos de escritorio y portátiles. | Un usuario nuevo debe operar el sistema tras menos de 10 minutos de inducción. |
| **RNF-05** | Mantenibilidad | Estructura modular del código y documentación estandarizada en Markdown. | Cumplimiento del estándar de repositorio en GitHub. |

---

## 4. Dependencias de requisitos

Se establece la relación de precedencia técnica entre los requisitos funcionales para garantizar un desarrollo secuencial coherente en la fase de diseño e implementación:

| Requisito | Requisitos de los que depende | Justificación de la dependencia |
| :--- | :--- | :--- |
| **RF-02** (Control de acceso) | **RF-01** (Autenticación) | Se requiere identificar al usuario antes de validar sus permisos y rol. |
| **RF-04, RF-05, RF-08** (Operaciones de stock) | **RF-03** (Catálogo de productos) | No se pueden buscar, ingresar ni ajustar productos que no existan registrados en el catálogo. |
| **RF-06, RF-07** (Visualización y alertas) | **RF-03, RF-05, RF-08** | Las existencias y alertas dependen de las existencias iniciales e ingresos registrados. |
| **RF-09** (Registro de ventas) | **RF-03, RF-04, RF-06** | Para vender se debe buscar el producto en el catálogo y verificar la disponibilidad de existencias. |
| **RF-10** (Historial de ventas) | **RF-09** (Registro de ventas) | El historial se alimenta directamente de las transacciones de venta procesadas. |
| **RF-11, RF-12** (Reportes) | **RF-05, RF-08, RF-09, RF-10** | Los reportes consolidan la información generada por los movimientos de stock y ventas realizadas. |
| **RF-13** (Panel de control - KPIs) | **RF-06, RF-07, RF-09, RF-12** | Los indicadores calculan métricas basadas en las existencias, alertas activas y ventas del día. |

---

## 5. Especificación de casos de uso

### 5.0. Diagrama general de casos de uso (UML)

![Diagrama de Casos de Uso UML](./CasosdeUso.png)

*Figura 5.1: Diagrama de casos de uso del sistema de gestión de inventarios, representando las interacciones de los cuatro actores principales (Vendedor, Almacenero, Administrador y Dueño) junto con sus relaciones de inclusión (`<<include>>`) y extensión (`<<extend>>`).*

---

### 5.1. CU-01: Registrar venta de productos

| Campo | Detalle |
| :--- | :--- |
| **Identificador** | CU-01 |
| **Nombre** | Registrar venta de productos |
| **Actores** | Vendedor |
| **Requisitos asociados** | RF-04, RF-06, RF-09, RF-10 |
| **Precondiciones** | 1. El vendedor ha iniciado sesión correctamente en el sistema (RF-01).<br>2. Existen productos registrados en el catálogo con existencias disponibles. |
| **Postcondiciones** | 1. La transacción de venta queda registrada con fecha, hora, productos, cantidades y vendedor.<br>2. El stock disponible de los productos vendidos se descuenta automáticamente de forma inmediata. |
| **Flujo principal** | 1. El vendedor ingresa al módulo de ventas.<br>2. Busca el producto por código o nombre mediante la función incluida `Buscar producto` (RF-04).<br>3. El sistema muestra los datos del producto, precio y existencias disponibles mediante `Verificar nivel de stock` (RF-06).<br>4. El vendedor ingresa la cantidad a vender y agrega el producto a la transacción.<br>5. El vendedor repite los pasos 2 a 4 para cada producto solicitado por el cliente.<br>6. El sistema calcula el total acumulado de la venta.<br>7. El vendedor confirma la transacción.<br>8. El sistema procesa la venta y ejecuta `Guardar historial de venta` (RF-10). |
| **Flujos alternativos** | **Stock insuficiente:** Si la cantidad requerida es mayor al stock disponible, el sistema bloquea la adición y emite una advertencia.<br>**Alerta de stock bajo:** Si tras la verificación el stock es menor o igual al umbral mínimo, se emite una notificación en pantalla (RF-07).<br>**Cancelación de la venta:** El vendedor puede cancelar la operación antes de confirmarla sin afectar el inventario. |

---

### 5.2. CU-02: Registrar entrada y ajuste de stock

| Campo | Detalle |
| :--- | :--- |
| **Identificador** | CU-02 |
| **Nombre** | Registrar entrada y ajuste de stock |
| **Actores** | Almacenero |
| **Requisitos asociados** | RF-05, RF-06, RF-07, RF-08 |
| **Precondiciones** | 1. El almacenero ha iniciado sesión con el rol correspondiente (RF-02).<br>2. El producto a ingresar o ajustar existe registrado en el catálogo. |
| **Postcondiciones** | 1. Se actualiza el stock disponible del producto.<br>2. Se guarda la transacción de movimiento de inventario indicando tipo, cantidad, motivo y responsable. |
| **Flujo principal** | 1. El almacenero ingresa al módulo de control de inventario.<br>2. Selecciona el producto del catálogo.<br>3. Selecciona el tipo de operación: "Entrada de stock" o "Ajuste manual".<br>4. Ingresa la cantidad de unidades.<br>5. En caso de ajuste manual, el sistema ejecuta `Registrar motivo de ajuste` obligando a seleccionar la causa (merma, rotura o conteo físico) (RF-08).<br>6. El almacenero confirma el registro.<br>7. El sistema actualiza el inventario y recalcula los niveles de stock en tiempo real. |
| **Flujos alternativos** | **Omisión del motivo de ajuste:** Si el almacenero no selecciona una justificación en un ajuste manual, el sistema impide guardar la operación hasta completar el campo. |

---

### 5.3. CU-03: Gestionar catálogo de productos

| Campo | Detalle |
| :--- | :--- |
| **Identificador** | CU-03 |
| **Nombre** | Gestionar catálogo de productos |
| **Actores** | Administrador |
| **Requisitos asociados** | RF-01, RF-02, RF-03 |
| **Precondiciones** | 1. El usuario se ha autenticado con credenciales de administrador. |
| **Postcondiciones** | 1. El producto queda guardado, modificado o actualizado en la base de datos del catálogo. |
| **Flujo principal** | 1. El administrador ingresa a la sección de catálogo de productos.<br>2. Selecciona la opción "Nuevo producto" o "Editar producto".<br>3. Ingresa los datos obligatorios: código, nombre, categoría, precio, stock inicial y stock mínimo.<br>4. El sistema valida los formatos numéricos y verifica la no duplicidad del código.<br>5. El administrador confirma la operación.<br>6. El sistema guarda la información y actualiza el catálogo visible. |
| **Flujos alternativos** | **Código duplicado:** El sistema rechaza la creación si el código ingresado ya pertenece a otro producto activo.<br>**Datos inválidos:** Se resaltan en rojo los campos obligatorios incompletos o con valores negativos. |

---

### 5.4. CU-04: Consultar reportes e indicadores

| Campo | Detalle |
| :--- | :--- |
| **Identificador** | CU-04 |
| **Nombre** | Consultar reportes e indicadores |
| **Actores** | Dueño |
| **Requisitos asociados** | RF-11, RF-12, RF-13 |
| **Precondiciones** | 1. El dueño ha iniciado sesión con el rol correspondiente.<br>2. Existen transacciones de venta e inventario registradas en el sistema. |
| **Postcondiciones** | 1. El sistema despliega las métricas consolidadas o reportes en pantalla sin modificar los datos del sistema. |
| **Flujo principal** | 1. El dueño ingresa al módulo de reportes o panel principal (dashboard).<br>2. Selecciona el tipo de consulta: reportes de movimientos, reportes de ventas o vista de indicadores clave (KPIs).<br>3. Aplica los filtros deseados (rango de fechas o categoría de producto).<br>4. El sistema calcula las métricas (valor del inventario, productos bajo mínimo y ventas del día) y genera la vista consolidada. |
| **Flujos alternativos** | **Sin datos en el período:** Si no existen registros para las fechas seleccionadas, el sistema muestra el reporte en cero con el mensaje de aviso correspondiente. |

---

## 6. Reglas de negocio (RN)

| Código | Nombre de la regla | Descripción |
| :--- | :--- | :--- |
| **RN-01** | Control de stock no negativo | El sistema no permitirá bajo ninguna circunstancia que las existencias de un producto sean menores a cero. |
| **RN-02** | Venta sujeta a existencias | No se puede confirmar una venta si la cantidad solicitada supera el stock disponible en el catálogo. |
| **RN-03** | Justificación obligatoria de ajustes | Todo movimiento manual de corrección de stock exige seleccionar un motivo registrado (merma, rotura o conteo físico). |
| **RN-04** | Umbral de alerta de reabastecimiento | Se debe generar una notificación visual cuando el stock de un producto sea menor o igual a su stock mínimo configurado. |

---

## 7. Matriz de trazabilidad de requisitos

La siguiente matriz establece el mapeo bidireccional entre las historias de usuario (HU), requisitos funcionales (RF), requisitos no funcionales (RNF), casos de uso (CU), módulos del sistema y reglas de negocio (RN), garantizando la cobertura del 100% del alcance del proyecto.

| Historia de usuario (HU) | Requisito (RF / RNF) | Caso de uso (CU) | Módulo del sistema | Regla / Criterio asociado | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-01** | **RF-01:** Autenticación de usuarios | CU-01, CU-02, CU-03, CU-04 | Seguridad y Acceso | RNF-01 (Seguridad) | Aprobado |
| **HU-02** | **RF-02:** Control de acceso por roles | CU-01, CU-02, CU-03, CU-04 | Seguridad y Acceso | RNF-01 (Seguridad) | Aprobado |
| **HU-03** | **RF-03:** Gestión de catálogo de productos | CU-03 | Catálogo de Productos | RN-01 (Stock no negativo) | Aprobado |
| **HU-04** | **RF-04:** Búsqueda de productos | CU-01 | Ventas | RNF-02 (Tiempo respuesta < 2s) | Aprobado |
| **HU-05** | **RF-05:** Registro de entrada de stock | CU-02 | Inventario y Almacén | RN-01 (Stock no negativo) | Aprobado |
| **HU-06** | **RF-06:** Verificación de nivel de stock | CU-01, CU-02 | Inventario y Almacén | RN-02 (Venta sujeta a existencias) | Aprobado |
| **HU-07** | **RF-07:** Alerta de stock bajo | CU-01, CU-02 | Inventario y Almacén | RN-04 (Umbral reabastecimiento) | Aprobado |
| **HU-08** | **RF-08:** Ajuste manual de stock | CU-02 | Inventario y Almacén | RN-03 (Justificación obligatoria) | Aprobado |
| **HU-09** | **RF-09:** Registro de ventas | CU-01 | Ventas | RN-01, RN-02 | Aprobado |
| **HU-10** | **RF-10:** Historial de transacciones | CU-01 | Ventas | Trazabilidad de ventas | Aprobado |
| **HU-11** | **RF-11:** Reportes de movimientos | CU-04 | Reportes e Indicadores | Filtro por rango de fechas | Aprobado |
| **HU-12** | **RF-12:** Reportes consolidados de ventas | CU-04 | Reportes e Indicadores | RNF-02 (Rendimiento) | Aprobado |
| **HU-13** | **RF-13:** Dashboard de indicadores (KPIs) | CU-04 | Reportes e Indicadores | RNF-02 (Rendimiento) | Aprobado |
| **-** | **RNF-01:** Seguridad y RBAC | CU-01, CU-02, CU-03, CU-04 | Seguridad y Acceso | Encriptación y RBAC | Aprobado |
| **-** | **RNF-02:** Rendimiento y tiempo de respuesta | CU-01, CU-04 | Transversal | Respuesta menor a 2s | Aprobado |
| **-** | **RNF-03:** Disponibilidad del sistema | Todo el sistema | Infraestructura | 99% de operatividad comercial | Aprobado |
| **-** | **RNF-04:** Usabilidad de interfaz | Todo el sistema | Interfaz de Usuario | Inducción menor a 10 minutos | Aprobado |
| **-** | **RNF-05:** Mantenibilidad del código | Repositorio GitHub | Desarrollo | Estructura modular en Markdown | Aprobado |

* **Enlace del documento:** [Matriz de Trazabilidad](https://docs.google.com/spreadsheets/d/1nzJVvHTSWDJ5YmYEKr4JfNYJ8SAVyJA-hbtgI6dhc6g/edit?usp=drive_web)

---

## 8. Procedimiento formal de control de cambios (Change Request)

En cumplimiento del rigor metodológico del modelo en Cascada, una vez congelada la fase de requisitos no se admiten modificaciones arbitrarias sobre la línea base. Cualquier solicitud posterior de modificación, adición o eliminación debe procesarse formalmente mediante el estándar **CS-2026-001**.

### Formulario oficial de Solicitud de Cambio (CR)

#### 1. Información general de la solicitud
| Campo | Detalle |
| :--- | :--- |
| **Código de Solicitud (ID)** | CS-2026-001 |
| **Fecha de Solicitud** | 14/10/2026 |
| **Solicitante** | [Nombre del Solicitante / Rol] |
| **Prioridad** | [ ] Alta &nbsp;&nbsp;&nbsp; [ ] Media &nbsp;&nbsp;&nbsp; [ ] Baja |

#### 2. Descripción del cambio solicitado
* **Elemento / Requisito afectado:** [Especificar RF, RNF, CU o Módulo afectado, ej. RF-09 / CU-01]
* **Descripción detallada del cambio:** [Describir de manera clara y precisa la modificación, adición o eliminación requerida en la línea base de requisitos.]
* **Justificación del negocio:** [Explicar la razón comercial, operativa o legal que motiva la solicitud de cambio.]

#### 3. Evaluación de impacto técnico y de proyecto
| Área de impacto | Descripción del impacto | Estimación (Horas / Días) |
| :--- | :--- | :--- |
| **Impacto en Arquitectura / Diseño** | [Descripción del impacto en diagramas o BD] | [Estimación] |
| **Impacto en Cronograma** | [Efecto sobre las fases subsiguientes] | [Días de retraso] |
| **Impacto en Pruebas / Calidad** | [Nuevos casos de prueba requeridos] | [Estimación] |

#### 4. Resolución y aprobación del Comité de Control de Cambios
| Campo | Detalle |
| :--- | :--- |
| **Decisión Final** | [ ] Aprobado &nbsp;&nbsp;&nbsp; [ ] Rechazado &nbsp;&nbsp;&nbsp; [ ] Postergado |
| **Observaciones / Condiciones** | [Detalles de la resolución o motivos de rechazo] |
| **Nueva Versión de Baseline** | v1.1 |

#### 5. Firmas de conformidad
| Rol | Firma |
| :--- | :--- |
| **Firma del Solicitante** | ___________________________________ |
| **Firma del Responsable del Proyecto** | ___________________________________ |

* **Enlace del documento:** [Formulario de Solicitud de Cambio](https://docs.google.com/document/d/1NJa3GvB8k19-Ly1rUSScsLX6SzsTyncGtBQaiqc30BE/edit?usp=drive_web)

---

## 9. Acta de aprobación e hito GATE 1 (Congelamiento de requisitos)

### Documento de Acta de Aprobación e Hito GATE 1

* **Proyecto:** Sistema de Gestión de Inventarios
* **Metodología:** Modelo en Cascada
* **Línea Base (Baseline):** Versión 1.0 (Congelada)

#### 1. Resumen del hito
El presente documento formaliza la finalización satisfactoria de la fase de especificación y análisis de requisitos dentro del ciclo de vida en cascada para el sistema de gestión de inventarios. A partir de esta fecha, la línea base funcional y no funcional queda oficialmente congelada.

#### 2. Entregables verificados y aprobados
Se ha verificado la conformidad técnica y formal de los siguientes artefactos documentales:
* **Especificación de Requisitos del Sistema (SRS):** 13 Requisitos Funcionales (RF-01 a RF-13) formalmente documentados con sus dependencias.
* **Requisitos No Funcionales (RNF):** 5 Requisitos No Funcionales (RNF-01 a RNF-05) parametrizados bajo el estándar ISO/IEC 25010.
* **Reglas de Negocio (RN):** 4 Reglas institucionales (RN-01 a RN-04) integradas a los flujos del sistema.
* **Modelado UML:** Diagrama General de Casos de Uso en Draw.io y especificación de 4 Casos de Uso formales (CU-01 a CU-04).
* **Matriz de Trazabilidad:** Matriz completa en Hoja de Cálculo vinculando HU, RF, CU, Módulo, RN/RNF.
* **Procedimiento de Control de Cambios:** Protocolo formal mediante formulario Change Request (CR) para gestionar modificaciones posteriores.

#### 3. Declaración formal de congelamiento
El equipo del proyecto declara que la especificación de requisitos cumple con los criterios de completitud, consistencia, factibilidad y verificabilidad. No se admitirán modificaciones directas a la arquitectura ni a las funcionalidades sin la previa aprobación de una solicitud de cambio (CR) formal.

Con la firma de este documento, se autoriza formalmente el inicio de la fase de diseño técnico y arquitectura del proyecto.

#### 4. Conformidad y firmas de liderazgo del proyecto

| Integrante 1 | Integrante 2 |
| :---: | :---: |
| ___________________________________ | ___________________________________ |
| **Analista de Requisitos / Documentador** | **Diseñador Técnico / Desarrollador Lead** |

* **Enlace del documento:** [Acta de Aprobación GATE 1](https://docs.google.com/document/d/1KDK81MnmsXvf2tVniI5wfZxBjQlEAjVQl_uVbdaK3Yc/edit?usp=drive_web)
