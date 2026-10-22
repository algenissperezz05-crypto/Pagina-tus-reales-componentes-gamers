// COMBOS DE HOY: PC completas armadas con productos de tu catálogo (js/data.js).
// Cada combo tiene:
//   id          código corto y único (si no empieza con "combo-", la página se lo agrega)
//   nombre      nombre que ve el cliente
//   etiqueta    texto corto del nivel (ejemplo: "Entrada · 1080p")
//   lema        una frase corta que lo describe
//   items       lista de ids de productos de data.js (cada uno cuenta como 1 unidad)
//   descuento   porcentaje de rebaja sobre la suma de las piezas (si no lo pones, es 5)
//   precio      (opcional) precio fijo del combo en RD$; si lo pones, manda sobre "descuento"
//   nota        (opcional) aviso corto que sale en la ficha del combo
//  img          (opcional) foto del combo, ej. "assets/images/combo-inicio.png"; si no la pones, se usa un icono de PC
// El precio "por separado" es la suma de los precios actuales de las piezas (con sus ofertas, si las tienen).
// Las existencias del combo son las del componente que menos tenga: si una pieza se agota, el combo se marca como agotado.
// IMPORTANTE: antes de publicar, revisa que las piezas de cada combo sean compatibles entre sí
// (socket del procesador, tipo de memoria, potencia de la fuente y tamaño de la caja).
// Si un id no existe en data.js, ese combo no se muestra y el aviso aparece en la consola del navegador (F12).
window.COMBOS = [
 {
    id: "combo-inicio",
    nombre: "PC Gamer Inicio",
    etiqueta: "Entrada · 1080p",
    lema: "Para jugar en Full HD sin gastar de más.",
    items: ["cpu-01", "mb-03", "ram-01", "gpu-09", "ssd-01", "psu-02", "case-02"],
    descuento: 5,
    nota: "El procesador incluye su propio disipador.",
    img: "assets/images/combo-inicio.png"
  },
  {
    id: "combo-media",
    nombre: "PC Gamer Media",
    etiqueta: "Gama media · 1440p",
    lema: "Para jugar en 1440p y hacer varias cosas a la vez.",
    items: ["cpu-02", "mb-06", "ram-02", "gpu-06", "ssd-02", "psu-03", "case-02", "cool-02"],
    descuento: 5,
    nota: "Incluye un disipador de aire para el procesador.",
    img: "assets/images/combo-media.png"
  },
  {
    id: "combo-elite",
    nombre: "PC Gamer Élite",
    etiqueta: "Gama alta · 4K",
    lema: "Hardware de gama alta para 4K, streaming y creación de contenido.",
    items: ["cpu-03", "mb-01", "ram-04", "gpu-03", "ssd-03", "psu-01", "case-01", "cool-01"],
    descuento: 5,
    nota: "Incluye refrigeración líquida de 360 mm para el procesador.",
    img: "assets/images/combo-elite.png"
  }
];
