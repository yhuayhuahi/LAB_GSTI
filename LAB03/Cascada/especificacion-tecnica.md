# ESPECIFICACIÓN TÉCNICA DE MÓDULOS Y PLAN DE PRUEBAS

---

| Campo              | Detalle                                         |
|--------------------|--------------------------------------------------|
| **Proyecto**       | Sistema de Gestión de Inventario y Ventas        |
| **Documento**      | Especificación Técnica de Módulos y Plan de Pruebas |
| **Versión**        | 1.0                                             |
| **Autor**          | Daniel Wilston Chura Monroy                      |
| **Rol**            | Arquitecto / Diseñador de Sistemas               |
| **Fecha**          | 14/10/2026                                       |
| **Stack**          | Python Flask + PostgreSQL                        |
| **Metodología**    | Cascada (Waterfall)                             |
| **Fase**           | Fase 2 — Diseño                                 |

---

## ÍNDICE

- [PARTE A — ESPECIFICACIÓN TÉCNICA DE MÓDULOS](#parte-a--especificación-técnica-de-módulos)
  - [A.1 Arquitectura General](#a1-arquitectura-general)
  - [A.2 Módulo: auth](#a2-módulo-auth)
  - [A.3 Módulo: catalogo](#a3-módulo-catalogo)
  - [A.4 Módulo: inventario](#a4-módulo-inventario)
  - [A.5 Módulo: ventas](#a5-módulo-ventas)
  - [A.6 Módulo: reportes](#a6-módulo-reportes)
- [PARTE B — PLAN DE PRUEBAS](#parte-b--plan-de-pruebas)
  - [B.1 Estrategia General de Pruebas](#b1-estrategia-general-de-pruebas)
  - [B.2 Casos de Prueba Funcionales (RF-01 a RF-13)](#b2-casos-de-prueba-funcionales-rf-01-a-rf-13)
  - [B.3 Casos de Prueba — Reglas de Negocio (RN)](#b3-casos-de-prueba--reglas-de-negocio-rn)
  - [B.4 Pruebas No Funcionales (RNF)](#b4-pruebas-no-funcionales-rnf)
  - [B.5 Cronograma de Pruebas](#b5-cronograma-de-pruebas)
  - [B.6 Criterios de Aceptación y Métricas de Calidad](#b6-criterios-de-aceptación-y-métricas-de-calidad)

---

# PARTE A — ESPECIFICACIÓN TÉCNICA DE MÓDULOS

## A.1 Arquitectura General

El sistema adopta el patrón **Application Factory** de Flask con registro de **Blueprints** independientes. Cada Blueprint encapsula sus propias rutas, lógica de negocio y plantillas Jinja2, comunicándose con la base de datos PostgreSQL a través de modelos **SQLAlchemy** (ORM).

```
app/
├── __init__.py          ← Application Factory (create_app)
├── extensions.py        ← db, login_manager, migrate
├── config.py            ← Configuración por entornos
├── models/
│   ├── usuario.py
│   ├── producto.py
│   ├── movimiento.py
│   └── venta.py
└── blueprints/
    ├── auth/
    ├── catalogo/
    ├── inventario/
    ├── ventas/
    └── reportes/
```

### Convenciones de RBAC

| Rol              | Descripción                                                       |
|------------------|-------------------------------------------------------------------|
| `administrador`  | Acceso total; gestión de usuarios y catálogo                      |
| `almacenero`     | Entradas y ajustes de inventario; consulta de catálogo            |
| `vendedor`       | Registro de ventas y consulta de disponibilidad                   |
| `dueño`          | Solo lectura: reportes y dashboard de KPIs                        |

La protección de rutas se implementa mediante decoradores personalizados:

```python
@login_required          # Flask-Login — usuario autenticado
@role_required('administrador')  # Decorador propio — verifica current_user.rol
```

---

## A.2 Módulo: `auth`

### Descripción General

Gestiona la autenticación de usuarios, control de sesiones y autorización basada en roles (RBAC). Utiliza **Flask-Login** para el manejo del ciclo de vida de la sesión y **Flask-Bcrypt** para el hash seguro de contraseñas.

**RF implementados:** RF-01, RF-02

### Blueprint Flask

```python
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
```

### Endpoints / Rutas Principales

| Método | Ruta              | Descripción                                    | Roles con acceso    |
|--------|-------------------|------------------------------------------------|---------------------|
| GET    | `/auth/login`     | Renderiza el formulario de inicio de sesión    | Público             |
| POST   | `/auth/login`     | Procesa credenciales y establece sesión        | Público             |
| GET    | `/auth/logout`    | Cierra la sesión activa y redirige al login    | Autenticado         |
| GET    | `/auth/usuarios`  | Listado de usuarios del sistema                | administrador       |
| GET    | `/auth/usuarios/nuevo` | Formulario de alta de usuario           | administrador       |
| POST   | `/auth/usuarios/nuevo` | Crea un nuevo usuario con rol asignado  | administrador       |
| POST   | `/auth/usuarios/<id>/desactivar` | Desactiva un usuario       | administrador       |

### Lógica de Negocio Principal

| Función                          | Descripción                                                                                      |
|----------------------------------|--------------------------------------------------------------------------------------------------|
| `login_user_service(form)`       | Busca usuario por `username`, verifica hash con `check_password_hash`, registra `ultimo_acceso`. |
| `create_user_service(data)`      | Valida datos de entrada, aplica `generate_password_hash`, persiste nuevo `Usuario`.              |
| `role_required(rol)`             | Decorador que verifica `current_user.rol == rol`; retorna HTTP 403 si no coincide.               |
| `load_user(user_id)`             | Callback de Flask-Login; carga `Usuario` desde DB por PK para reconstruir sesión.                |

### Modelos SQLAlchemy Involucrados

```python
class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuarios'
    id_usuario    = db.Column(db.Integer, primary_key=True)
    username      = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    rol           = db.Column(db.Enum('administrador','almacenero','vendedor','dueño'), nullable=False)
    activo        = db.Column(db.Boolean, default=True, nullable=False)
    created_at    = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
```

### Validaciones de Datos Requeridas

| Campo        | Regla de validación                                                        |
|--------------|----------------------------------------------------------------------------|
| `username`   | Requerido, único, 4–50 caracteres, solo alfanumérico + guión bajo          |
| `password`   | Requerido en creación, mínimo 8 caracteres, al menos 1 número y 1 mayúscula|
| `rol`        | Requerido, debe pertenecer al enum definido                                |
| `nombre`     | Requerido, 2–120 caracteres                                                |
| Sesión       | Tiempo de sesión máximo: 8 horas (`PERMANENT_SESSION_LIFETIME`)            |

---

## A.3 Módulo: `catalogo`

### Descripción General

Provee el CRUD completo de productos, incluyendo búsqueda por código de barras o nombre. Es la fuente de verdad de la definición de los productos del sistema.

**RF implementados:** RF-03, RF-04

### Blueprint Flask

```python
catalogo_bp = Blueprint('catalogo', __name__, url_prefix='/catalogo')
```

### Endpoints / Rutas Principales

| Método | Ruta                          | Descripción                                       | Roles con acceso          |
|--------|-------------------------------|---------------------------------------------------|---------------------------|
| GET    | `/catalogo/`                  | Listado paginado de productos con búsqueda        | administrador, almacenero, vendedor |
| GET    | `/catalogo/nuevo`             | Formulario de alta de producto                    | administrador              |
| POST   | `/catalogo/nuevo`             | Crea un nuevo producto en la base de datos        | administrador              |
| GET    | `/catalogo/<id>/editar`       | Formulario de edición de producto                 | administrador              |
| POST   | `/catalogo/<id>/editar`       | Actualiza datos del producto                      | administrador              |
| POST   | `/catalogo/<id>/eliminar`     | Elimina (baja lógica) un producto                 | administrador              |
| GET    | `/catalogo/buscar`            | Búsqueda AJAX por código o nombre (JSON)          | administrador, almacenero, vendedor|

### Lógica de Negocio Principal

| Función                                  | Descripción                                                                                     |
|------------------------------------------|-------------------------------------------------------------------------------------------------|
| `get_all_productos(page, search)`        | Consulta paginada con filtro `ILIKE` sobre `nombre` y `codigo`. Retorna objeto `Pagination`.    |
| `create_producto_service(data)`          | Valida unicidad de `codigo`, aplica conversiones de tipo, persiste `Producto`.                  |
| `update_producto_service(id, data)`      | Verifica existencia, valida campos editables, actualiza registro.                               |
| `delete_producto_service(id)`            | Baja lógica: activa `activo = False` si el producto tiene movimientos asociados.               |
| `buscar_producto_ajax(query)`            | Busca por `codigo` exacto o `nombre` parcial; retorna lista JSON para autocompletar en ventas.  |

### Modelos SQLAlchemy Involucrados

```python
class Categoria(db.Model):
    __tablename__   = 'categorias'
    id_categoria    = db.Column(db.Integer, primary_key=True)
    nombre          = db.Column(db.String(100), unique=True, nullable=False)
    descripcion     = db.Column(db.Text)

class Producto(db.Model):
    __tablename__   = 'productos'
    id_producto     = db.Column(db.Integer, primary_key=True)
    codigo          = db.Column(db.String(50), unique=True, nullable=False)
    nombre          = db.Column(db.String(200), nullable=False)
    id_categoria    = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)
    precio_unitario = db.Column(db.Numeric(10, 2), nullable=False)
    stock_actual    = db.Column(db.Integer, default=0, nullable=False)
    stock_minimo    = db.Column(db.Integer, default=0, nullable=False)   # Umbral RN-04
    activo          = db.Column(db.Boolean, default=True, nullable=False)
    created_at      = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
```

### Validaciones de Datos Requeridas

| Campo           | Regla de validación                                             |
|-----------------|-----------------------------------------------------------------|
| `codigo`          | Requerido, único en BD, máx. 50 caracteres                       |
| `nombre`          | Requerido, mínimo 3 caracteres, máx. 200                         |
| `id_categoria`    | Requerido, debe existir en la tabla `categorias`                 |
| `precio_unitario` | Requerido, decimal ≥ 0                                            |
| `stock_minimo`    | Entero ≥ 0; usado para umbral de alerta (RN-04)                  |

---

## A.4 Módulo: `inventario`

### Descripción General

Gestiona los movimientos de stock: entradas de mercancía, ajustes manuales (con motivo obligatorio por RN-03) y visualización en tiempo real del nivel de existencias. Genera alertas cuando el stock desciende al umbral definido (RN-04).

**RF implementados:** RF-05, RF-06, RF-07, RF-08

### Blueprint Flask

```python
inventario_bp = Blueprint('inventario', __name__, url_prefix='/inventario')
```

### Endpoints / Rutas Principales

| Método | Ruta                              | Descripción                                              | Roles con acceso    |
|--------|-----------------------------------|----------------------------------------------------------|---------------------|
| GET    | `/inventario/`                    | Dashboard de inventario con stock actual                 | administrador, almacenero, dueño |
| GET    | `/inventario/entrada/nueva`       | Formulario para registrar entrada de mercancía           | administrador, almacenero   |
| POST   | `/inventario/entrada/nueva`       | Persiste entrada y actualiza `stock_actual`              | administrador, almacenero   |
| GET    | `/inventario/ajuste/nuevo`        | Formulario para ajuste manual (requiere motivo)          | administrador, almacenero   |
| POST   | `/inventario/ajuste/nuevo`        | Persiste ajuste y actualiza stock; bloquea si sin motivo | administrador, almacenero   |
| GET    | `/inventario/movimientos`         | Historial paginado de movimientos con filtros            | administrador, almacenero, dueño |
| GET    | `/inventario/alertas`             | Listado de productos bajo el umbral `stock_minimo`       | administrador, almacenero, dueño |
| GET    | `/inventario/stock/tiempo-real`   | Endpoint AJAX — retorna stock actual en JSON             | administrador, almacenero, dueño |

### Lógica de Negocio Principal

| Función                                     | Descripción                                                                                                     |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `registrar_entrada(id_producto, cantidad)`  | Crea `Movimiento` tipo `entrada`, incrementa `Producto.stock_actual`, verifica RN-01.                           |
| `registrar_ajuste(id_producto, cantidad, motivo)` | Valida que `motivo` no sea vacío (RN-03). Aplica delta al stock; bloquea si resultado < 0 (RN-01).       |
| `get_alertas_stock()`                       | Retorna `Producto.query.filter(Producto.stock_actual <= Producto.stock_minimo)` para RN-04.                     |
| `get_stock_tiempo_real(id_producto)`        | Consulta directa a `Producto.stock_actual`; retorna JSON `{stock, alerta}`.                                     |
| `get_historial_movimientos(filtros)`        | Consulta paginada sobre `Movimiento` con filtros de fecha, tipo y producto.                                     |

### Modelos SQLAlchemy Involucrados

```python
class Movimiento(db.Model):
    __tablename__  = 'movimientos_stock'
    id_movimiento  = db.Column(db.Integer, primary_key=True)
    id_producto    = db.Column(db.Integer, db.ForeignKey('productos.id_producto'), nullable=False)
    id_usuario     = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    id_venta       = db.Column(db.Integer, db.ForeignKey('ventas.id_venta'))   # Solo para tipo salida_venta
    tipo           = db.Column(db.Enum('entrada', 'ajuste_positivo', 'ajuste_negativo', 'salida_venta'), nullable=False)
    cantidad       = db.Column(db.Integer, nullable=False)          # Siempre positivo; el tipo define el signo
    motivo         = db.Column(db.String(255))                      # Obligatorio para ajustes (RN-03)
    fecha_hora     = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    # Relaciones
    producto       = db.relationship('Producto', backref='movimientos')
    usuario        = db.relationship('Usuario', backref='movimientos')
```

### Validaciones de Datos Requeridas

| Campo        | Regla de validación                                                     |
|--------------|-------------------------------------------------------------------------|
| `id_producto`| Requerido, debe existir y estar activo en catálogo                      |
| `cantidad`   | Requerido, entero > 0; el signo del efecto lo determina el `tipo`       |
| `motivo`     | **Obligatorio** si `tipo` es ajuste (RN-03); mínimo 10 caracteres       |
| Stock final  | `stock_actual ± cantidad` no debe resultar negativo (RN-01)             |
| `tipo`       | Requerido, debe pertenecer al enum `{entrada, ajuste_positivo, ajuste_negativo, salida_venta}` |

---

## A.5 Módulo: `ventas`

### Descripción General

Permite registrar ventas con múltiples líneas de productos, descuenta automáticamente el stock tras confirmar la venta y proporciona el historial de ventas con filtros. Aplica RN-01 y RN-02 para asegurar consistencia de inventario.

**RF implementados:** RF-09, RF-10

### Blueprint Flask

```python
ventas_bp = Blueprint('ventas', __name__, url_prefix='/ventas')
```

### Endpoints / Rutas Principales

| Método | Ruta                         | Descripción                                                  | Roles con acceso         |
|--------|------------------------------|--------------------------------------------------------------|--------------------------|
| GET    | `/ventas/`                   | Historial de ventas con filtros por fecha / vendedor         | administrador, vendedor, dueño |
| GET    | `/ventas/nueva`              | Interfaz de registro de nueva venta multi-producto          | administrador, vendedor   |
| POST   | `/ventas/nueva`              | Persiste venta, valida stock y descuenta existencias         | administrador, vendedor   |
| GET    | `/ventas/<id>`               | Detalle de una venta específica                              | administrador, vendedor, dueño |

### Lógica de Negocio Principal

| Función                                     | Descripción                                                                                                          |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `registrar_venta_service(lineas, usuario)`  | Valida stock por cada línea (RN-02), abre transacción DB, crea `Venta` + `DetalleVenta`, genera `Movimiento` tipo `salida_venta` con `id_venta`. |
| `validar_stock_venta(lineas)`               | Pre-validación: para cada `{id_producto, cantidad}` verifica `stock_actual >= cantidad`; acumula errores.           |
| `calcular_total_venta(lineas)`              | Suma `cantidad × precio_unitario` por línea; retorna el total de la venta.                                          |
| `get_historial_ventas(filtros)`             | Consulta paginada sobre `Venta` con joins a `DetalleVenta` y `Usuario`, aplica filtros de fecha y vendedor.         |

### Modelos SQLAlchemy Involucrados

```python
class Venta(db.Model):
    __tablename__ = 'ventas'
    id_venta      = db.Column(db.Integer, primary_key=True)
    fecha_hora    = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    id_usuario    = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    total         = db.Column(db.Numeric(12, 2), nullable=False)
    detalles      = db.relationship('DetalleVenta', backref='venta', cascade='all, delete-orphan')

class DetalleVenta(db.Model):
    __tablename__    = 'detalle_venta'
    id_detalle       = db.Column(db.Integer, primary_key=True)
    id_venta         = db.Column(db.Integer, db.ForeignKey('ventas.id_venta'), nullable=False)
    id_producto      = db.Column(db.Integer, db.ForeignKey('productos.id_producto'), nullable=False)
    cantidad         = db.Column(db.Integer, nullable=False)
    precio_unitario  = db.Column(db.Numeric(10, 2), nullable=False)  # Snapshot precio al momento de venta
    subtotal         = db.Column(db.Numeric(12, 2), nullable=False)
```

### Validaciones de Datos Requeridas

| Campo            | Regla de validación                                                                         |
|------------------|---------------------------------------------------------------------------------------------|
| `detalles`       | La venta debe tener al menos 1 línea de detalle                                             |
| `cantidad`       | Entero positivo > 0 por línea                                                               |
| `stock`          | `Producto.stock_actual >= cantidad` solicitada en cada línea (RN-02); si falla, bloquear    |
| `precio_unitario`| Tomado de `Producto.precio_unitario` al momento de la venta (snapshot inmutable)            |
| Transacción DB   | Toda la venta se confirma en una única transacción atómica; si una línea falla, rollback    |

---

## A.6 Módulo: `reportes`

### Descripción General

Provee reportes operacionales y un dashboard de KPIs para la toma de decisiones. Los datos son de solo lectura; el módulo no genera modificaciones en la base de datos.

**RF implementados:** RF-11, RF-12, RF-13

### Blueprint Flask

```python
reportes_bp = Blueprint('reportes', __name__, url_prefix='/reportes')
```

### Endpoints / Rutas Principales

| Método | Ruta                                | Descripción                                              | Roles con acceso          |
|--------|-------------------------------------|----------------------------------------------------------|---------------------------|
| GET    | `/reportes/dashboard`               | Dashboard principal con KPIs del sistema                 | administrador, dueño      |
| GET    | `/reportes/movimientos`             | Reporte de movimientos de inventario por rango de fecha  | administrador, almacenero, dueño |
| GET    | `/reportes/ventas`                  | Reporte de ventas por período y/o producto               | administrador, vendedor, dueño |
| GET    | `/reportes/inventario-valorizado`   | Valorización del inventario actual                       | administrador, dueño      |
| GET    | `/reportes/productos-bajo-minimo`   | Listado de productos que han cruzado el umbral           | administrador, almacenero, dueño |
| GET    | `/reportes/exportar/ventas`         | Exporta reporte de ventas a CSV                          | administrador, dueño      |
| GET    | `/reportes/exportar/movimientos`    | Exporta reporte de movimientos a CSV                     | administrador, dueño      |

### Lógica de Negocio Principal

| Función                                          | Descripción                                                                                                    |
|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `get_dashboard_kpis()`                           | Agrega: valor total inventario, nº productos bajo mínimo, ventas del día (monto y cantidad), top 5 productos. |
| `get_reporte_movimientos(fecha_inicio, fecha_fin)` | Filtra `Movimiento` por rango de fechas con join a `Producto` y `Usuario`; agrupa por tipo.                  |
| `get_reporte_ventas(fecha_inicio, fecha_fin, id_producto)` | Filtra las ventas por rango de fecha; calcula totales por período y por producto.                       |
| `get_inventario_valorizado()`                    | Calcula `SUM(stock_actual * precio_unitario)` agrupado por categoría.                                        |
| `exportar_csv(data, nombre_archivo)`             | Genera respuesta Flask con `mimetype='text/csv'` y cabeceras de descarga.                                      |

### Modelos SQLAlchemy Involucrados

Los reportes realizan consultas de solo lectura sobre los modelos: `Producto`, `Movimiento`, `Venta`, `DetalleVenta` y `Usuario`. Se usan queries con `db.session.query()` y agregaciones SQL via `func.sum()`, `func.count()`.

### KPIs del Dashboard

| KPI                        | Cálculo                                                             |
|----------------------------|---------------------------------------------------------------------|
| **Valor de inventario**    | `SUM(stock_actual × precio_unitario)` sobre productos activos       |
| **Productos bajo mínimo**  | `COUNT(*)` donde `stock_actual <= stock_minimo`                     |
| **Ventas del día**         | `SUM(total)` de `Venta` con `fecha_hora >= hoy 00:00`               |
| **Nº transacciones día**   | `COUNT(*)` de ventas del día                                        |
| **Top 5 productos vendidos**| `SUM(dv.cantidad)` agrupado por `id_producto`, orden DESC, LIMIT 5 |

### Validaciones de Datos Requeridas

| Campo          | Regla de validación                                                   |
|----------------|-----------------------------------------------------------------------|
| `fecha_inicio` | Requerido para reportes por período; formato `YYYY-MM-DD`             |
| `fecha_fin`    | Requerido; debe ser ≥ `fecha_inicio`                                  |
| `id_producto`  | Opcional; si se especifica, debe existir en catálogo                  |
| Exportación    | Solo roles `administrador` y `dueño` pueden exportar datos           |

---

# PARTE B — PLAN DE PRUEBAS

## B.1 Estrategia General de Pruebas

El plan de pruebas sigue un enfoque **en pirámide** aplicado a las fases de la metodología Cascada, ejecutando primero las pruebas de menor granularidad y ascendiendo hacia las de mayor integración.

### Tipos de Prueba

| Tipo                  | Alcance                                                    | Herramienta / Método              | Responsable     |
|-----------------------|------------------------------------------------------------|-----------------------------------|-----------------|
| **Unitarias**         | Funciones de servicio, validaciones, modelos               | `pytest` + `unittest.mock`        | Desarrollador   |
| **Integración**       | Endpoints Flask + BD de prueba                             | `pytest` + `Flask test client`    | Desarrollador   |
| **Sistema**           | Flujos end-to-end completos sobre entorno staging          | `Selenium` / prueba manual        | QA / Arquitecto |
| **Aceptación (UAT)**  | Validación de RF con usuarios finales en entorno staging   | Guía de pruebas + casos escritos  | Usuario / Arquitecto |

### Entorno de Pruebas

| Entorno   | Base de datos           | Configuración Flask | Datos          |
|-----------|------------------------|---------------------|----------------|
| Test      | PostgreSQL (BD separada) | `TESTING=True`     | Fixtures pytest |
| Staging   | PostgreSQL (clon de prod) | Configuración real | Datos semilla  |

---

## B.2 Casos de Prueba Funcionales (RF-01 a RF-13)

### TP-01 — RF-01: Inicio de sesión con credenciales válidas

| Campo            | Detalle                                                                 |
|------------------|-------------------------------------------------------------------------|
| **ID**           | TP-01                                                                   |
| **RF asociado**  | RF-01 — El sistema debe permitir el inicio de sesión con usuario y contraseña |
| **Descripción**  | Verificar que un usuario registrado puede autenticarse correctamente    |
| **Precondición** | Usuario `admin` con password `Admin123` existe y está activo en BD      |
| **Pasos**        | 1. Navegar a `/auth/login` <br>2. Ingresar `username=admin`, `password=Admin123` <br>3. Hacer clic en "Iniciar sesión" |
| **Resultado esperado** | Redirección a `/` (dashboard); sesión Flask activa; `current_user.is_authenticated == True` |
| **Prioridad**    | Alta                                                                    |

---

### TP-02 — RF-02: Control de acceso por roles (RBAC)

| Campo            | Detalle                                                                  |
|------------------|--------------------------------------------------------------------------|
| **ID**           | TP-02                                                                    |
| **RF asociado**  | RF-02 — El sistema debe restringir el acceso a módulos y funciones según el rol del usuario |
| **Descripción**  | Verificar que un usuario con rol `vendedor` no accede a una ruta exclusiva del administrador |
| **Precondición** | Usuario `vendedor1` con rol `vendedor` existe y está activo en BD        |
| **Pasos**        | 1. Iniciar sesión como `vendedor1` <br>2. Solicitar `GET /catalogo/nuevo` <br>3. Observar la respuesta |
| **Resultado esperado** | Respuesta HTTP 403 (Acceso denegado); no se muestra el formulario de alta de producto |
| **Prioridad**    | Alta                                                                     |

---

### TP-03 — RF-03: Creación de producto nuevo

| Campo            | Detalle                                                                 |
|------------------|-------------------------------------------------------------------------|
| **ID**           | TP-03                                                                   |
| **RF asociado**  | RF-03 — El sistema debe permitir al Administrador registrar productos   |
| **Descripción**  | Verificar que un administrador puede dar de alta un producto completo   |
| **Precondición** | Usuario con rol `administrador` autenticado; código `PROD-001` no existe |
| **Pasos**        | 1. Navegar a `/catalogo/nuevo` <br>2. Completar: código=`PROD-001`, nombre=`Cuaderno A4`, categoría=`Útiles`, precio_unitario=`4.00`, stock_minimo=`10` <br>3. Clic en "Guardar" |
| **Resultado esperado** | Registro creado en tabla `productos`; redirección a listado; mensaje de éxito visible |
| **Prioridad**    | Alta                                                                    |

---

### TP-04 — RF-04: Búsqueda de productos por nombre

| Campo            | Detalle                                                                 |
|------------------|-------------------------------------------------------------------------|
| **ID**           | TP-04                                                                   |
| **RF asociado**  | RF-04 — El sistema debe permitir buscar productos por código o nombre   |
| **Descripción**  | Verificar que la búsqueda retorna resultados relevantes                 |
| **Precondición** | Existen productos con "Cuaderno" en el nombre; usuario `vendedor1` autenticado |
| **Pasos**        | 1. Navegar a `/catalogo/?search=cuaderno` <br>2. Observar resultados   |
| **Resultado esperado** | Listado muestra solo productos cuyo nombre o código contiene "cuaderno" (insensible a mayúsculas) |
| **Prioridad**    | Media                                                                   |

---

### TP-05 — RF-05: Registro de entrada de mercancía

| Campo            | Detalle                                                                       |
|------------------|-------------------------------------------------------------------------------|
| **ID**           | TP-05                                                                         |
| **RF asociado**  | RF-05 — El sistema debe permitir registrar entradas de stock                  |
| **Descripción**  | Verificar que el stock se incrementa correctamente tras registrar una entrada |
| **Precondición** | Producto ID=1 con `stock_actual=20`; usuario `almacenero` autenticado         |
| **Pasos**        | 1. Navegar a `/inventario/entrada/nueva` <br>2. Seleccionar producto ID=1, cantidad=`50` <br>3. Clic en "Registrar entrada" |
| **Resultado esperado** | `Producto.stock_actual == 70`; `Movimiento` tipo `entrada` creado en `movimientos_stock` |
| **Prioridad**    | Alta                                                                          |

---

### TP-06 — RF-06: Niveles de stock en tiempo real

| Campo            | Detalle                                                                       |
|------------------|-------------------------------------------------------------------------------|
| **ID**           | TP-06                                                                         |
| **RF asociado**  | RF-06 — El sistema debe mostrar las existencias en tiempo real con su estado  |
| **Descripción**  | Verificar que la vista de inventario refleja el stock actual y su indicador de estado |
| **Precondición** | Producto ID=1 con `stock_actual=70`; usuario `almacenero` autenticado         |
| **Pasos**        | 1. Navegar a `/inventario/` <br>2. Consultar la fila del producto ID=1 <br>3. Registrar una entrada y recargar la vista |
| **Resultado esperado** | La vista muestra `stock_actual` actualizado y el estado (`disponible` / `bajo mínimo` / `agotado`) coherente con `stock_minimo` |
| **Prioridad**    | Alta                                                                          |

---

### TP-07 — RF-07: Alerta de stock bajo

| Campo            | Detalle                                                                         |
|------------------|---------------------------------------------------------------------------------|
| **ID**           | TP-07                                                                           |
| **RF asociado**  | RF-07 — El sistema debe emitir alertas cuando el stock sea menor o igual al mínimo |
| **Descripción**  | Verificar que los productos bajo el umbral aparecen en la vista de alertas      |
| **Precondición** | Producto "Lapicero Azul" con `stock_actual=3` y `stock_minimo=10`; usuario `almacenero` autenticado |
| **Pasos**        | 1. Navegar a `/inventario/alertas` <br>2. Observar la lista de productos en alerta |
| **Resultado esperado** | "Lapicero Azul" aparece en la lista de alertas con indicador visual de stock crítico |
| **Prioridad**    | Alta                                                                            |

---

### TP-08 — RF-08: Ajuste manual de inventario con motivo

| Campo            | Detalle                                                                       |
|------------------|-------------------------------------------------------------------------------|
| **ID**           | TP-08                                                                         |
| **RF asociado**  | RF-08 — El sistema debe permitir ajustes manuales de stock registrando el motivo |
| **Descripción**  | Verificar que un ajuste con motivo se registra y actualiza el stock           |
| **Precondición** | Producto ID=1 con `stock_actual=70`; usuario `almacenero` autenticado         |
| **Pasos**        | 1. Navegar a `/inventario/ajuste/nuevo` <br>2. Seleccionar producto ID=1, tipo=`ajuste_negativo`, cantidad=`5`, motivo=`"Merma por daño en almacén"` <br>3. Clic en "Aplicar ajuste" |
| **Resultado esperado** | `Producto.stock_actual == 65`; `Movimiento` tipo `ajuste_negativo` creado; campo `motivo` con el texto ingresado |
| **Prioridad**    | Alta                                                                          |

---

### TP-09 — RF-09: Registro de venta con descuento directo de stock

| Campo            | Detalle                                                                          |
|------------------|----------------------------------------------------------------------------------|
| **ID**           | TP-09                                                                            |
| **RF asociado**  | RF-09 — El sistema debe registrar ventas descontando de inmediato las unidades del stock |
| **Descripción**  | Verificar que una venta multi-producto se registra y descuenta el stock           |
| **Precondición** | Productos A (stock=50), B (stock=30), C (stock=20); usuario `vendedor1` autenticado |
| **Pasos**        | 1. Navegar a `/ventas/nueva` <br>2. Agregar: Producto A × 2, Producto B × 1, Producto C × 3 <br>3. Confirmar venta |
| **Resultado esperado** | `Venta` creada con 3 registros en `detalle_venta`; stocks actualizados: A=48, B=29, C=17; total correcto; movimientos `salida_venta` generados |
| **Prioridad**    | Alta                                                                             |

---

### TP-10 — RF-10: Historial de transacciones de venta

| Campo            | Detalle                                                                   |
|------------------|---------------------------------------------------------------------------|
| **ID**           | TP-10                                                                     |
| **RF asociado**  | RF-10 — El sistema debe almacenar cada venta con fecha, hora, productos, cantidades, total y vendedor |
| **Descripción**  | Verificar que la venta registrada aparece en el historial con su detalle   |
| **Precondición** | Existe al menos una venta registrada; usuario `vendedor1` autenticado      |
| **Pasos**        | 1. Navegar a `/ventas/` <br>2. Aplicar filtro `fecha=14/10/2026` <br>3. Abrir el detalle de una venta |
| **Resultado esperado** | El historial muestra fecha/hora, productos, cantidades, total y vendedor de solo las ventas del período indicado |
| **Prioridad**    | Alta                                                                      |

---

### TP-11 — RF-11: Reporte de movimientos de inventario por fecha

| Campo            | Detalle                                                                       |
|------------------|-------------------------------------------------------------------------------|
| **ID**           | TP-11                                                                         |
| **RF asociado**  | RF-11 — El sistema debe generar reportes de entradas, salidas y ajustes por rango de fechas |
| **Descripción**  | Verificar que el filtro de fechas limita correctamente los movimientos        |
| **Precondición** | Existen movimientos del 01/10/2026 al 14/10/2026; usuario `dueño` autenticado |
| **Pasos**        | 1. Navegar a `/reportes/movimientos` <br>2. Filtrar `fecha_inicio=10/10/2026`, `fecha_fin=14/10/2026` <br>3. Aplicar filtro |
| **Resultado esperado** | Solo se muestran movimientos dentro del rango indicado; el sistema excluye registros anteriores |
| **Prioridad**    | Media                                                                         |

---

### TP-12 — RF-12: Reporte de ventas por período

| Campo            | Detalle                                                                   |
|------------------|---------------------------------------------------------------------------|
| **ID**           | TP-12                                                                     |
| **RF asociado**  | RF-12 — El sistema debe generar reportes consolidados de ventas diarias, semanales y por producto |
| **Descripción**  | Verificar que el reporte consolida los totales por período y por producto |
| **Precondición** | Existen ventas registradas en múltiples fechas; usuario `dueño` autenticado |
| **Pasos**        | 1. Navegar a `/reportes/ventas` <br>2. Filtrar `fecha_inicio=14/10/2026`, `fecha_fin=14/10/2026` <br>3. Observar totales |
| **Resultado esperado** | El reporte muestra solo las ventas del período, con consolidado por día y por producto |
| **Prioridad**    | Media                                                                     |

---

### TP-13 — RF-13: Dashboard de KPIs y reportes

| Campo            | Detalle                                                                        |
|------------------|--------------------------------------------------------------------------------|
| **ID**           | TP-13                                                                          |
| **RF asociado**  | RF-13 — El sistema debe ofrecer reportes y un dashboard de KPIs                |
| **Descripción**  | Verificar que el dashboard muestra valores correctos y actualizados            |
| **Precondición** | BD con datos de inventario y ventas del día; usuario `dueño` autenticado       |
| **Pasos**        | 1. Navegar a `/reportes/dashboard` <br>2. Observar los KPIs desplegados        |
| **Resultado esperado** | Se muestran: valor de inventario (calculado), nº productos bajo mínimo, total ventas del día; valores coinciden con consultas directas a BD |
| **Prioridad**    | Media                                                                          |

---

## B.3 Casos de Prueba — Reglas de Negocio (RN)

### TRN-01 — RN-01: Stock no puede ser negativo

| Campo            | Detalle                                                                                      |
|------------------|----------------------------------------------------------------------------------------------|
| **ID**           | TRN-01                                                                                       |
| **RN asociada**  | RN-01 — El stock de un producto no puede ser negativo en ningún momento                      |
| **Descripción**  | Verificar que el sistema bloquea cualquier operación que resulte en stock < 0               |
| **Precondición** | Producto ID=5 con `stock_actual=3`                                                           |
| **Pasos**        | 1. Intentar registrar un ajuste tipo=`ajuste_negativo` con cantidad=`10` sobre Producto ID=5 <br>2. Confirmar operación |
| **Resultado esperado** | La operación es **rechazada**; mensaje de error: "La cantidad a descontar supera el stock disponible (3 unidades)"; `stock_actual` permanece en 3 |
| **Prioridad**    | Alta                                                                                         |

---

### TRN-02 — RN-02: Venta bloqueada por stock insuficiente

| Campo            | Detalle                                                                           |
|------------------|-----------------------------------------------------------------------------------|
| **ID**           | TRN-02                                                                            |
| **RN asociada**  | RN-02 — Una venta no puede procesarse si el stock es insuficiente para alguna línea |
| **Descripción**  | Verificar que la venta se rechaza completamente si un producto no tiene stock suficiente |
| **Precondición** | Producto A `stock=5`, Producto B `stock=20`                                       |
| **Pasos**        | 1. Crear venta: Producto A × 10, Producto B × 3 <br>2. Intentar confirmar        |
| **Resultado esperado** | Venta **no confirmada** (rollback completo); mensaje indicando "Producto A: stock insuficiente (disponible: 5, solicitado: 10)"; ambos stocks sin cambio |
| **Prioridad**    | Alta                                                                              |

---

### TRN-03 — RN-03: Ajuste de inventario bloqueado sin motivo

| Campo            | Detalle                                                                   |
|------------------|---------------------------------------------------------------------------|
| **ID**           | TRN-03                                                                    |
| **RN asociada**  | RN-03 — Todo ajuste manual de inventario debe incluir un motivo obligatorio |
| **Descripción**  | Verificar que el sistema rechaza ajustes sin campo motivo completado      |
| **Precondición** | Producto ID=1 existe; usuario `almacenero` autenticado                    |
| **Pasos**        | 1. Navegar a `/inventario/ajuste/nuevo` <br>2. Seleccionar producto, tipo=`ajuste_negativo`, cantidad=`5` <br>3. Dejar campo `motivo` **vacío** <br>4. Clic en "Aplicar ajuste" |
| **Resultado esperado** | Formulario **no se envía** (validación HTML5 + backend); error: "El motivo del ajuste es obligatorio"; ningún `Movimiento` creado |
| **Prioridad**    | Alta                                                                      |

---

### TRN-04 — RN-04: Generación de alerta al alcanzar el umbral de reabastecimiento

| Campo            | Detalle                                                                              |
|------------------|--------------------------------------------------------------------------------------|
| **ID**           | TRN-04                                                                               |
| **RN asociada**  | RN-04 — El sistema debe generar una alerta cuando el stock alcanza el umbral mínimo  |
| **Descripción**  | Verificar que al descontar stock hasta el umbral, el producto aparece en alertas     |
| **Precondición** | Producto "Folder Manila" con `stock_actual=12` y `stock_minimo=10`; usuario `almacenero` |
| **Pasos**        | 1. Registrar venta de "Folder Manila" × 3 unidades <br>2. Navegar a `/inventario/alertas` |
| **Resultado esperado** | `stock_actual` = 9; "Folder Manila" **aparece en la lista de alertas** con indicador visual; la vista dashboard refleja el cambio en el KPI "productos bajo mínimo" |
| **Prioridad**    | Alta                                                                                 |

---

## B.4 Pruebas No Funcionales (RNF)

### RNF-01: Seguridad

| ID      | Escenario de prueba                                           | Método de verificación                                                     | Criterio de aceptación                                    |
|---------|---------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------------------------|
| TNF-01a | Acceso a ruta protegida sin autenticar                        | Solicitar GET `/inventario/` sin sesión activa                             | Redirección a `/auth/login` con HTTP 302                  |
| TNF-01b | Acceso a ruta de administrador con rol `vendedor`             | Autenticarse como vendedor y solicitar GET `/auth/usuarios`                | Respuesta HTTP 403; no se muestra contenido restringido   |
| TNF-01c | Inyección SQL en formulario de login                         | Ingresar `' OR '1'='1` en campo `username`                                 | Login rechazado; no se produce consulta SQL inesperada    |
| TNF-01d | Contraseñas almacenadas en texto plano                        | Inspeccionar tabla `usuarios` directamente en BD                           | Campo `password_hash` contiene hash bcrypt, no texto plano |
| TNF-01e | Fijación de sesión (session fixation)                         | Verificar que el `session_id` cambia tras login exitoso                    | Nuevo token de sesión generado post-autenticación         |

---

### RNF-02: Rendimiento (tiempo de respuesta < 2 segundos)

| ID      | Escenario de prueba                                           | Método de verificación                               | Criterio de aceptación                            |
|---------|---------------------------------------------------------------|------------------------------------------------------|---------------------------------------------------|
| TNF-02a | Carga del dashboard de KPIs                                   | Medir tiempo desde solicitud GET hasta DOMContentLoaded | < 2 segundos con BD poblada de 10,000 registros |
| TNF-02b | Búsqueda de productos por nombre                              | Medir tiempo de respuesta del endpoint `/catalogo/buscar` | < 500 ms para retornar resultados JSON           |
| TNF-02c | Listado paginado de movimientos (1,000 registros)             | Medir tiempo de respuesta GET `/inventario/movimientos` | < 2 segundos con paginación de 25 registros      |
| TNF-02d | Registro de venta con 5 líneas de producto                    | Medir tiempo total POST `/ventas/nueva`               | < 2 segundos incluyendo transacción en BD        |

---

### RNF-03: Disponibilidad (99%)

| ID      | Escenario de prueba                                              | Método de verificación                                        | Criterio de aceptación                          |
|---------|------------------------------------------------------------------|---------------------------------------------------------------|-------------------------------------------------|
| TNF-03a | Uptime del sistema en período de 30 días                         | Monitoreo con herramienta de uptime (e.g., UptimeRobot)       | Disponibilidad ≥ 99% (máx. 7.2 h caída/mes)   |
| TNF-03b | Recuperación ante error de conexión a BD                         | Simular caída de PostgreSQL; reiniciar; medir tiempo de recuperación | Sistema recuperado en < 5 minutos sin pérdida de datos |
| TNF-03c | Comportamiento ante múltiples sesiones concurrentes              | Simular 20 usuarios simultáneos con Apache JMeter             | Sin errores HTTP 500; tiempo respuesta < 2s     |

---

### RNF-04: Usabilidad

| ID      | Escenario de prueba                                           | Método de verificación                                     | Criterio de aceptación                                    |
|---------|---------------------------------------------------------------|------------------------------------------------------------|-----------------------------------------------------------|
| TNF-04a | Navegación sin instrucciones previas                          | Prueba con usuario final sin capacitación (5 tareas clave) | Usuario completa ≥ 4/5 tareas sin asistencia              |
| TNF-04b | Mensajes de error comprensibles                               | Ingresar datos inválidos en formularios clave              | Mensajes de error en español, claros y ubicados junto al campo |
| TNF-04c | Compatibilidad con navegadores                                | Prueba en Chrome 120+, Firefox 119+, Edge 120+             | Interfaz funcional y sin distorsiones en los 3 navegadores |
| TNF-04d | Feedback visual en operaciones críticas                       | Registrar venta, entrada, ajuste                           | Mensaje de éxito/error visible en < 1 segundo tras confirmar |

---

## B.5 Cronograma de Pruebas

El plan de pruebas se ejecuta en la **Fase 4 (Pruebas)** del ciclo Cascada, posterior a la implementación por módulos realizada en la **Fase 3 (Implementación)**. Las referencias de días coinciden con el *Plan Completo del Proyecto* (Fase 3: días 13–27; Fase 4: días 28–33).

```
FASE 3 — IMPLEMENTACIÓN (Días 13–27)
├── Días 13–16: Módulo auth + catálogo
├── Días 15–19: Módulo inventario
├── Días 17–21: Módulo ventas
└── Días 18–27: Módulo reportes + dashboard + integración

FASE 4 — PRUEBAS (Días 28–33)
├── Días 28–29: Plan de pruebas, casos y pruebas unitarias
├── Días 29–31: Pruebas de integración y de sistema (flujos + reglas de negocio)
├── Días 30–33: Pruebas no funcionales (seguridad, rendimiento, disponibilidad)
└── Días 31–33: UAT (aceptación) + corrección de defectos + re-test
```

### Detalle del Cronograma — Fase 4

| Día | Actividad                                       | Responsable         | Entregable                              |
|-----|-------------------------------------------------|---------------------|-----------------------------------------|
| 28  | Plan de pruebas y diseño de casos               | QA                  | Plan y casos de prueba                  |
| 29  | Pruebas unitarias (pytest) por módulo           | Desarrollador       | Reporte pytest con cobertura ≥ 80%      |
| 30  | Pruebas de integración de endpoints             | Desarrollador       | Informe de endpoints verificados        |
| 30  | Pruebas de sistema — flujos RF-01 a RF-13       | QA / Arquitecto     | Matriz de trazabilidad RF vs. Resultado |
| 31  | Pruebas reglas de negocio RN-01 a RN-04         | QA / Arquitecto     | Informe de RN verificadas               |
| 31  | Pruebas de seguridad (TNF-01a a TNF-01e)        | Arquitecto          | Informe de vulnerabilidades encontradas |
| 32  | Pruebas de rendimiento (TNF-02a a TNF-02d)      | Arquitecto          | Reporte de tiempos de respuesta         |
| 32  | Pruebas de disponibilidad y usabilidad          | QA / Usuario piloto | Informe de usabilidad                   |
| 33  | UAT — validación con usuario final              | Usuario / Arquitecto| Acta de aceptación firmada              |
| 33  | Corrección de defectos críticos + re-test       | Desarrollador / QA  | Lista de defectos cerrados              |
| 33  | Cierre de fase pruebas                          | Arquitecto          | Informe final de pruebas                |

---

## B.6 Criterios de Aceptación y Métricas de Calidad

### Criterios de Aceptación por Categoría

| Categoría                 | Criterio de Aceptación                                                                   |
|---------------------------|------------------------------------------------------------------------------------------|
| **Funcional**             | El 100% de los RF (RF-01 a RF-13) aprueba su caso de prueba correspondiente             |
| **Reglas de negocio**     | Las 4 reglas de negocio (RN-01 a RN-04) son correctamente aplicadas sin excepción       |
| **Seguridad**             | Ninguna vulnerabilidad de nivel alto (OWASP Top 10 críticas) sin remediar               |
| **Rendimiento**           | El 95% de las transacciones responden en < 2 segundos bajo carga normal                 |
| **Disponibilidad**        | Disponibilidad medida ≥ 99% durante el período de prueba de aceptación                  |
| **Usabilidad**            | Usuarios finales completan ≥ 80% de tareas clave sin asistencia técnica                 |
| **Cobertura de código**   | Cobertura de pruebas unitarias ≥ 80% sobre la lógica de servicios                      |
| **Defectos**              | 0 defectos de severidad crítica abiertos al momento del cierre de pruebas              |

### Clasificación de Severidad de Defectos

| Severidad     | Definición                                                           | Tiempo máximo de resolución |
|---------------|----------------------------------------------------------------------|-----------------------------|
| **Crítico**   | Bloquea funcionalidad principal; pérdida de datos; falla de seguridad | 24 horas                   |
| **Alto**      | Impacta RF prioritario; workaround no viable                         | 48 horas                    |
| **Medio**     | Impacta RF secundario; workaround disponible                         | 5 días hábiles              |
| **Bajo**      | Problema cosmético o de usabilidad menor                             | Siguiente iteración         |

### Métricas de Calidad

| Métrica                         | Fórmula                                             | Meta        |
|---------------------------------|-----------------------------------------------------|-------------|
| Tasa de éxito de pruebas        | (Pruebas aprobadas / Total pruebas) × 100           | ≥ 95%       |
| Densidad de defectos            | Nº defectos / Nº RF implementados                   | < 2 por RF  |
| Cobertura de código             | Líneas cubiertas por pytest / Total líneas × 100    | ≥ 80%       |
| Tasa de defectos críticos       | Defectos críticos / Total defectos × 100            | < 5%        |
| Tiempo promedio de respuesta    | Media de tiempos de respuesta en pruebas de carga   | < 1.5 s     |
| Tasa de resolución de defectos  | Defectos cerrados / Defectos encontrados × 100      | ≥ 90% al cierre |

---

*Documento generado en la Fase 2 del proyecto — Metodología Cascada*
*Daniel Wilston Chura Monroy — Arquitecto / Diseñador de Sistemas — 14/10/2026*
