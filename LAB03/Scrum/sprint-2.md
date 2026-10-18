# Sprint 2 — «Vender y reportar»

**Proyecto:** Sistema de Gestión de Inventarios para Tienda Minorista  
**Días reales:** 15/10/2026 – 18/10/2026 (4 días)  
**Jornada prevista de simulación práctica:** 15/10/2026 – 18/10/2026  
**Duración en el escenario:** 4 días reales (5 días simulados en el escenario de 12 días)  
**Scrum Master / Developer:** Jael Emerson  
**Product Owner / Developer:** Christian Henry  
**Estado:** planificación conforme al Product Backlog validado; incremento probado, demostrable y aceptado en la Review.

## 1. Meta del sprint (Sprint Goal)

Ampliar el incremento de catálogo e inventario mediante el **registro de ventas con descuento automático de existencias**, su historial y la consulta de movimientos, incorporando alertas de stock bajo y ajustes justificados.

## 2. Alcance y dependencias

Se prevén cinco historias del Product Backlog validado: HU-09, HU-10, HU-07, HU-08 y HU-11 (**18 puntos de historia**). Las ventas y reportes dependen de productos y stock operativos; por ello, al comenzar este sprint se inspecciona el resultado real del Sprint 1. Las historias incompletas pueden obligar a renegociar el alcance sin ocultar el trabajo pendiente.

HU-01, HU-02, HU-12 y HU-13 permanecen en el Product Backlog y **no se consideran terminadas** por la presencia de elementos visuales en el prototipo.

## 3. Sprint Backlog

| HU | Puntos | Tarea y resultado verificable | Responsable | Estado de ejecución |
|---|---:|---|---|---|
| HU-09 | 5 | Venta de uno o varios productos; validación de existencias y descuento de stock | Scrum Master | Terminada |
| HU-10 | 3 | Historial de ventas con fecha, hora, productos, cantidades y total | Product Owner | Terminada |
| HU-07 | 2 | Alerta visible cuando un producto está en stock mínimo o inferior | Product Owner | Terminada |
| HU-08 | 3 | Ajustes positivos/negativos con motivo obligatorio y sin stock negativo | Scrum Master | Terminada |
| HU-11 | 5 | Reporte de entradas, salidas por venta y ajustes filtrable por fechas | Ambos | Terminada |
| Integración | — | Correcciones, demostración y pruebas del incremento final | Ambos | Terminada |

**Total previsto:** **18 puntos de historia**. Es esfuerzo estimado, no velocidad ya alcanzada.

## 4. Plan de ejecución

| Fecha real | Actividad | Evidencia de trabajo |
|---|---|---|
| 15/10/2026 | Planning: inspeccionar Sprint 1, confirmar meta, historias y tareas | E03 |
| 16/10/2026 | Registrar ventas e impedir operaciones sin stock | HU-09 / pruebas |
| 17/10/2026 | Historial, alertas y ajustes con motivo | HU-10, HU-07, HU-08 / pruebas |
| 18/10/2026 | Reporte por período, integración, Sprint Review y retrospectiva | HU-11 / E04 y E05 |

Se trata de una **secuencia de actividades ejecutada en fechas reales**. Las capturas y las fechas efectivas se registran por separado y no se retrofechan.

## 5. Pruebas de aceptación previstas

Para registrar evidencia reproducible, usar `prototipo/index.html`. Si se requieren cantidades iniciales concretas, reiniciar primero con **Cargar datos de ejemplo**, ya que `localStorage` conserva operaciones anteriores.

| HU | Comprobación | Referencia |
|---|---|---|
| HU-07 | Mostrar aviso al llegar al mínimo y por debajo de él | P3 |
| HU-08 | Ajustar existencias con motivo; rechazar falta de motivo y stock negativo | P06–P08 |
| HU-09 | Vender 3 unidades de P002 y pasar de 9 a 6; impedir vender 100 si no hay stock | P09–P10 |
| HU-10 | Consultar transacción de P09 con fecha, productos, cantidades y total | P4 |
| HU-11 | Filtrar movimientos por fecha y comprobar resultados con y sin registros | P12–P13 |

Una historia solo pasa a **Finalizada** cuando reúne los criterios completos de `product-backlog.md` y la Definition of Done.

## 6. Eventos Scrum y resultados

### Sprint Planning

El Scrum Master facilita la revisión de los resultados del Sprint 1. Product Owner confirma prioridades y ambos Developers establecen el alcance factible del segundo incremento.

- **Fecha y hora efectiva:** `15/10/2026, 09:00–11:00`.
- **Historias seleccionadas finalmente:** `HU-07, HU-08, HU-09, HU-10, HU-11`.
- **Dependencias o impedimentos heredados:** `HU-05 y HU-06 del Sprint 1 quedaron pendientes de prueba; se validan en este sprint como parte del incremento acumulado`.
- **Evidencia E03:** `evidencias/03-planning-sprint2.png`.

### Daily Scrum / sincronización simulada

Los Developers revisan avances de ventas, historial, stock, alertas y reportes; identifican defectos de integración y adaptan tareas pendientes.

- **Fecha y hora real:** `16/10/2026, 18:30`.
- **Avances y dificultades:** `HU-09 y HU-10 integradas y probadas; dificultad: validación de stock negativo en ajustes`.
- **Acciones acordadas:** `Revisar HU-08 y HU-11 antes del cierre del sprint`.

### Sprint Review

Demostración propuesta: cargar datos de ejemplo, procesar una venta de 3 unidades de P002, comprobar descuento 9 → 6, consultar historial y filtrar los movimientos. Presentar también un ajuste con motivo y una alerta de stock bajo.

- **Fecha y hora efectiva:** `18/10/2026, 10:00–11:00`.
- **HU finalizadas y aceptadas:** `HU-07, HU-08, HU-09, HU-10, HU-11`.
- **HU parciales o pendientes:** `NINGUNA`.
- **Observaciones de Product Owner / interesado invitado, si lo hubo:** `HU-07 y HU-10 ya contaban con prueba aprobada desde el registro del Sprint 1; se validan formalmente en este sprint`.
- **Evidencia E04:** `evidencias/04-review-sprint2.png`.

### Retrospectiva y cierre

- **Prácticas que ayudaron al trabajo:** `La división por HU permitió avanzar en paralelo sobre ventas y reportes`.
- **Principal dificultad y cómo se abordó:** `Validar el rechazo de ajustes sin motivo y de ventas sin stock; se resolvió con pruebas manuales específicas`.
- **Mejora que se aplicaría en el siguiente sprint:** `Reservar el último día para pruebas de aceptación y evidencias`.
- **Evidencia E05:** `evidencias/05-retrospectiva-final.png`.

## 7. Resultado para el cierre

| Indicador | Resultado al cierre |
|---|---|
| Historias previstas para Sprint 2 | 5 (HU-07, HU-08, HU-09, HU-10 y HU-11) |
| Puntos previstos para Sprint 2 | 18 |
| Historias finalizadas en Sprint 2 | **5/5** |
| Puntos terminados en Sprint 2 | **18/18** |
| Historias finalizadas acumuladas de ambos sprints | **7/9** (HU-03, HU-04, HU-07, HU-08, HU-09, HU-10, HU-11) |
| Puntos terminados acumulados | **25/31** |
| Resultado de pruebas manuales | **Aprobadas** (HU-03, HU-04, HU-07, HU-08, HU-09, HU-10, HU-11) |

**Conclusión metodológica:** las historias pendientes continúan en el Product Backlog para un posible sprint posterior. La simulación busca demostrar planificación, inspección, adaptación e incrementos verificables, no afirmar que las 13 historias fueron implementadas.