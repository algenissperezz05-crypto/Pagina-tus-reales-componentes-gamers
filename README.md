# Tus Reales Componentes Gamers: Etapa 1

Tienda gamer (precios en RD$), sin servidor. Incluye menú principal, marca, inicio, catálogo con búsqueda, filtros y orden, favoritos y carrito. El carrito y los favoritos se guardan en el navegador.

## Cómo ejecutarla
1. Conserva la estructura de carpetas tal como está.
2. Abre `index.html` en Chrome, Edge, Firefox o Safari. No hay que instalar nada.

## Estructura
- `index.html`: estructura y textos de la página.
- `css/style.css`: colores (variables al inicio), diseño y animaciones.
- `js/data.js`: catálogo. Aquí cambias productos, marcas, categorías, precios y existencias.
- `assets/images/`: una imagen por producto (`<id>.svg`).
- `js/app.js`: búsqueda, filtros, favoritos y carrito.

## Personalizar
- Colores y tipografías: variables `:root` de `css/style.css`.
- Productos: `js/data.js`. Las imágenes actuales son ilustraciones genéricas. Para usar una foto real, guárdala en `assets/images/` y cambia `img` del producto (solo con permiso de uso). Si una imagen no carga, se muestra el icono de la categoría.

## Limitaciones de esta etapa
- Los nombres y marcas son modelos reales, pero precios y existencias son de referencia: confírmalos.
- Los datos de contacto, envíos y garantías aún no existen.
- El total del carrito es de referencia; el precio final deberá calcularse en el servidor.
- No hay pagos ni cuentas: el botón de pago está desactivado a propósito.

## Próximas etapas
2. Fichas de producto y configurador de PC con compatibilidades (requiere datos técnicos reales).
3. Proceso de compra, newsletter con consentimiento y reseñas verificadas.
4. Backend, base de datos, panel de administración y pasarela de pago.
