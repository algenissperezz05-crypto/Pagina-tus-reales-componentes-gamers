// FICHAS TÉCNICAS: descripción y características que se muestran al abrir un producto (se buscan por "id").
// Salen del nombre de cada producto y de especificaciones generales del fabricante: confírmalas antes de publicar.
// Para un producto nuevo agrega una entrada con su id; si no la tiene, se usa la descripción de su categoría.
window.FICHAS_CAT = {
  "Tarjetas gráficas": "Tarjeta gráfica para jugar, crear contenido y acelerar tu PC.",
  "Procesadores": "Procesador para armar o mejorar tu PC.",
  "Memoria RAM": "Memoria RAM para que tu equipo trabaje y juegue con más fluidez.",
  "Almacenamiento": "Unidad de almacenamiento para tu sistema, tus juegos y tus archivos.",
  "Monitores": "Monitor pensado para jugar y trabajar con buena imagen.",
  "Periféricos": "Periférico gamer para controlar, escuchar y jugar con comodidad.",
  "Placas base": "Placa base para conectar y expandir todos los componentes de tu PC.",
  "Refrigeración": "Refrigeración para mantener tu equipo fresco y silencioso.",
  "Fuentes de alimentación": "Fuente de poder para alimentar tu PC de forma estable.",
  "Cajas PC": "Caja para armar tu PC con buen flujo de aire y estilo.",
  "Cámaras y streaming": "Equipo para transmitir, grabar y crear contenido.",
  "Audio": "Equipo de audio para voz y sonido de calidad.",
  "Accesorios gamer": "Accesorio para completar tu setup gamer.",
  "Figuras 3D": "Figura decorativa para darle personalidad a tu setup."
};

window.FICHAS = {
  "gpu-01": { desc: "Tarjeta gráfica ROG Strix con chip GeForce RTX 2080 y 8 GB de memoria GDDR6, pensada para jugar con calidad alta.",
    specs: [["Chip gráfico", "NVIDIA GeForce RTX 2080"], ["Memoria", "8 GB GDDR6"], ["Interfaz", "PCI Express 3.0 x16"], ["Serie", "ROG Strix"]] },
  "gpu-02": { desc: "Tarjeta gráfica MSI Ventus 2X con GeForce RTX 4070, 12 GB de memoria GDDR6X y refrigeración de doble ventilador.",
    specs: [["Chip gráfico", "NVIDIA GeForce RTX 4070"], ["Memoria", "12 GB GDDR6X"], ["Interfaz", "PCI Express 4.0 x16"], ["Refrigeración", "Doble ventilador (Ventus 2X)"]] },
  "gpu-03": { desc: "Tarjeta gráfica de la serie ROG Astral con GeForce RTX 5090 y 32 GB de memoria GDDR7, de la gama más alta para gaming y creación.",
    specs: [["Chip gráfico", "NVIDIA GeForce RTX 5090"], ["Memoria", "32 GB GDDR7"], ["Interfaz", "PCI Express 5.0 x16"], ["Serie", "ROG Astral"]] },

  "cpu-01": { desc: "Procesador Ryzen 5 de 6 núcleos para socket AM4, una opción equilibrada para jugar y para el uso diario.",
    specs: [["Núcleos / hilos", "6 / 12"], ["Frecuencia máxima", "Hasta 4.6 GHz"], ["Socket", "AM4"], ["Consumo (TDP)", "65 W"]] },
  "cpu-02": { desc: "Procesador Intel Core i5 de 13.ª generación con 14 núcleos, desbloqueado para overclock, para socket LGA1700.",
    specs: [["Núcleos", "14 (6 de rendimiento + 8 eficientes)"], ["Hilos", "20"], ["Frecuencia máxima", "Hasta 5.1 GHz"], ["Socket", "LGA1700"], ["Multiplicador", "Desbloqueado (serie K)"]] },
  "cpu-03": { desc: "Procesador Ryzen 9 de 16 núcleos con tecnología AMD 3D V-Cache para socket AM5, orientado a gaming extremo y trabajo pesado.",
    specs: [["Núcleos / hilos", "16 / 32"], ["Socket", "AM5"], ["Tecnología", "AMD 3D V-Cache"], ["Memoria compatible", "DDR5"]] },

  "ram-01": { desc: "Kit de memoria DDR4 de perfil bajo, ideal para equipos con disipadores de procesador grandes.",
    specs: [["Capacidad", "16 GB (2 × 8 GB)"], ["Tipo", "DDR4"], ["Velocidad", "3200 MHz"], ["Formato", "DIMM de perfil bajo (LPX)"]] },
  "ram-02": { desc: "Kit de memoria DDR4 de 32 GB con disipador, para multitarea y juegos exigentes.",
    specs: [["Capacidad", "32 GB (2 × 16 GB)"], ["Tipo", "DDR4"], ["Velocidad", "3200 MHz"], ["Serie", "FURY Beast"]] },
  "ram-04": { desc: "Kit de memoria DDR5 de alta capacidad de la serie Dominator Titanium, para equipos de gama alta.",
    specs: [["Capacidad", "64 GB (2 × 32 GB)"], ["Tipo", "DDR5"], ["Serie", "Dominator Titanium"]] },

  "ssd-01": { desc: "Unidad SSD NVMe de 1 TB en formato M.2 para que el sistema y tus juegos carguen más rápido.",
    specs: [["Capacidad", "1 TB"], ["Interfaz", "NVMe PCIe 3.0 x4"], ["Formato", "M.2 2280"], ["Serie", "WD Blue SN570"]] },
  "ssd-02": { desc: "SSD NVMe PCIe 4.0 de 1 TB con velocidades de lectura de hasta 7,000 MB/s.",
    specs: [["Capacidad", "1 TB"], ["Interfaz", "NVMe PCIe 4.0 x4"], ["Formato", "M.2 2280"], ["Lectura secuencial", "Hasta 7,000 MB/s"]] },
  "ssd-03": { desc: "SSD NVMe PCIe 5.0 de 4 TB de la serie 9100 PRO, pensado para cargas de trabajo y juegos de gran tamaño.",
    specs: [["Capacidad", "4 TB"], ["Interfaz", "NVMe PCIe 5.0"], ["Formato", "M.2"], ["Serie", "9100 PRO"]] },

  "mon-01": { desc: "Monitor gamer de 24 pulgadas Full HD con panel IPS y 144 Hz de frecuencia de actualización.",
    specs: [["Tamaño", "24 pulgadas"], ["Resolución", "1920 × 1080 (Full HD)"], ["Panel", "IPS"], ["Frecuencia", "144 Hz"], ["Tiempo de respuesta", "1 ms (MPRT)"]] },
  "mon-02": { desc: "Monitor gamer de 27 pulgadas QHD con panel Nano IPS y 144 Hz.",
    specs: [["Tamaño", "27 pulgadas"], ["Resolución", "2560 × 1440 (QHD)"], ["Panel", "Nano IPS"], ["Frecuencia", "144 Hz"], ["Tiempo de respuesta", "1 ms (GtG)"]] },
  "mon-03": { desc: "Monitor gamer OLED de 32 pulgadas con resolución 4K y 240 Hz.",
    specs: [["Tamaño", "32 pulgadas"], ["Resolución", "3840 × 2160 (4K)"], ["Panel", "OLED"], ["Frecuencia", "240 Hz"]] },

  "per-01": { desc: "Teclado mecánico compacto TKL (sin teclado numérico) con iluminación RGB.",
    specs: [["Formato", "TKL (sin teclado numérico)"], ["Tipo", "Mecánico"], ["Iluminación", "RGB"], ["Conexión", "Cable USB"]] },
  "per-02": { desc: "Ratón gamer con cable, sensor de hasta 8,000 DPI e iluminación RGB LIGHTSYNC.",
    specs: [["Sensor", "Hasta 8,000 DPI"], ["Botones", "6 programables"], ["Iluminación", "RGB LIGHTSYNC"], ["Conexión", "Cable USB"]] },
  "per-03": { desc: "Auriculares gamer con micrófono desmontable, drivers de 53 mm y sonido envolvente virtual 7.1.",
    specs: [["Drivers", "53 mm"], ["Micrófono", "Desmontable con cancelación de ruido"], ["Sonido", "Envolvente virtual 7.1 (con caja USB)"], ["Conexión", "Cable"]] },
  "per-04": { desc: "Teclado gamer de formato compacto con interruptores magnéticos Hall Effect.",
    specs: [["Formato", "80 %"], ["Interruptores", "Hall Effect (magnéticos)"], ["Función", "Disparo rápido (Rapid Trigger)"]] },
  "per-05": { desc: "Ratón gamer inalámbrico ultraligero pensado para esports.",
    specs: [["Conexión", "Inalámbrica LIGHTSPEED"], ["Peso", "Aprox. 60 g"], ["Sensor", "HERO 2 (hasta 44,000 DPI)"]] },
  "per-06": { desc: "Auriculares gamer inalámbricos con drivers planar magnéticos de 90 mm.",
    specs: [["Conexión", "Inalámbrica"], ["Drivers", "Planar magnéticos de 90 mm"], ["Micrófono", "Incluido"]] },

  "mb-01": { desc: "Placa base ATX de gama alta para procesadores AMD Ryzen en socket AM5, con memoria DDR5.",
    specs: [["Socket", "AM5"], ["Chipset", "AMD X870E"], ["Memoria", "DDR5"], ["Formato", "ATX"]] },
  "cool-01": { desc: "Refrigeración líquida todo en uno con radiador de 360 mm e iluminación A-RGB.",
    specs: [["Tipo", "Líquida AIO"], ["Radiador", "360 mm (3 ventiladores de 120 mm)"], ["Iluminación", "A-RGB"], ["Compatibilidad", "AMD AM5 / AM4 e Intel LGA1700"]] },
  "psu-01": { desc: "Fuente de poder de 1300 W con certificación 80 PLUS Titanium para equipos de alto rendimiento.",
    specs: [["Potencia", "1300 W"], ["Certificación", "80 PLUS Titanium"], ["Formato", "ATX"], ["Cableado", "Modular"]] },
  "case-01": { desc: "Torre de cámara doble con panel panorámico de vidrio templado para lucir tu hardware.",
    specs: [["Tipo", "Torre media"], ["Panel", "Vidrio templado panorámico"], ["Placas compatibles", "Hasta E-ATX"]] },

  "cam-01": { desc: "Webcam 4K Ultra HD a 60 FPS para streaming y videollamadas.",
    specs: [["Resolución", "4K Ultra HD"], ["Fotogramas", "60 FPS"], ["Uso", "Streaming y videollamadas"]] },
  "cam-02": { desc: "Capturadora de vídeo HDMI 4K para grabar o transmitir tu consola o tu PC.",
    specs: [["Entrada", "HDMI"], ["Resolución", "Hasta 4K"], ["Uso", "Grabación y streaming"]] },
  "str-01": { desc: "Controlador de 32 teclas LCD personalizables para lanzar acciones y escenas con un toque.",
    specs: [["Teclas", "32 con pantalla LCD"], ["Uso", "Streaming y automatización"], ["Conexión", "USB"]] },
  "aud-01": { desc: "Micrófono dinámico de estudio con preamplificador integrado, para streaming, podcast y voz.",
    specs: [["Tipo", "Dinámico cardioide"], ["Preamplificador", "Integrado"], ["Conexión", "XLR"]] },

  "fig-01": { desc: "Figura decorativa 3D de dragón con iluminación RGB para darle personalidad a tu setup.",
    specs: [["Tipo", "Figura decorativa 3D"], ["Iluminación", "RGB"], ["Uso", "Decoración de setup"]] },
  "acc-01": { desc: "Panel de luz LED para streaming y videollamadas con temperatura de color ajustable.",
    specs: [["Tipo", "Panel LED"], ["Brillo", "Hasta 2,800 lúmenes"], ["Temperatura de color", "2900 – 7000 K"], ["Control", "Por aplicación (Wi-Fi)"]] }
};
