# FABER — Sitio web de proyectos de Diseño Industrial

Sitio estático (HTML + CSS + JavaScript) con los proyectos de **Diseño de Productos 2** (Banco Matero) y **Materiales y Procesos 1** (Portamaní, Pava, Portavelas). Funciona en GitHub Pages sin servidor ni compilación.

## Cómo publicarlo en GitHub Pages

1. Entrá a https://github.com e iniciá sesión (o creá una cuenta gratuita).
2. Tocá **New repository** (botón verde "+" arriba a la derecha → *New repository*). Poné un nombre, por ejemplo `faber`, dejalo **Public** y creá el repositorio.
3. Descomprimí el ZIP en tu computadora. En el repositorio nuevo tocá **uploading an existing file** (o *Add file → Upload files*) y **arrastrá TODO el contenido de la carpeta descomprimida** (no la carpeta contenedora): `index.html`, `css`, `js`, `data`, `assets`, `README.md` y `.nojekyll`. Esperá a que termine la carga y tocá **Commit changes**.
   - Si GitHub web no te deja subir carpetas completas, usá GitHub Desktop, o subí por partes (primero los archivos sueltos, luego cada carpeta).
   - `index.html` tiene que quedar en la raíz del repositorio.
4. Andá a **Settings** (pestaña del repositorio) → **Pages** (menú de la izquierda).
5. En **Build and deployment → Source** elegí **Deploy from a branch**. En **Branch** elegí `main` y la carpeta `/ (root)`, y tocá **Save**.
6. Esperá 1–2 minutos y recargá la página de Settings → Pages: aparece el enlace público, del estilo `https://TU-USUARIO.github.io/faber/`.

## Estructura del proyecto

| Archivo / carpeta | Qué controla |
|---|---|
| `index.html` | Esqueleto de la página (barra, contenedor, lightbox) y carga de `<model-viewer>` desde CDN. |
| `data/products.js` | **Todo el contenido**: materias, productos, textos, modelos, planos y láminas. |
| `js/script.js` | Navegación, armado de cada página, visor 3D, galería y lightbox con zoom. |
| `css/styles.css` | Estilos y colores (variables al comienzo del archivo). |
| `assets/brand/` | Logo FABER (extraído de la última lámina de MP1), emblema y favicon. |
| `assets/models/<materia>/` | Modelos `.glb` (visor 3D) y `.usdz` (realidad aumentada en Apple). |
| `assets/plans/mp1/` | Imágenes originales de planos. |
| `assets/boards/<materia>/` | Páginas de los PDF renderizadas como imágenes de alta resolución (láminas). |
| `assets/documents/` | PDF originales para descargar. |
| `assets/tiles/` | Imágenes de las tarjetas (recortadas de las láminas). |

Rutas del sitio: `#/` (inicio), `#/dp2`, `#/dp2/banco-matero`, `#/mp1`, `#/mp1/portamani`, `#/mp1/pava`, `#/mp1/portavelas`.

## Cómo agregar un producto nuevo

1. Copiá los archivos a `assets/` (modelo `.glb` y `.usdz`, planos, láminas). **Usá nombres sin espacios, tildes ni mayúsculas** (ej. `mi-producto.glb`).
2. Abrí `data/products.js`. Duplicá el bloque de un producto dentro de `products`, cambiá el identificador (ej. `"mi-producto"`) y completá los textos y rutas.
3. Agregá ese identificador a la lista `products` de la materia correspondiente (en `subjects`).
4. Listo: aparece solo en el menú, en la página de la materia y con su propia página.

Para agregar una **materia nueva**, sumá un bloque en `subjects` con el mismo formato que `dp2` o `mp1`.

## Notas

- Los modelos 3D están en milímetros; el visor los escala a metros para la realidad aumentada (`scale="0.001 0.001 0.001"` en `js/script.js`). Probá la AR desde un celular real.
- Las fuentes y `<model-viewer>` se cargan desde internet (Google Fonts / Google CDN); el resto es local.
- Los textos técnicos salen de las láminas originales; no se agregaron datos que no figuren en ellas.
