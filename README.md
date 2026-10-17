# Tus Reales Componentes Gamers

Tienda gamer (precios en RD$) hecha solo con HTML, CSS y JavaScript. No necesita servidor ni instalar nada.

## Qué incluye
- Menú principal, buscador, categorías, filtros (marca, precio, disponibles), orden, favoritos y carrito. El carrito y los favoritos se guardan en el navegador.
- **Pantalla principal con un procesador 3D giratorio** (hecho con CSS): placa con circuitos que pulsan, chip metálico, anillos, columnas de luz y etiquetas GPU / RAM / SSD / RGB que flotan. Se inclina un poco con el cursor. Detrás hay una red de partículas, el título tiene brillo y la frase "Explora…" cambia de categoría (al tocarla filtra el catálogo).
- **Ficha de producto**: al tocar un producto se abre una ventana con foto (se inclina con el cursor), precio, existencias, descripción, características, cantidad, "Añadir al carrito", "Comprar ahora", favoritos y productos relacionados.
- **Ventana de compra**: formulario con validación (nombre, teléfono, correo opcional, retiro o envío a domicilio, forma de pago, notas), resumen del pedido y una pantalla para revisar y enviar el pedido por WhatsApp, por correo o copiarlo.
- **Animaciones y ambiente**: barra de progreso de lectura, luces de fondo que flotan, luz que sigue al cursor, cabecera que se compacta, cifras que cuentan (calculadas con tu catálogo), marquesina de marcas (al tocar una marca filtra), tarjetas que entran escalonadas y se inclinan con brillo, la imagen vuela al carrito al agregar, botones con brillo y ondas, avisos que se deslizan y botón de volver arriba.
- Si el visitante tiene activado "reducir movimiento" en su sistema, las animaciones se apagan solas.

## Cómo ejecutarla
1. Conserva la estructura de carpetas tal como está.
2. Abre `index.html` en Chrome, Edge, Firefox o Safari. No hay que instalar nada.

## Estructura
- `index.html`: estructura y textos de la página.
- `css/style.css`: colores (variables al inicio) y diseño base.
- `css/animaciones.css`: ambiente y animaciones generales.
- `css/hero3d.css`: la escena 3D y la animación del título.
- `css/modales.css`: ficha de producto y ventana de compra.
- `js/data.js`: catálogo. Aquí cambias productos, marcas, categorías, precios y existencias.
- `js/fichas.js`: descripción y características de cada producto (se buscan por `id`).
- `js/config.js`: datos de la tienda para recibir pedidos (WhatsApp, correo, formas de pago).
- `js/app.js`: búsqueda, filtros, favoritos y carrito.
- `js/hero3d.js`: inclinación de la escena 3D, partículas y la frase "Explora…".
- `js/efectos.js`: progreso, luz del cursor, tarjetas, cifras, marquesina y vuelo al carrito.
- `js/modal.js`, `js/producto.js`, `js/checkout.js`: ventanas, ficha de producto y compra.
- `assets/images/`: una imagen por producto (`<id>.png`).

## Lo que debes completar: `js/config.js`
- `whatsapp`: tu número con código de país y solo números (ejemplo RD: `"18095551234"`). Activa el botón "Enviar por WhatsApp".
- `email`: el correo donde quieres recibir pedidos. Activa "Enviar por correo".
- `pagos`: las formas de pago que realmente aceptas (el cliente elige una como preferencia).

## Cómo funciona la compra (importante)
Esta página **no cobra ni procesa pagos y no tiene servidor**, así que no recibe pedidos por sí sola. El cliente llena sus datos, revisa el mensaje del pedido y lo envía desde su propio WhatsApp o correo (se abren con el texto ya escrito). Hasta que no completes `js/config.js`, el cliente solo puede copiar el resumen, y la página se lo dice.
- Los datos que escribe el cliente no se guardan en el navegador ni se envían a ningún servidor. No se piden datos de tarjeta.
- "Comprar ahora" compra solo ese producto y no toca el carrito. "Finalizar compra" (desde el carrito) quita del carrito los productos del pedido cuando el cliente lo envía o lo copia; si cierra la ventana sin hacerlo, el carrito queda igual.
- El total es de referencia: la tienda confirma disponibilidad, envío y precio final.

## Fichas técnicas: `js/fichas.js`
Los textos salen del nombre de cada producto y de especificaciones generales del fabricante: **revísalos antes de publicar**. Para un producto nuevo, agrega una entrada con su `id` (si no la tiene, se usa la descripción de su categoría).

## Animaciones: ajustar o apagar
- Colores y tipografías: variables `:root` de `css/style.css`.
- Escena 3D: tamaño con `--w` en `.hero-3d` y velocidades en los `@keyframes` de `css/hero3d.css`. Es solo CSS: para usar un modelo 3D real (`.glb`) habría que agregar ese archivo y una librería como `model-viewer` o `three.js`.
- Para quitar un efecto, borra su bloque en `css/animaciones.css` o el apartado numerado en `js/efectos.js`.

## Limitaciones
- Los nombres y marcas son modelos reales, pero precios y existencias son de referencia: confírmalos.
- Los datos de contacto, envíos y garantías del pie de página aún no existen.
- No hay pagos ni cuentas.

## Próximas etapas
- Configurador de PC con compatibilidades (requiere datos técnicos reales).
- Reseñas verificadas y newsletter con consentimiento.
- Backend, base de datos, panel de administración y pasarela de pago para recibir pedidos y cobrar dentro de la página.
