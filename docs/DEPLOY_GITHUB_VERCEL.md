# Despliegue desde GitHub a Vercel

Smart 12 no necesita una base de datos ni variables de entorno. GitHub conserva el código y el historial de cambios; Vercel construye y publica la aplicación.

## 1. Preparar el repositorio

1. Descomprime `smart-12-vercel.zip`.
2. Crea un repositorio nuevo en GitHub, público o privado.
3. Sube todos los archivos y carpetas descomprimidos.
4. Comprueba que `package.json`, `app`, `components`, `data` y `lib` aparecen directamente en la raíz del repositorio.

No subas `node_modules`, `.next` ni el ZIP. Tampoco subas solo el ZIP esperando que GitHub lo descomprima.

## 2. Conectar Vercel

1. En el panel de Vercel, elige **Add New > Project**.
2. Conecta GitHub si todavía no está autorizado.
3. Busca el repositorio de Smart 12 y pulsa **Import**.
4. Comprueba estos valores:
   - Framework Preset: `Next.js`.
   - Root Directory: `.`.
   - Build Command: valor automático.
   - Output Directory: valor automático.
5. Deja vacía la sección de variables de entorno.
6. Pulsa **Deploy**.

Al finalizar, Vercel mostrará una dirección pública terminada en `.vercel.app`.

## 3. Comprobación rápida

Abre la dirección publicada y verifica:

1. La portada muestra **Nueva partida**.
2. Es posible configurar entre 2 y 4 asientos.
3. La ruleta carga una pregunta con 12 tapones.
4. Al cerrar y volver a abrir la página aparece la opción de recuperar la partida.

La recuperación debe comprobarse con el mismo navegador y dispositivo, fuera del modo privado.

## 4. Publicar cambios posteriores

Cuando se guarda un cambio en la rama principal del repositorio, Vercel inicia automáticamente otro despliegue. Esto también se aplica a las correcciones del archivo `data/questions.json`.

Antes de publicar cambios en el banco de preguntas conviene ejecutar, cuando se disponga de un ordenador con Node.js:

```bash
npm run content:validate
npm test
npm run build
```

En caso de que un despliegue falle, Vercel conserva el anterior y muestra el registro del error en la página del despliegue.
