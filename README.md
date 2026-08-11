# Smart 12

Juego de cultura general para **2 a 4 asientos**. Cada asiento puede representar a una persona, pareja o equipo. La experiencia está diseñada para móviles, tabletas y ordenadores en orientación horizontal.

El proyecto es autónomo: las preguntas viajan dentro de la aplicación y la partida se conserva en el navegador. No necesita cuentas, claves, variables de entorno ni servicios de datos externos.

## Incluido

- Interfaz original de concurso televisivo adaptable a móviles, tabletas, ordenadores y distintos formatos landscape.
- Solicitud de pantalla completa desde los controles y manifiesto instalable en modo fullscreen.
- Selección animada del primer asiento.
- Cinco categorías y segundo giro opcional de categoría.
- Rueda de pregunta con 12 opciones.
- Seis tipos de pregunta: sí/no, número, orden, siglo/década, color y respuesta libre.
- Puntuación total y puntuación provisional de ronda.
- Pase temporal, plantarse, fallo y eliminación de ronda.
- Recuperación de la última partida mediante `localStorage`.
- Puntuación objetivo configurable antes de jugar.
- 550 preguntas: 100 de geografía, historia, deportes y ciencia; 150 de entretenimiento, incluidas 50 de música. En total hay 6.600 opciones.
- Selección aleatoria sin repetir los identificadores ya utilizados.
- 23 pruebas automatizadas del motor, persistencia, API, contenido y comportamiento responsive.

## Estructura importante

```text
app/                         Aplicación Next.js y rutas internas de API
components/game-app.tsx      Interfaz y flujo completo
lib/game/                    Máquina de estados y persistencia
lib/question-repository.ts   Selección aleatoria desde el banco incluido
data/questions.json          Banco completo de 550 preguntas
scripts/content/             Fuentes editoriales que generan el banco
tests/                       Pruebas automatizadas
docs/                        Reglas y guías del proyecto
```

El archivo completo de preguntas se utiliza únicamente en el servidor de Next.js. El navegador recibe solo la tarjeta seleccionada mediante `POST /api/questions/random`.

## Publicación con GitHub y Vercel

1. Descomprime el paquete.
2. Crea un repositorio en GitHub y sube **el contenido descomprimido**, con `package.json` en la raíz. No subas el ZIP como un único archivo.
3. En Vercel, crea un proyecto importando ese repositorio.
4. Mantén el framework detectado como **Next.js** y la carpeta raíz como `.`.
5. Pulsa **Deploy**. No añadas variables de entorno ni comandos personalizados.

Cada cambio posterior enviado a la rama principal de GitHub provocará un nuevo despliegue automático.

Consulta [Despliegue desde GitHub a Vercel](docs/DEPLOY_GITHUB_VERCEL.md) para ver la guía completa y las comprobaciones posteriores.

## Desarrollo y comprobaciones

Requiere Node.js 22 o posterior.

```bash
npm install
npm run dev
npm test
npm run content:validate
npm run lint
npm run build
```

Para volver a crear el banco JSON después de modificar las fuentes editoriales:

```bash
npm run content:generate
npm run content:validate
```

## Recuperación de partida

La partida se guarda tras cada transición y también cuando la página pierde visibilidad. Se conservan jugadores, colores, puntuaciones, fase, turno, categoría, pregunta actual, opciones reveladas e identificadores utilizados.

La recuperación funciona en el mismo navegador y dispositivo. Borrar los datos del navegador, usar modo privado o cambiar de dispositivo elimina esa continuidad.

## Identidad visual

El proyecto utiliza una interfaz original de concurso televisivo. Antes de publicar o comercializar el juego conviene revisar el nombre definitivo y cualquier posible conflicto de marca.
