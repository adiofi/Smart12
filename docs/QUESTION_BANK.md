# Banco inicial de preguntas

El banco está incluido en `data/questions.json` y contiene **400 preguntas**, 100 por categoría, con 12 opciones cada una. En total son 4.800 retos individuales.

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
| `title` | Enunciado o reto principal. |
| `type` | Uno de los seis formatos admitidos. |
| `category_slug` | `geografia`, `historia`, `deportes` o `entretenimiento`. |
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
- Todas las tarjetas y opciones tienen identificadores o posiciones deterministas.

## Distribución por tipo

| Tipo | Preguntas |
|---|---:|
| Respuesta libre | 150 |
| Sí o no | 96 |
| Número | 64 |
| Orden | 36 |
| Siglo o década | 36 |
| Color | 18 |
| **Total** | **400** |

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

- 400 preguntas exactas y 100 por categoría.
- 12 opciones por pregunta.
- UUID y posiciones únicos.
- Respuestas completas.
- Mezcla de `true` y `false` en tarjetas binarias.
- Rangos del 1 al 12 en tarjetas de orden.
- Color hexadecimal en tarjetas de color.

Aunque el banco inicial prioriza hechos estables, cualquier juego de cultura general se beneficia de una revisión editorial humana antes de su publicación comercial.
