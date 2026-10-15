# Documento de Diseño — Sistema de Gestión de Inventarios
## Equipo Cascada — GATE 2

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista  
**Metodología:** Cascada — Fase 2: Diseño  
**Autor / Arquitecto de Sistemas:** Daniel Wilston Chura Monroy  
**Revisor / Jefe de Proyecto:** Angelo Jair Vega Figueroa  
**Fecha:** 14/10/2026  
**Versión:** 1.0  
**Estado:** ✅ Finalizado — pendiente firma GATE 2

---

## Índice de entregables de la Fase 2

Este documento es el índice maestro del Documento de Diseño. Los artefactos individuales se encuentran en los archivos enlazados:

| # | Artefacto | Archivo | Días | Responsable principal | Estado |
|---|---|---|---|---|---|
| 1 | Documento de Arquitectura del Sistema | [arquitectura.md](./arquitectura.md) | 5–6 | Daniel Wilston | ✅ |
| 2 | Modelo de Datos (ER + Diccionario + DDL) | [modelo-datos.md](./modelo-datos.md) | 7–8 | Daniel Wilston | ✅ |
| 3 | Diseño de Interfaces (Wireframes) | [wireframes.md](./wireframes.md) | 9–10 | Daniel Wilston | ✅ |
| 4 | Especificación Técnica de Módulos + Plan de Pruebas | [especificacion-tecnica.md](./especificacion-tecnica.md) | 11 | Daniel Wilston | ✅ |
| 5 | Plan Completo del Proyecto (Fases 1–5) | [plan-proyecto-completo.md](./plan-proyecto-completo.md) | Todo | Angelo Jair | ✅ |

---

## Decisiones de diseño clave

| Decisión | Elección | Justificación |
|---|---|---|
| Stack tecnológico | Python Flask + PostgreSQL | Conocido por el equipo; ideal para web con BD relacional |
| Patrón arquitectónico | MVC + Arquitectura en 3 capas | Separa responsabilidades, facilita mantenimiento (RNF-05) |
| Modularización | Flask Blueprints | Un Blueprint por módulo funcional (auth, catálogo, inventario, ventas, reportes) |
| ORM | SQLAlchemy 2.x | Abstracción de BD, migraciones con Flask-Migrate |
| Autenticación | Flask-Login + RBAC | Gestión de sesiones y control de acceso por roles (RNF-01) |
| Frontend | Jinja2 + Bootstrap 5 | Templates del servidor; sin SPA para mantener simplicidad |

---

## Acta de aprobación — GATE 2

| Campo | Detalle |
|---|---|
| **Fase** | 2 — Diseño |
| **Fecha de revisión** | Día 12 del laboratorio |
| **Entregables verificados** | Arquitectura ✅ / ER + DDL ✅ / Wireframes ✅ / Especificación técnica ✅ / Plan de pruebas ✅ |
| **Decisión** | [ ] Aprobado &nbsp;&nbsp;&nbsp; [ ] Rechazado &nbsp;&nbsp;&nbsp; [ ] Con observaciones |

### Firmas de conformidad

| Rol | Nombre | Firma |
|---|---|---|
| **Arquitecto / Diseñador de Sistemas** | Daniel Wilston Chura Monroy | ___________________________________ |
| **Jefe de Proyecto / Analista** | Angelo Jair Vega Figueroa | ___________________________________ |
| **Coordinador del laboratorio** | Huayhua Hillpa, Yourdyy Yossimar | ___________________________________ |
