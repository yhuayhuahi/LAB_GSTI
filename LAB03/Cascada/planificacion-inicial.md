# Planificación Inicial — Equipo Cascada
## Sistema de Gestión de Inventarios para Tienda Minorista

> **Duración del laboratorio:** 12 días (~2 semanas).
> **Alcance del equipo:** ejecutar **completamente** las fases de **Requisitos** y **Diseño**, y **planificar** (sin ejecutar) las fases de Implementación, Pruebas y Mantenimiento.
> **Base de trabajo:** documento "Sistema de Gestión de Inventarios para Tienda Minorista — Requisitos Base" (13 historias de usuario, 5 épicas).

---

## 1. Roles del equipo (2 integrantes)

Con solo 2 integrantes, cada rol lidera una fase y apoya la otra, manteniendo las responsabilidades clásicas del modelo en cascada:

### Rol 1 — Jefe de Proyecto / Analista de Requisitos

| Responsabilidad | Detalle |
|---|---|
| Planificación y cronograma | Elabora y mantiene el cronograma de fases con sus hitos |
| Análisis de requisitos | Convierte las 13 historias de usuario base en requisitos funcionales (RF) y no funcionales (RNF) del SRS |
| Casos de uso | Elabora los diagramas y especificaciones de casos de uso por actor |
| Control de cambios | Administra el registro formal de cambios: cualquier cambio tras una aprobación requiere evaluación de impacto y aprobación |
| Gates | Presenta las revisiones formales de fin de fase para su aprobación |

### Rol 2 — Arquitecto / Diseñador de Sistemas

| Responsabilidad | Detalle |
|---|---|
| Arquitectura del sistema | Define la arquitectura (módulos, componentes, tecnología) |
| Modelo de datos | Elabora el diagrama Entidad–Relación y el diccionario de datos |
| Diseño de interfaces | Elabora los wireframes de las pantallas principales |
| Especificación técnica | Documenta el diseño de cada módulo (catálogo, stock, ventas, reportes) |
| Plan de pruebas | **Define** (no ejecuta) el plan de pruebas de las fases planificadas |

> Ambos roles participan en ambas fases; el líder de cada fase es quien responde por sus entregables.

---

## 2. Planificación completa del proyecto (modelo en cascada)

Como exige la metodología, se planifica **todo el proyecto desde el inicio**, fase por fase y sin solapamiento. Una fase solo inicia cuando la anterior fue **formalmente aprobada** (gate):

| Fase | Estado en el laboratorio | Duración planificada |
|---|---|---|
| 1. Requisitos | ✅ Se ejecuta | Días 1–4 |
| 2. Diseño | ✅ Se ejecuta | Días 5–12 |
| 3. Implementación | 📋 Solo planificada | 15 días (estimado) |
| 4. Pruebas | 📋 Solo planificada | 6 días (estimado) |
| 5. Despliegue y Mantenimiento | 📋 Solo planificada | 2 días + mantenimiento continuo |

> La no ejecución de implementación y pruebas es una **restricción del laboratorio**, no de la metodología: la planificación de esas fases se entrega igual de completa.

---

## 3. Cronograma detallado 

### Fase 1 — Requisitos (días 1–4)

| Día | Actividad | Entregable parcial |
|---|---|---|
| 1 | Kick-off, lectura del documento base, estructura del SRS | Índice del SRS |
| 2 | Conversión de historias de usuario (HU-01 a HU-13) en RF y RNF | Requisitos funcionales y no funcionales numerados |
| 3 | Casos de uso por actor (Administrador, Almacenero, Vendedor, Dueño) | Diagramas y especificación de casos de uso |
| 4 | Matriz de trazabilidad (HU ↔ RF ↔ CU), revisión interna | — |
| 4 (final) | **GATE 1:** aprobación formal del SRS | SRS completo firmado |

### Fase 2 — Diseño (días 5–12)

| Días | Actividad | Entregable parcial |
|---|---|---|
| 5–6 | Diseño de arquitectura (módulos, componentes, tecnología) | Documento de arquitectura |
| 7–8 | Modelo de datos (diagrama ER + diccionario de datos) | Diagrama ER completo |
| 9–10 | Diseño de interfaces: wireframes de login, catálogo, stock, ventas, reportes | Set de wireframes |
| 11 | Especificación técnica de módulos + definición del plan de pruebas | Especificación técnica y plan de pruebas |
| 12 | Revisión interna e integración de la documentación | — |
| 12 (final) | **GATE 2:** aprobación formal del diseño y del plan completo del proyecto | Documento de diseño firmado + plan de fases 3–5 |

---

## 4. Entregables finales del Equipo Cascada

1. **SRS** — Especificación de Requisitos de Software (RF, RNF, casos de uso, matriz de trazabilidad).
2. **Documento de Diseño** — Arquitectura, modelo de datos, wireframes, especificación de módulos.
3. **Plan completo del proyecto** — Cronograma de las 5 fases con estimaciones (fases 3–5 solo planificadas).
4. **Registro de control de cambios** — Documento vivo donde se registra cualquier cambio y su aprobación.

---

## 5. Reglas de trabajo (fiel a la metodología)

- **Sin solapamiento:** ninguna fase inicia antes de la aprobación formal de la anterior.
- **Documentación como entregable central:** en cascada el documento ES el producto de la fase; el código no existe todavía.
- **Control de cambios formal:** si aparece un cambio de requisitos después del GATE 1, se registra, se evalúa impacto en tiempo/diseño y lo aprueba el Jefe de Proyecto (con visto bueno del Coordinador del laboratorio si altera el alcance).
- **Sin iteraciones:** no está previsto revisitar una fase cerrada; los problemas detectados tarde se manejan por control de cambios.