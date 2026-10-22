# Tus Reales Componentes Gamers

Tienda gamer (precios en RD$) hecha solo con HTML, CSS y JavaScript. No necesita servidor ni instalar nada.

## Qué incluye
- **Inicio**: título con brillo, procesador 3D giratorio hecho con CSS (se inclina un poco con el cursor, con partículas de fondo) y la frase "Explora…" que cambia de categoría (al tocarla filtra el catálogo).
- **Ofertas**: una fila de tarjetas que se desliza con el dedo, con las flechas o con el teclado. Muestra los 12 productos con mayor descuento que tengan existencias, con su etiqueta "−N%" y el precio anterior tachado. El botón "Ver todas las ofertas" lleva al catálogo ya filtrado ("Solo en oferta") y ordenado por "Mayor descuento".
- **Combos de hoy**: PC completas (Inicio, Media y Élite) con todas sus piezas, el precio "por separado" tachado, cuánto se ahorra y cuántos combos quedan. Se pueden agregar al carrito o abrir para ver cada pieza.
- **Catálogo**: 113 productos en 14 categorías, buscador, filtros (marca, precio, solo disponibles, solo en oferta), orden (incluye "Mayor descuento"), favoritos y carrito. Se dibujan 24 productos y el botón "Ver más productos" agrega otros 24. El carrito y los favoritos se guardan en el navegador.
- **Ficha de producto y ficha de combo**: al tocar un producto o un combo se abre una ventana con foto, precio (con su oferta), existencias, descripción, características o piezas, cantidad, "Añadir al carrito", "Comprar ahora" y productos relacionados. Desde un combo se puede abrir cada pieza y volver con el botón "← Volver a PC Gamer…".
- **Ventana de compra**: formulario con validación (nombre, teléfono, correo opcional, retiro o envío a domicilio, forma de pago, notas), resumen del pedido y una pantalla para revisar y enviar el pedido por WhatsApp, por correo o copiarlo. Los combos salen con sus piezas, una por línea.
- **Animaciones y ambiente**: luces de fondo, luz que sigue al cursor, cabecera que se compacta al bajar, cifras que cuentan (calculadas con tu catálogo), tarjetas que entran escalonadas y se inclinan con brillo, la imagen vuela al carrito al agregar, botones con brillo, avisos que se deslizan y botón de volver arriba.
- Si el visitante tiene activado "reducir movimiento" en su sistema, las animaciones se apagan solas (ver "Si algo no aparece").

> Esta versión **ya no tiene** la marquesina de marcas ni la barra de progreso de la cabecera.

## Cómo ejecutarla
1. Si descargaste el `.zip`, extráelo primero (clic derecho → **Extraer todo**). No abras `index.html` desde dentro del `.zip`.
2. Conserva la estructura de carpetas tal como está: `index.html` con `css/`, `js/` y `assets/` al lado.
3. Abre `index.html` en Chrome, Edge, Firefox o Safari. No hay que instalar nada.
4. Pon tus fotos de producto en `assets/images/` (un archivo por producto). La lista exacta de nombres está en `LISTA-DE-FOTOS.txt`. Si falta una foto, la tarjeta muestra el icono de su categoría.

### Si ya tienes tu proyecto armado y solo quieres actualizarlo
Reemplaza `index.html`, `README.md`, `LISTA-DE-FOTOS.txt` y las carpetas `css/` y `js/`. **No toques `assets/images/`**: ahí están tus fotos. Ojo: este paquete trae su propio `js/data.js` (con tus 31 productos de antes más 82 nuevos) y `js/config.js` (con tu WhatsApp y tu correo); si ya le hiciste cambios a alguno de los dos, guarda una copia antes de reemplazarlos.

## Estructura
- `index.html`: estructura y textos de la página.
- `css/style.css`: colores (variables al inicio) y diseño base (cabecera, menú, catálogo, tarjetas).
- `css/secciones.css`: secciones Ofertas y Combos de hoy, etiqueta de descuento y botón "Ver más".
- `css/animaciones.css`: ambiente y animaciones generales.
- `css/hero3d.css`: la escena 3D y la animación del título.
- `css/modales.css`: ficha de producto y ventana de compra.
- `js/data.js`: catálogo. Aquí cambias productos, marcas, categorías, precios, ofertas y existencias. **Es obligatorio: sin este archivo la página no muestra productos.**
- `js/combos.js`: los combos de PC completa (Inicio, Media y Élite).
- `js/fichas.js`: descripción y características de cada producto (se buscan por `id`).
- `js/config.js`: datos de la tienda para recibir pedidos (WhatsApp, correo, formas de pago).
- `js/app.js`: búsqueda, filtros, ofertas, combos, paginación, favoritos y carrito.
- `js/hero3d.js`: inclinación de la escena 3D, partículas y la frase "Explora…".
- `js/efectos.js`: luz del cursor, tarjetas, cifras, vuelo al carrito y botón de subir.
- `js/modal.js`, `js/producto.js`, `js/checkout.js`: ventanas, ficha de producto/combo y compra.
- `assets/images/`: una imagen por producto (`<id>.png`).
- `LISTA-DE-FOTOS.txt`: nombre de archivo de la foto de cada producto (marca los 82 productos nuevos, que aún no tienen foto).

## Poner o quitar una oferta (`js/data.js`)
Cada producto tiene `precio` (el normal). Para ponerlo en oferta, agrega `oferta` con el precio rebajado (debe ser menor que `precio`):

```js
{ id: "ssd-01", cat: "Almacenamiento", marca: "WD", nombre: "…", precio: 4300, oferta: 3700, stock: 20, img: "assets/images/ssd-01.png" }
```
Para quitarla, borra el campo `oferta`. El porcentaje de descuento, la etiqueta "−N%" y el precio tachado se calculan solos, y el carrito, la ficha y el pedido usan el precio rebajado. **Las 15 ofertas que vienen son de ejemplo**: cámbialas por las reales. Si no queda ningún producto en oferta, la sección Ofertas se oculta sola. El carrusel muestra los 12 de mayor descuento (el número está en `pintarOfertas`, dentro de `js/app.js`).

## Cambiar los combos (`js/combos.js`)
Cada combo es un bloque con:
- `id`: código corto y único (se le agrega `combo-` si no lo trae).
- `nombre`, `etiqueta` (el nivel, ej. "Entrada · 1080p") y `lema` (una frase corta).
- `items`: lista de `id` de productos de `js/data.js`. Cada uno cuenta como 1 unidad.
- `descuento`: porcentaje de rebaja sobre la suma de las piezas (si no lo pones, es 5).
- `precio` (opcional): precio fijo en RD$; si lo pones, manda sobre `descuento`.
- `nota` (opcional): aviso corto que sale en la ficha del combo.
- `img` (opcional): foto del combo; si no la hay, se usa un icono de PC.

El precio "por separado" es la suma de los precios actuales de las piezas (con sus ofertas). Las existencias del combo son las de la pieza que menos tenga: si una se agota, el combo se marca como agotado. Si un `id` no existe en `data.js`, ese combo no se muestra y el aviso aparece en la consola del navegador (F12).
**Antes de publicar, revisa que las piezas de cada combo sean compatibles entre sí** (socket del procesador, tipo de memoria, potencia de la fuente y tamaño de la caja). Los que vienen son ejemplos armados con productos del catálogo.

## Agregar productos
1. En `js/data.js`, dentro de `productos`, agrega una línea nueva con un `id` único (ej. `gpu-14`), `cat` (una de las categorías de la lista), `marca`, `nombre`, `precio`, `stock` y `img: "assets/images/gpu-14.png"`. Opcionales: `nuevo: true` y `oferta`.
2. Guarda la foto en `assets/images/gpu-14.png`.
3. (Opcional) En `js/fichas.js`, agrega una entrada con ese `id` con su descripción y características. Si no la tiene, se usa la descripción de su categoría.
No hace falta tocar nada más: filtros, marcas, cifras, buscador y paginación se arman solos.

## Fotos: cómo mantenerlas livianas
- Usa PNG o WebP, cuadradas y de menos de ~300 KB cada una. Una foto de varios MB hace que la tarjeta tarde en aparecer, aunque la página esté optimizada. Se puede reducir el peso gratis en squoosh.app sin perder calidad visible.
- Las fotos se cargan "perezosamente": solo se descargan las que el visitante está por ver.

## Optimización (qué se hizo)
- **Menos trabajo para el navegador**: se quitaron los efectos más costosos de dibujar (desenfoques `blur` y `backdrop-filter` en luces, aura, cabecera, etiquetas y fondo de las ventanas) y se cambiaron por degradados y fondos sólidos. Las animaciones que quedan solo mueven y desvanecen (`transform` y `opacity`), que el navegador sabe hacer sin redibujar.
- **Animaciones que se pausan solas**: la escena 3D y las partículas se detienen cuando el inicio no se ve en pantalla, cuando la pestaña está oculta y cuando hay una ventana abierta. En celulares las luces de fondo quedan quietas.
- **Eventos del cursor ordenados**: la inclinación de las tarjetas y de la escena 3D se calcula una vez por cuadro, y las partículas se dibujan a 30 cuadros por segundo.
- **Catálogo paginado**: se dibujan 24 productos y "Ver más" agrega 24 sin volver a dibujar los anteriores. Las búsquedas usan un índice que se calcula una sola vez.
- **Tipografías sin bloquear**: las fuentes de Google se cargan sin detener la primera pantalla (si tardan, se ve el texto con una fuente del sistema y luego cambia).
- **Imágenes** con carga perezosa y decodificación asíncrona.
- **Se probó y se descartó** `content-visibility: auto` en las tarjetas: aceleraba el dibujo pero hacía que el botón "volver arriba" se detuviera antes de llegar. La paginación ya cumple ese papel.
- **Medido en un equipo de pruebas sin tarjeta gráfica** (un caso exigente; en tu PC o celular los números serán distintos), comparando la página de antes con la de ahora: el primer contenido aparece en ~0.24 s en vez de ~0.73 s, y al desplazarse la página pasa de ~14 a ~56 cuadros por segundo. Con el catálogo de 113 productos dibujado de golpe con el código anterior, la carga era aún más lenta.

## Si algo no aparece
- **"No se pudo cargar el catálogo"**: la página no encuentra o no puede leer `js/data.js`. Revisa que el archivo exista dentro de la carpeta `js/`, que abriste `index.html` desde la carpeta completa del proyecto (no desde el `.zip`) y que `data.js` no tenga errores de escritura (una coma o una llave de más o de menos). Para ver el error exacto, pulsa F12 y abre la pestaña "Consola".
- **Se ve el icono de la categoría en vez de la foto**: falta ese archivo en `assets/images/` o su nombre no coincide con el valor de `img` en `js/data.js`. Es lo normal para los 82 productos nuevos hasta que les pongas foto (ver `LISTA-DE-FOTOS.txt`).
- **No aparece la sección Ofertas o Combos de hoy**: Ofertas se oculta si ningún producto con existencias tiene `oferta`; Combos se oculta si `js/combos.js` no se pudo cargar o ningún combo tiene sus `id` válidos (la consola F12 dice cuál falla).
- **El procesador 3D y los fondos no se mueven**: el navegador está respetando la opción "reducir movimiento" del sistema. En Windows está en Configuración → Accesibilidad → Efectos visuales → "Efectos de animación" (Windows 11) o Accesibilidad → Pantalla → "Mostrar animaciones en Windows" (Windows 10). Si está apagado, la página muestra todo quieto a propósito.

## Datos de la tienda: `js/config.js`
- `whatsapp`: tu número con código de país y solo números (ejemplo RD: `"18095551234"`). Activa el botón "Enviar por WhatsApp". **Ya está puesto con tu número.**
- `email`: el correo donde quieres recibir pedidos. Activa "Enviar por correo". **Ya está puesto con tu correo.**
- `pagos`: las formas de pago que realmente aceptas (el cliente elige una como preferencia). **Es una lista de ejemplo (Efectivo, Transferencia bancaria, Tarjeta): cámbiala por las tuyas.**
- Privacidad: como la página es pública, quien abra el código puede ver el número y el correo de este archivo. Deja solo los que quieras que sean públicos.

## Cómo funciona la compra (importante)
Esta página **no cobra ni procesa pagos y no tiene servidor**, así que no recibe pedidos por sí sola. El cliente llena sus datos, revisa el mensaje del pedido y lo envía desde su propio WhatsApp o correo (se abren con el texto ya escrito). Si dejas el WhatsApp y el correo vacíos en `js/config.js`, el cliente solo puede copiar el resumen, y la página se lo dice.
- Los datos que escribe el cliente no se guardan en el navegador ni se envían a ningún servidor. No se piden datos de tarjeta.
- "Comprar ahora" compra solo ese producto o combo y no toca el carrito. "Finalizar compra" (desde el carrito) quita del carrito lo que va en el pedido cuando el cliente lo envía o lo copia; si cierra la ventana sin hacerlo, el carrito queda igual.
- El total es de referencia: la tienda confirma disponibilidad, compatibilidad de las piezas, envío y precio final.

## Fichas técnicas: `js/fichas.js`
Los textos salen del nombre de cada producto y de especificaciones generales del fabricante: **revísalos antes de publicar**, sobre todo los de los 82 productos nuevos.

## Animaciones: ajustar o apagar
- Colores y tipografías: variables `:root` de `css/style.css` (el color de las ofertas está en `css/secciones.css`).
- Escena 3D: tamaño con `--w` en `.hero-3d` y velocidades en los `@keyframes` de `css/hero3d.css`. Es solo CSS: para usar un modelo 3D real (`.glb`) habría que agregar ese archivo y una librería como `model-viewer` o `three.js`.
- Para quitar un efecto, borra su bloque en `css/animaciones.css` o el apartado numerado en `js/efectos.js`.
- Menú: de 1280 px de ancho hacia arriba el menú va en la cabecera; en pantallas más pequeñas aparece el botón "Menú".

## Limitaciones
- Los nombres y marcas son modelos reales, pero **precios, ofertas, existencias, descuentos de los combos y fichas técnicas son de referencia**: confírmalos.
- Los 82 productos nuevos no traen foto (ver `LISTA-DE-FOTOS.txt`).
- Los datos de contacto, envíos y garantías del pie de página aún no existen.
- No hay pagos ni cuentas.

## Próximas etapas
- Configurador de PC con compatibilidades (requiere datos técnicos reales).
- Reseñas verificadas y newsletter con consentimiento.
- Backend, base de datos, panel de administración y pasarela de pago para recibir pedidos y cobrar dentro de la página.
