# Banco inicial de preguntas

El banco está incluido en `data/questions.json` y contiene **550 preguntas**, con 12 opciones cada una. Geografía, historia, deportes y ciencia tienen 100 tarjetas; entretenimiento tiene 150, de las que 50 son de música. En total son 6.600 retos individuales.

## Funcionamiento

- `lib/question-repository.ts` carga el JSON en el entorno de servidor de Next.js.
- `POST /api/questions/random` recibe una categoría y los identificadores ya utilizados.
- La ruta filtra esas preguntas, elige una de forma aleatoria y devuelve una sola tarjeta.
- Los identificadores usados se conservan con la partida en `localStorage`.
- El banco completo no forma parte del JavaScript interactivo enviado al navegador.

El contenido es estático. Para publicar una corrección o nuevas preguntas hay que modificar el banco, guardar el cambio en GitHub y dejar que Vercel genere el nuevo despliegue.

## Campos de una pregunta

| Campo | Uso |
|---|---|
| `id` | Identificador UUID estable utilizado para evitar repeticiones. |
| `family` | Familia editorial determinista utilizada para validar la composición del banco. |
| `title` | Enunciado o reto principal. |
| `type` | Uno de los seis formatos admitidos. |
| `category_slug` | `geografia`, `historia`, `deportes`, `entretenimiento` o `ciencia`. |
| `options` | Lista de 12 tapones, cada uno con texto y respuesta. |
| `difficulty` | Dificultad editorial del 1 al 5. |
| `active` | Permite excluir una pregunta sin borrarla. |
| `source_note` | Nota editorial interna. |
| `reviewed_at` | Fecha de la última revisión del contenido. |

Los seis valores admitidos en `type` son `boolean`, `number`, `order`, `period`, `color` y `free_text`.

## Enfoque editorial

- Cultura general adulta.
- Perspectiva principalmente internacional.
- Preferencia por hechos estables frente a datos que cambian cada temporada.
- Mezcla estructural de respuestas positivas y negativas en las tarjetas binarias.
- Los órdenes utilizan doce rangos distintos, sin empates arbitrarios.
- No se admiten años exactos como respuesta; las preguntas cronológicas usan siglos, décadas u orden relativo.
- Las tarjetas de siglo o década no superan el 17 % de ninguna categoría.
- Entretenimiento incluye exactamente 50 tarjetas de música.
- Todas las tarjetas y opciones tienen identificadores o posiciones deterministas.

## Distribución por tipo

| Tipo | Preguntas |
|---|---:|
| Respuesta libre | 256 |
| Sí o no | 130 |
| Número | 38 |
| Orden | 52 |
| Siglo o década | 50 |
| Color | 24 |
| **Total** | **550** |

## Archivos editoriales

- `data/questions.json`: banco utilizado por la aplicación.
- `scripts/content/*.mjs`: hechos fuente y reglas de generación.
- `scripts/generate-content.mjs`: reconstruye el JSON.
- `scripts/validate-content.mjs`: valida su estructura.

Después de modificar las fuentes ejecuta:

```bash
npm run content:generate
npm run content:validate
```

La validación comprueba:

- 550 preguntas exactas: 100 por categoría salvo entretenimiento, con 150.
- 50 preguntas musicales dentro de entretenimiento.
- 12 opciones por pregunta.
- UUID y posiciones únicos.
- Textos de opción únicos dentro de cada tarjeta.
- Respuestas completas.
- Ausencia de respuestas basadas en años exactos.
- Máximo del 17 % de preguntas de siglo o década por categoría.
- Mezcla de `true` y `false` en tarjetas binarias.
- Rangos del 1 al 12 en tarjetas de orden.
- Color hexadecimal en tarjetas de color.

Aunque el banco inicial prioriza hechos estables, cualquier juego de cultura general se beneficia de una revisión editorial humana antes de su publicación comercial.
