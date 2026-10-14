Especificación de Requisitos de Software (SRS) — Sistema de Gestión de Inventarios

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista 

**Metodología:** Cascada (Waterfall) — Fase 1: Requisitos 

**Autor / Analista de Requisitos:** Angelo Jair Vega Figueroa

**Revisor / Arquitecto de Sistemas:** Daniel Wilston Chura Monroy

**Estado:** En Progreso (Día 1)

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
