# Laboratorio 04: Requisitos y Diseño de Software

> **Sistema:** Sistema de Gestión Comercial y Control de Existencias  
> **Organización Beneficiaria:** Editorial QSY (Arequipa)  
> **Repositorio Oficial:** [https://github.com/yhuayhuahi/LAB_GSTI](https://github.com/yhuayhuahi/LAB_GSTI)  
> **Tipo de Entrega:** Documentación Técnica de Ingeniería de Software  

---

## 📌 Guía de Navegación del Repositorio

Este directorio contiene la totalidad del paquete de ingeniería, diseño arquitectónico y especificación de requisitos formalizados para el sistema de Editorial QSY. 

El informe consolidado de entrega se encuentra disponible en:  
👉 **[Informe Oficial de Entrega (informe.md)](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/informe.md)** *(Contiene el desarrollo detallado de la Parte 2: Requisitos y Diseño de Software)*.

---

## 📂 Estructura y Enlaces de la Documentación

A continuación se detalla la organización de la documentación técnica disponible en este repositorio:

```text
LAB04/
├── README.md                      # Índice general y guía de la documentación (este archivo)
├── informe.md                     # Informe consolidado de entrega (Secciones 2.1 y 2.2)
├── entrevista/                    # Levantamiento de requerimientos y entrevistas con el cliente
│   ├── Entrevista.md              # Transcripción estructurada de la sesión inicial de levantamiento
│   └── Entrevista2.md             # Sesión de profundización técnica y validación de reglas
├── requisitos/                    # Especificación formal de requisitos y análisis de negocio
│   ├── 01-especificacion-requisitos.md  # Catálogo integral de RFs, RNFs, actores y casos de uso
│   ├── 02-procesos-as-is-to-be.md       # Diagramación de flujos de negocio actual vs. propuesto
│   ├── 03-gestion-interesados.md        # Matriz de stakeholders y matriz de poder/interés
│   ├── 04-planificacion-y-costos.md     # Estimación presupuestal y viabilidad económica
│   └── 05-flujo-de-trabajo-y-pmv.md     # Alcance del Producto Mínimo Viable
├── architecture/                  # Diseño arquitectónico y especificación de capas
│   ├── 01-arquitectura-del-sistema.md   # Arquitectura física, lógica y estrategia offline
│   ├── 02-arquitectura-de-codigo-backend.md  # Arquitectura en capas limpias API (Express)
│   ├── 03-arquitectura-de-codigo-frontend.md # Arquitectura móvil híbrida con Capacitor
│   └── README.md                        # Resumen ejecutivo de la arquitectura técnica
├── schemes/                       # Modelado de persistencia de datos
│   ├── 01-diccionario-y-relaciones.md   # Modelo relacional 3FN, entidades y cardinalidades
│   └── schema.sql                       # Script DDL oficial y portable (PostgreSQL / SQLite)
├── ADRs/                          # Registros de Decisiones de Arquitectura (Architecture Decision Records)
│   ├── ADR-01-stack-tecnologico.md      # Selección del stack (Node.js 26, React 19, Capacitor, PostgreSQL)
│   └── ADR-02-modelo-relacional-rbac.md # Justificación del aislamiento multi-sede y control RBAC
└── plantuml/                      # Scripts fuente (.puml) e imágenes renderizadas (.png)
    ├── clases.puml / clases.png         # Diagrama de Clases UML del dominio completo
    ├── secuencia_venta_offline.puml     # Diagrama de Secuencia UML (Venta táctil + Sync diferida)
    └── arquitectura_componentes.puml    # Diagrama de Componentes y Despliegue UML
```

### Enlaces Directos a los Documentos Principales:

* **Entrevistas y Diagnóstico:**
  - [Entrevista Inicial de Diagnóstico](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/entrevista/Entrevista.md)
  - [Entrevista de Validación y Alcance](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/entrevista/Entrevista2.md)
* **Requisitos e Ingeniería de Negocio:**
  - [Especificación de Requisitos (RFs, RNFs, Contexto y Caso de Uso)](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/requisitos/01-especificacion-requisitos.md)
  - [Procesos de Negocio AS-IS vs. TO-BE](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/requisitos/02-procesos-as-is-to-be.md)
  - [Gestión de Interesados y Matriz Poder/Interés](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/requisitos/03-gestion-interesados.md)
  - [Planificación y Viabilidad Económica](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/requisitos/04-planificacion-y-costos.md)
  - [Flujo de Trabajo y Alcance del PMV](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/requisitos/05-flujo-de-trabajo-y-pmv.md)
* **Arquitectura de Software y ADRs:**
  - [Especificación de Arquitectura en Dos Niveles](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/architecture/01-arquitectura-del-sistema.md)
  - [Arquitectura de Código Backend](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/architecture/02-arquitectura-de-codigo-backend.md)
  - [Arquitectura de Código Frontend](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/architecture/03-arquitectura-de-codigo-frontend.md)
  - [ADR-01: Selección de Stack Tecnológico](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/ADRs/ADR-01-stack-tecnologico.md)
  - [ADR-02: Modelo Relacional y Aislamiento RBAC](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/ADRs/ADR-02-modelo-relacional-rbac.md)
* **Modelo Relacional de Base de Datos:**
  - [Diccionario de Datos y Modelo 3FN](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/schemes/01-diccionario-y-relaciones.md)
  - [Script DDL SQL Ejecutable](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/schemes/schema.sql)
* **Diagramas UML Renderizados (PlantUML):**
  - [Diagrama de Clases UML (PNG)](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/plantuml/clases.png) — [Código .puml](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/plantuml/clases.puml)
  - [Diagrama de Secuencia Venta Offline (PNG)](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/plantuml/secuencia_venta_offline.png) — [Código .puml](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/plantuml/secuencia_venta_offline.puml)
  - [Diagrama de Arquitectura de Componentes (PNG)](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/plantuml/arquitectura_componentes.png) — [Código .puml](https://github.com/yhuayhuahi/LAB_GSTI/blob/main/LAB04/plantuml/arquitectura_componentes.puml)

---

## 📑 Resumen del Dominio del Problema

Editorial QSY comercializa libros en quechua en **consignación** en 3 sedes céntricas de Arequipa (Trilce, Siglo XX y Jerusalén). La operación presentaba tres limitaciones críticas:
1. **Falta de conectividad estable:** 2 de las sedes carecen de internet fijo por cable, dependiendo de planes móviles con señal débil.
2. **Descontrol en liquidaciones:** El cuadre diario manual de ventas y comisiones fijas monetarias demoraba más de 1 hora por sede.
3. **Pérdida de comprobantes:** El uso de talonarios de papel provocaba pérdidas y reclamos de estudiantes sin trazabilidad.

La solución arquitectónica implementada desacopla la captura móvil en mostrador mediante una **PWA/App con almacenamiento local en IndexedDB (Patrón Outbox)** y un **servidor central en VPS con Docker y PostgreSQL**, garantizando atención continua sin red y sincronización transaccional automática.
