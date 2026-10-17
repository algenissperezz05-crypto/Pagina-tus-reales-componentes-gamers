// CATÁLOGO. Modelos reales con su marca y categoría.
// IMPORTANTE: los precios (RD$) y las existencias siguen siendo de referencia; confírmalos con tu inventario real.
// Cada producto: id único, cat (una de "categorias"), marca, nombre, precio (entero en RD$), stock (entero),
// y opcionales: nuevo:true, img:"assets/images/archivo.ext".
// Para usar una foto real, guarda el archivo en assets/images/ y cambia el valor de "img" (solo fotos con permiso de uso).
window.CATALOGO = {
  moneda: "RD$",
  categorias: [
  "Tarjetas gráficas",
  "Procesadores",
  "Memoria RAM",
  "Almacenamiento",
  "Monitores",
  "Periféricos",
  "Placas base",
  "Refrigeración",
  "Fuentes de alimentación",
  "Cajas PC",
  "Cámaras y streaming",
  "Audio",
  "Accesorios gamer",
  "Figuras 3D"
],
  productos: [
    { id: "gpu-01", cat: "Tarjetas gráficas", marca: "ASUS", nombre: "ASUS ROG Strix GeForce RTX 2080 8GB GDDR6", precio: 38500, stock: 4, nuevo: true,  img: "assets/images/gpu-01.png" },
    { id: "gpu-02", cat: "Tarjetas gráficas", marca: "MSI", nombre: "MSI GeForce RTX 4070 Ventus 2X 12GB GDDR6X", precio: 62900, stock: 0, img: "assets/images/gpu-02.png" },
    { id: "cpu-01", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 5 5600X 6 núcleos 4.6 GHz AM4", precio: 18900, stock: 8, img: "assets/images/cpu-01.png" },
    { id: "cpu-02", cat: "Procesadores", marca: "Intel", nombre: "Intel Core i5-13600K 14 núcleos LGA1700", precio: 27400, stock: 3, nuevo: true, img: "assets/images/cpu-02.png" },
    { id: "ram-01", cat: "Memoria RAM", marca: "Corsair", nombre: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200 MHz", precio: 5200, stock: 15, img: "assets/images/ram-01.png" },
    { id: "ram-02", cat: "Memoria RAM", marca: "Kingston", nombre: "Kingston FURY Beast 32GB (2x16GB) DDR4 3200 MHz", precio: 8900, stock: 6, img: "assets/images/ram-02.png" },
    { id: "ssd-01", cat: "Almacenamiento", marca: "Western Digital", nombre: "WD Blue SN570 1TB SSD NVMe M.2", precio: 4300, stock: 20, img: "assets/images/ssd-01.png" },
    { id: "ssd-02", cat: "Almacenamiento", marca: "Samsung", nombre: "Samsung 980 PRO 1TB SSD NVMe PCIe 4.0", precio: 9800, stock: 2, img: "assets/images/ssd-02.png" },
    { id: "mon-01", cat: "Monitores", marca: "AOC", nombre: "AOC 24G2 24\" Full HD IPS 144 Hz", precio: 14500, stock: 5, img: "assets/images/mon-01.png" },
    { id: "mon-02", cat: "Monitores", marca: "LG", nombre: "LG UltraGear 27GL850 27\" QHD Nano IPS 144 Hz", precio: 23900, stock: 0, img: "assets/images/mon-02.png" },
    { id: "per-01", cat: "Periféricos", marca: "Redragon", nombre: "Redragon Kumara K552 Teclado mecánico TKL RGB", precio: 3600, stock: 12, nuevo: true, img: "assets/images/per-01.png" },
    { id: "per-02", cat: "Periféricos", marca: "Logitech", nombre: "Logitech G203 LIGHTSYNC Ratón gaming RGB", precio: 1900, stock: 30, img: "assets/images/per-02.png" },
    { id: "per-03", cat: "Periféricos", marca: "HyperX", nombre: "HyperX Cloud II Gaming Headset", precio: 4500, stock: 8, img: "assets/images/per-03.png" },
    // TARJETA GRÁFICA
    { id: "gpu-03", cat: "Tarjetas gráficas", marca: "ASUS ROG", nombre: "ROG Astral GeForce RTX 5090 32GB GDDR7", precio: 250000, stock: 1, nuevo: true, img: "assets/images/gpu-03.png" },
    // PROCESADOR
    { id: "cpu-03", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 9 9950X3D 16 núcleos AM5", precio: 45000, stock: 2, nuevo: true, img: "assets/images/cpu-03.png" },
    // PLACA BASE
    { id: "mb-01", cat: "Placas base", marca: "ASUS ROG", nombre: "ROG Crosshair X870E Hero AM5 DDR5", precio: 42000, stock: 2, img: "assets/images/mb-01.png" },
    // MEMORIA RAM
    { id: "ram-04", cat: "Memoria RAM", marca: "Corsair", nombre: "Dominator Titanium 64GB (2x32GB) DDR5", precio: 18000, stock: 4, img: "assets/images/ram-04.png" },
    // SSD
    { id: "ssd-03", cat: "Almacenamiento", marca: "Samsung", nombre: "Samsung 9100 PRO 4TB NVMe PCIe 5.0", precio: 32000, stock: 3, img: "assets/images/ssd-03.png" },
   // MONITOR
    { id: "mon-03", cat: "Monitores", marca: "ASUS ROG", nombre: "ROG Swift OLED PG32UCDM 32 pulgadas 4K 240Hz", precio: 65000, stock: 2, nuevo: true, img: "assets/images/mon-03.png" },
   // TECLADO
    { id: "per-04", cat: "Periféricos", marca: "Wooting", nombre: "Wooting 80HE Teclado gaming Hall Effect", precio: 15000, stock: 3, img: "assets/images/per-04.png" },
   // MOUSE GAMER
    { id: "per-05", cat: "Periféricos", marca: "Logitech G", nombre: "PRO X SUPERLIGHT 2 Ratón gaming inalámbrico", precio: 9500, stock: 4, img: "assets/images/per-05.png" },
   // AURICULARES
    { id: "per-06", cat: "Periféricos", marca: "Audeze", nombre: "Maxwell Auriculares gaming inalámbricos", precio: 22000, stock: 2, img: "assets/images/per-06.png" },
   // REFRIGERACIÓN
    { id: "cool-01", cat: "Refrigeración", marca: "ARCTIC", nombre: "Liquid Freezer III 360 A-RGB", precio: 11000, stock: 3, img: "assets/images/cool-01.png" },
   // FUENTE DE ALIMENTACIÓN
    { id: "psu-01", cat: "Fuentes de alimentación", marca: "Seasonic", nombre: "PRIME TX-1300 Fuente 1300W 80 PLUS Titanium", precio: 24000, stock: 2, img: "assets/images/psu-01.png" },
   // CAJA PC
    { id: "case-01", cat: "Cajas PC", marca: "Lian Li", nombre: "O11D EVO RGB Torre gaming panorámica", precio: 16000, stock: 3, img: "assets/images/case-01.png" },
   // CÁMARA PARA STREAMING
    { id: "cam-01", cat: "Cámaras y streaming", marca: "Elgato", nombre: "Facecam 4K Webcam Ultra HD 60 FPS", precio: 12000, stock: 4, img: "assets/images/cam-01.png" },
   // CAPTURADORA
    { id: "cam-02", cat: "Cámaras y streaming", marca: "Elgato", nombre: "4K X Capturadora de vídeo HDMI", precio: 18000, stock: 2, img: "assets/images/cam-02.png" },
   // MICRÓFONO
    { id: "aud-01", cat: "Audio", marca: "Shure", nombre: "SM7dB Micrófono dinámico para streaming", precio: 35000, stock: 2, img: "assets/images/aud-01.png" },
   // CONTROL DE STREAMING
    { id: "str-01", cat: "Cámaras y streaming", marca: "Elgato", nombre: "Stream Deck XL Controlador de 32 teclas", precio: 14000, stock: 3, img: "assets/images/str-01.png" },
   // FIGURA 3D DECORATIVA
    { id: "fig-01", cat: "Figuras 3D", marca: "Decoración gamer", nombre: "Figura 3D de dragón RGB para setup gamer", precio: 2500, stock: 5, img: "assets/images/fig-01.png" },
   // ACCESORIO DE ILUMINACIÓN
    { id: "acc-01", cat: "Accesorios gamer", marca: "Elgato", nombre: "Key Light Iluminación LED para streaming", precio: 12000, stock: 3, img: "assets/images/acc-01.png" }

 
 
 
 
 
 
  ]
};