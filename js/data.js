// CATÁLOGO. Modelos reales con su marca y categoría.
// IMPORTANTE: los precios (RD$) y las existencias siguen siendo de referencia; confírmalos con tu inventario real.
// Cada producto: id único, cat (una de "categorias"), marca, nombre, precio (entero en RD$), stock (entero),
// y opcionales: nuevo:true, oferta:<precio rebajado en RD$, menor que "precio">, img:"assets/images/archivo.ext".
// Las ofertas salen en la sección "Ofertas" del inicio. Para quitar una oferta, borra su campo "oferta" (las que hay son de ejemplo).
// Para usar una foto real, guarda el archivo en assets/images/ con el nombre del id (ejemplo: cpu-01.png) o cambia el valor de "img"
// (solo fotos con permiso de uso). Si falta la foto, la tarjeta muestra el icono de la categoría.
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
    
    // ===== PRODUCTOS NUEVOS (modelos reales; precios y existencias de referencia) =====

    // TARJETAS GRÁFICAS
    { id: "gpu-01", cat: "Tarjetas gráficas", marca: "ASUS", nombre: "ASUS ROG Strix GeForce RTX 2080 8GB GDDR6", precio: 38500, oferta: 34900, stock: 4, nuevo: true,  img: "assets/images/gpu-01.png" },
    { id: "gpu-02", cat: "Tarjetas gráficas", marca: "MSI", nombre: "MSI GeForce RTX 4070 Ventus 2X 12GB GDDR6X", precio: 62900, stock: 0, img: "assets/images/gpu-02.png" },
    { id: "gpu-03", cat: "Tarjetas gráficas", marca: "ASUS ROG", nombre: "ROG Astral GeForce RTX 5090 32GB GDDR7", precio: 250000, stock: 1, nuevo: true, img: "assets/images/gpu-03.png" },
    { id: "gpu-04", cat: "Tarjetas gráficas", marca: "Gigabyte", nombre: "Gigabyte GeForce RTX 5060 Windforce OC 8GB GDDR7", precio: 36900, stock: 6, nuevo: true, img: "assets/images/gpu-04.png" },
    { id: "gpu-05", cat: "Tarjetas gráficas", marca: "MSI", nombre: "MSI GeForce RTX 5060 Ti Ventus 2X OC 16GB GDDR7", precio: 52900, stock: 4, nuevo: true, img: "assets/images/gpu-05.png" },
    { id: "gpu-06", cat: "Tarjetas gráficas", marca: "Gigabyte", nombre: "Gigabyte GeForce RTX 5070 Windforce OC 12GB GDDR7", precio: 66900, stock: 3, nuevo: true, img: "assets/images/gpu-06.png" },
    { id: "gpu-07", cat: "Tarjetas gráficas", marca: "ASUS", nombre: "ASUS Prime GeForce RTX 5070 Ti OC 16GB GDDR7", precio: 89900, stock: 2, nuevo: true, img: "assets/images/gpu-07.png" },
    { id: "gpu-08", cat: "Tarjetas gráficas", marca: "MSI", nombre: "MSI GeForce RTX 5080 Gaming Trio OC 16GB GDDR7", precio: 121900, stock: 2, nuevo: true, img: "assets/images/gpu-08.png" },
    { id: "gpu-09", cat: "Tarjetas gráficas", marca: "ASUS", nombre: "ASUS Dual GeForce RTX 4060 OC 8GB GDDR6", precio: 34900, oferta: 31900, stock: 7, img: "assets/images/gpu-09.png" },
    { id: "gpu-10", cat: "Tarjetas gráficas", marca: "Sapphire", nombre: "Sapphire Pulse Radeon RX 9070 XT 16GB GDDR6", precio: 69900, stock: 3, nuevo: true, img: "assets/images/gpu-10.png" },
    { id: "gpu-11", cat: "Tarjetas gráficas", marca: "XFX", nombre: "XFX Swift Radeon RX 9070 16GB GDDR6", precio: 63900, stock: 3, img: "assets/images/gpu-11.png" },
    { id: "gpu-12", cat: "Tarjetas gráficas", marca: "Sapphire", nombre: "Sapphire Pulse Radeon RX 9060 XT 16GB GDDR6", precio: 41900, stock: 5, nuevo: true, img: "assets/images/gpu-12.png" },
    { id: "gpu-13", cat: "Tarjetas gráficas", marca: "ASRock", nombre: "ASRock Intel Arc B580 Challenger OC 12GB GDDR6", precio: 28900, stock: 4, img: "assets/images/gpu-13.png" },

    // PROCESADORES
    { id: "cpu-01", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 5 5600X 6 núcleos 4.6 GHz AM4", precio: 18900, oferta: 16900, stock: 8, img: "assets/images/cpu-01.png" },
    { id: "cpu-02", cat: "Procesadores", marca: "Intel", nombre: "Intel Core i5-13600K 14 núcleos LGA1700", precio: 27400, stock: 3, nuevo: true, img: "assets/images/cpu-02.png" },
    { id: "cpu-03", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 9 9950X3D 16 núcleos AM5", precio: 45000, stock: 2, nuevo: true, img: "assets/images/cpu-03.png" },
    { id: "cpu-04", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 5 5600 6 núcleos 4.4 GHz AM4", precio: 16900, stock: 9, img: "assets/images/cpu-04.png" },
    { id: "cpu-05", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 5 7600 6 núcleos 5.1 GHz AM5", precio: 19900, stock: 6, img: "assets/images/cpu-05.png" },
    { id: "cpu-06", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 7 7800X3D 8 núcleos AM5", precio: 34900, stock: 3, img: "assets/images/cpu-06.png" },
    { id: "cpu-07", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 5 9600X 6 núcleos 5.4 GHz AM5", precio: 21900, stock: 5, nuevo: true, img: "assets/images/cpu-07.png" },
    { id: "cpu-08", cat: "Procesadores", marca: "AMD", nombre: "AMD Ryzen 7 9800X3D 8 núcleos AM5", precio: 38900, stock: 2, nuevo: true, img: "assets/images/cpu-08.png" },
    { id: "cpu-09", cat: "Procesadores", marca: "Intel", nombre: "Intel Core i5-12400F 6 núcleos LGA1700", precio: 12900, stock: 10, img: "assets/images/cpu-09.png" },
    { id: "cpu-10", cat: "Procesadores", marca: "Intel", nombre: "Intel Core i5-14600K 14 núcleos LGA1700", precio: 28900, stock: 4, img: "assets/images/cpu-10.png" },
    { id: "cpu-11", cat: "Procesadores", marca: "Intel", nombre: "Intel Core i7-14700K 20 núcleos LGA1700", precio: 38900, stock: 3, img: "assets/images/cpu-11.png" },
    { id: "cpu-12", cat: "Procesadores", marca: "Intel", nombre: "Intel Core Ultra 7 265K 20 núcleos LGA1851", precio: 33900, stock: 3, nuevo: true, img: "assets/images/cpu-12.png" },

    // PLACAS BASE
    { id: "mb-01", cat: "Placas base", marca: "ASUS ROG", nombre: "ROG Crosshair X870E Hero AM5 DDR5", precio: 42000, stock: 2, img: "assets/images/mb-01.png" },
    { id: "mb-02", cat: "Placas base", marca: "Gigabyte", nombre: "Gigabyte B550M DS3H AM4 DDR4 Micro-ATX", precio: 6900, stock: 8, img: "assets/images/mb-02.png" },
    { id: "mb-03", cat: "Placas base", marca: "ASUS", nombre: "ASUS TUF Gaming B550-PLUS WiFi II AM4 DDR4 ATX", precio: 12900, stock: 6, img: "assets/images/mb-03.png" },
    { id: "mb-04", cat: "Placas base", marca: "MSI", nombre: "MSI MAG B650 Tomahawk WiFi AM5 DDR5 ATX", precio: 15900, stock: 4, img: "assets/images/mb-04.png" },
    { id: "mb-05", cat: "Placas base", marca: "ASUS ROG", nombre: "ROG Strix B650E-F Gaming WiFi AM5 DDR5 ATX", precio: 21900, stock: 3, img: "assets/images/mb-05.png" },
    { id: "mb-06", cat: "Placas base", marca: "ASUS", nombre: "ASUS TUF Gaming B760-PLUS WiFi D4 LGA1700 DDR4 ATX", precio: 13900, stock: 5, img: "assets/images/mb-06.png" },
    { id: "mb-07", cat: "Placas base", marca: "MSI", nombre: "MSI MAG Z790 Tomahawk WiFi LGA1700 DDR5 ATX", precio: 18900, stock: 3, img: "assets/images/mb-07.png" },
    { id: "mb-08", cat: "Placas base", marca: "Gigabyte", nombre: "Gigabyte Z890 AORUS Elite WiFi7 LGA1851 DDR5 ATX", precio: 21900, stock: 2, nuevo: true, img: "assets/images/mb-08.png" },

    // MEMORIA RAM
    { id: "ram-01", cat: "Memoria RAM", marca: "Corsair", nombre: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200 MHz", precio: 5200, stock: 15, img: "assets/images/ram-01.png" },
    { id: "ram-02", cat: "Memoria RAM", marca: "Kingston", nombre: "Kingston FURY Beast 32GB (2x16GB) DDR4 3200 MHz", precio: 8900, oferta: 7500, stock: 6, img: "assets/images/ram-02.png" },
    { id: "ram-04", cat: "Memoria RAM", marca: "Corsair", nombre: "Dominator Titanium 64GB (2x32GB) DDR5", precio: 18000, stock: 4, img: "assets/images/ram-04.png" },
    { id: "ram-05", cat: "Memoria RAM", marca: "Corsair", nombre: "Corsair Vengeance 32GB (2x16GB) DDR5 6000 MHz CL30", precio: 9900, stock: 8, img: "assets/images/ram-05.png" },
    { id: "ram-06", cat: "Memoria RAM", marca: "G.Skill", nombre: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000 MHz CL30", precio: 11900, stock: 5, img: "assets/images/ram-06.png" },
    { id: "ram-07", cat: "Memoria RAM", marca: "Kingston", nombre: "Kingston FURY Beast 32GB (2x16GB) DDR5 6000 MHz", precio: 9500, stock: 7, img: "assets/images/ram-07.png" },
    { id: "ram-08", cat: "Memoria RAM", marca: "TeamGroup", nombre: "TeamGroup T-Force Delta RGB 16GB (2x8GB) DDR4 3200 MHz", precio: 5900, stock: 10, img: "assets/images/ram-08.png" },
    { id: "ram-09", cat: "Memoria RAM", marca: "Crucial", nombre: "Crucial Pro 32GB (2x16GB) DDR5 5600 MHz", precio: 8900, stock: 6, img: "assets/images/ram-09.png" },

    // ALMACENAMIENTO
    { id: "ssd-01", cat: "Almacenamiento", marca: "Western Digital", nombre: "WD Blue SN570 1TB SSD NVMe M.2", precio: 4300, oferta: 3700, stock: 20, img: "assets/images/ssd-01.png" },
    { id: "ssd-02", cat: "Almacenamiento", marca: "Samsung", nombre: "Samsung 980 PRO 1TB SSD NVMe PCIe 4.0", precio: 9800, stock: 2, img: "assets/images/ssd-02.png" },
    { id: "ssd-03", cat: "Almacenamiento", marca: "Samsung", nombre: "Samsung 9100 PRO 4TB NVMe PCIe 5.0", precio: 32000, stock: 3, img: "assets/images/ssd-03.png" },
    { id: "ssd-04", cat: "Almacenamiento", marca: "Crucial", nombre: "Crucial P3 Plus 1TB SSD NVMe PCIe 4.0 M.2", precio: 4900, stock: 14, img: "assets/images/ssd-04.png" },
    { id: "ssd-05", cat: "Almacenamiento", marca: "Western Digital", nombre: "WD Black SN850X 2TB SSD NVMe PCIe 4.0 M.2", precio: 13900, oferta: 11900, stock: 5, img: "assets/images/ssd-05.png" },
    { id: "ssd-06", cat: "Almacenamiento", marca: "Samsung", nombre: "Samsung 990 PRO 2TB SSD NVMe PCIe 4.0 M.2", precio: 16900, stock: 4, img: "assets/images/ssd-06.png" },
    { id: "ssd-07", cat: "Almacenamiento", marca: "Crucial", nombre: "Crucial MX500 1TB SSD SATA 2.5\"", precio: 6500, stock: 9, img: "assets/images/ssd-07.png" },
    { id: "hdd-01", cat: "Almacenamiento", marca: "Seagate", nombre: "Seagate BarraCuda 2TB Disco duro 3.5\" 7200 RPM", precio: 4900, stock: 12, img: "assets/images/hdd-01.png" },
    { id: "ext-01", cat: "Almacenamiento", marca: "Samsung", nombre: "Samsung T7 1TB SSD externo portátil USB 3.2", precio: 8900, stock: 6, img: "assets/images/ext-01.png" },

    // MONITORES
    { id: "mon-01", cat: "Monitores", marca: "AOC", nombre: "AOC 24G2 24\" Full HD IPS 144 Hz", precio: 14500, oferta: 12900, stock: 5, img: "assets/images/mon-01.png" },
    { id: "mon-02", cat: "Monitores", marca: "LG", nombre: "LG UltraGear 27GL850 27\" QHD Nano IPS 144 Hz", precio: 23900, stock: 0, img: "assets/images/mon-02.png" },
    { id: "mon-03", cat: "Monitores", marca: "ASUS ROG", nombre: "ROG Swift OLED PG32UCDM 32 pulgadas 4K 240Hz", precio: 65000, stock: 2, nuevo: true, img: "assets/images/mon-03.png" },
    { id: "mon-04", cat: "Monitores", marca: "Gigabyte", nombre: "Gigabyte G27F 2 27\" Full HD IPS 165 Hz", precio: 13900, stock: 6, img: "assets/images/mon-04.png" },
    { id: "mon-05", cat: "Monitores", marca: "ASUS", nombre: "ASUS TUF Gaming VG27AQ3A 27\" QHD IPS 180 Hz", precio: 21900, stock: 4, img: "assets/images/mon-05.png" },
    { id: "mon-06", cat: "Monitores", marca: "Samsung", nombre: "Samsung Odyssey G5 27\" QHD 144 Hz curvo", precio: 19900, stock: 5, img: "assets/images/mon-06.png" },
    { id: "mon-07", cat: "Monitores", marca: "LG", nombre: "LG UltraGear 27GR95QE 27\" OLED QHD 240 Hz", precio: 54900, stock: 2, nuevo: true, img: "assets/images/mon-07.png" },
    { id: "mon-08", cat: "Monitores", marca: "Alienware", nombre: "Alienware AW3423DWF 34\" QD-OLED ultrapanorámico 165 Hz", precio: 59900, stock: 2, img: "assets/images/mon-08.png" },

    // PERIFÉRICOS
    { id: "per-01", cat: "Periféricos", marca: "Redragon", nombre: "Redragon Kumara K552 Teclado mecánico TKL RGB", precio: 3600, oferta: 2900, stock: 12, nuevo: true, img: "assets/images/per-01.png" },
    { id: "per-02", cat: "Periféricos", marca: "Logitech", nombre: "Logitech G203 LIGHTSYNC Ratón gaming RGB", precio: 1900, stock: 30, img: "assets/images/per-02.png" },
    { id: "per-03", cat: "Periféricos", marca: "HyperX", nombre: "HyperX Cloud II Gaming Headset", precio: 4500, oferta: 3600, stock: 8, img: "assets/images/per-03.png" },
    { id: "per-04", cat: "Periféricos", marca: "Wooting", nombre: "Wooting 80HE Teclado gaming Hall Effect", precio: 15000, stock: 3, img: "assets/images/per-04.png" },
    { id: "per-05", cat: "Periféricos", marca: "Logitech G", nombre: "PRO X SUPERLIGHT 2 Ratón gaming inalámbrico", precio: 9500, stock: 4, img: "assets/images/per-05.png" },
    { id: "per-06", cat: "Periféricos", marca: "Audeze", nombre: "Maxwell Auriculares gaming inalámbricos", precio: 22000, stock: 2, img: "assets/images/per-06.png" },
    { id: "per-07", cat: "Periféricos", marca: "Logitech G", nombre: "Logitech G PRO X TKL LIGHTSPEED Teclado mecánico inalámbrico", precio: 14900, stock: 3, img: "assets/images/per-07.png" },
    { id: "per-08", cat: "Periféricos", marca: "Corsair", nombre: "Corsair K70 RGB PRO Teclado mecánico", precio: 11900, stock: 4, img: "assets/images/per-08.png" },
    { id: "per-09", cat: "Periféricos", marca: "Razer", nombre: "Razer BlackWidow V4 X Teclado mecánico RGB", precio: 9900, stock: 5, img: "assets/images/per-09.png" },
    { id: "per-10", cat: "Periféricos", marca: "Redragon", nombre: "Redragon K630 Dragonborn Teclado mecánico 60% RGB", precio: 3200, stock: 15, img: "assets/images/per-10.png" },
    { id: "per-11", cat: "Periféricos", marca: "Razer", nombre: "Razer DeathAdder V3 Ratón gaming ergonómico", precio: 6500, stock: 8, img: "assets/images/per-11.png" },
    { id: "per-12", cat: "Periféricos", marca: "Logitech G", nombre: "Logitech G502 HERO Ratón gaming", precio: 4500, oferta: 3700, stock: 14, img: "assets/images/per-12.png" },
    { id: "per-13", cat: "Periféricos", marca: "Razer", nombre: "Razer Viper V3 Pro Ratón gaming inalámbrico", precio: 12900, stock: 3, nuevo: true, img: "assets/images/per-13.png" },
    { id: "per-14", cat: "Periféricos", marca: "Redragon", nombre: "Redragon M711 Cobra Ratón gaming RGB", precio: 1600, stock: 25, img: "assets/images/per-14.png" },
    { id: "per-15", cat: "Periféricos", marca: "HyperX", nombre: "HyperX Cloud III Auriculares gaming", precio: 6900, stock: 7, img: "assets/images/per-15.png" },
    { id: "per-16", cat: "Periféricos", marca: "SteelSeries", nombre: "SteelSeries Arctis Nova 7 Auriculares gaming inalámbricos", precio: 14500, stock: 3, img: "assets/images/per-16.png" },
    { id: "per-17", cat: "Periféricos", marca: "Razer", nombre: "Razer BlackShark V2 X Auriculares gaming", precio: 4200, stock: 9, img: "assets/images/per-17.png" },

    // REFRIGERACIÓN
    { id: "cool-01", cat: "Refrigeración", marca: "ARCTIC", nombre: "Liquid Freezer III 360 A-RGB", precio: 11000, oferta: 9500, stock: 3, img: "assets/images/cool-01.png" },
    { id: "cool-02", cat: "Refrigeración", marca: "DeepCool", nombre: "DeepCool AK620 Disipador de aire doble torre", precio: 4900, stock: 8, img: "assets/images/cool-02.png" },
    { id: "cool-03", cat: "Refrigeración", marca: "Cooler Master", nombre: "Cooler Master Hyper 212 Black Edition Disipador de aire", precio: 2900, stock: 10, img: "assets/images/cool-03.png" },
    { id: "cool-04", cat: "Refrigeración", marca: "Noctua", nombre: "Noctua NH-D15 Disipador de aire doble torre", precio: 8900, stock: 3, img: "assets/images/cool-04.png" },
    { id: "cool-05", cat: "Refrigeración", marca: "ARCTIC", nombre: "ARCTIC Liquid Freezer III 240 A-RGB", precio: 8500, stock: 4, img: "assets/images/cool-05.png" },
    { id: "cool-06", cat: "Refrigeración", marca: "ARCTIC", nombre: "ARCTIC P12 PWM PST Ventiladores 120 mm (paquete de 5)", precio: 2400, stock: 12, img: "assets/images/cool-06.png" },

    // FUENTES DE ALIMENTACIÓN
   
    { id: "psu-01", cat: "Fuentes de alimentación", marca: "Seasonic", nombre: "PRIME TX-1300 Fuente 1300W 80 PLUS Titanium", precio: 24000, stock: 2, img: "assets/images/psu-01.png" },
    { id: "psu-02", cat: "Fuentes de alimentación", marca: "Corsair", nombre: "Corsair CV650 Fuente 650W 80 PLUS Bronze", precio: 4500, stock: 9, img: "assets/images/psu-02.png" },
    { id: "psu-03", cat: "Fuentes de alimentación", marca: "Corsair", nombre: "Corsair RM750e Fuente 750W 80 PLUS Gold modular", precio: 8900, oferta: 7900, stock: 6, img: "assets/images/psu-03.png" },
    { id: "psu-04", cat: "Fuentes de alimentación", marca: "MSI", nombre: "MSI MAG A650BN Fuente 650W 80 PLUS Bronze", precio: 4200, stock: 8, img: "assets/images/psu-04.png" },
    { id: "psu-05", cat: "Fuentes de alimentación", marca: "Cooler Master", nombre: "Cooler Master MWE Gold 850 V2 Full Modular Fuente 850W 80 PLUS Gold", precio: 8500, stock: 5, img: "assets/images/psu-05.png" },
    { id: "psu-06", cat: "Fuentes de alimentación", marca: "Seasonic", nombre: "Seasonic FOCUS GX-850 Fuente 850W 80 PLUS Gold modular", precio: 11500, stock: 4, img: "assets/images/psu-06.png" },

    // CAJAS PC
    { id: "case-01", cat: "Cajas PC", marca: "Lian Li", nombre: "O11D EVO RGB Torre gaming panorámica", precio: 16000, stock: 3, img: "assets/images/case-01.png" },
    { id: "case-02", cat: "Cajas PC", marca: "Corsair", nombre: "Corsair 4000D Airflow Torre media ATX", precio: 7900, oferta: 6900, stock: 7, img: "assets/images/case-02.png" },
    { id: "case-03", cat: "Cajas PC", marca: "NZXT", nombre: "NZXT H5 Flow Torre media ATX", precio: 7500, stock: 5, img: "assets/images/case-03.png" },
    { id: "case-04", cat: "Cajas PC", marca: "Cooler Master", nombre: "Cooler Master MasterBox Q300L Torre Micro-ATX", precio: 3500, stock: 9, img: "assets/images/case-04.png" },
    { id: "case-05", cat: "Cajas PC", marca: "Lian Li", nombre: "Lian Li LANCOOL 216 Torre media ATX", precio: 9900, stock: 4, img: "assets/images/case-05.png" },
    { id: "case-06", cat: "Cajas PC", marca: "Fractal Design", nombre: "Fractal Design North Torre media ATX", precio: 11900, stock: 3, img: "assets/images/case-06.png" },

    // CÁMARAS Y STREAMING
    { id: "cam-01", cat: "Cámaras y streaming", marca: "Elgato", nombre: "Facecam 4K Webcam Ultra HD 60 FPS", precio: 12000, stock: 4, img: "assets/images/cam-01.png" },
    { id: "cam-02", cat: "Cámaras y streaming", marca: "Elgato", nombre: "4K X Capturadora de vídeo HDMI", precio: 18000, stock: 2, img: "assets/images/cam-02.png" },
    { id: "cam-03", cat: "Cámaras y streaming", marca: "Logitech", nombre: "Logitech C920 HD Pro Webcam Full HD 1080p", precio: 3900, stock: 12, img: "assets/images/cam-03.png" },
    { id: "cam-04", cat: "Cámaras y streaming", marca: "Logitech", nombre: "Logitech StreamCam Webcam Full HD 1080p 60 fps", precio: 7900, stock: 5, img: "assets/images/cam-04.png" },
    { id: "cam-05", cat: "Cámaras y streaming", marca: "Elgato", nombre: "Elgato HD60 X Capturadora de vídeo 4K HDR", precio: 10900, stock: 4, img: "assets/images/cam-05.png" },

    // AUDIO
    { id: "aud-01", cat: "Audio", marca: "Shure", nombre: "SM7dB Micrófono dinámico para streaming", precio: 35000, stock: 2, img: "assets/images/aud-01.png" },
    { id: "aud-02", cat: "Audio", marca: "Blue", nombre: "Blue Yeti Micrófono USB de condensador", precio: 6500, oferta: 5500, stock: 8, img: "assets/images/aud-02.png" },
    { id: "aud-03", cat: "Audio", marca: "HyperX", nombre: "HyperX QuadCast S Micrófono USB RGB", precio: 7900, stock: 5, img: "assets/images/aud-03.png" },
    { id: "aud-04", cat: "Audio", marca: "Elgato", nombre: "Elgato Wave:3 Micrófono de condensador USB", precio: 9900, stock: 4, img: "assets/images/aud-04.png" },
    { id: "aud-05", cat: "Audio", marca: "Edifier", nombre: "Edifier R1280DB Altavoces Bluetooth 2.0", precio: 5900, stock: 6, img: "assets/images/aud-05.png" },

    // ACCESORIOS GAMER
    { id: "acc-01", cat: "Accesorios gamer", marca: "Elgato", nombre: "Key Light Iluminación LED para streaming", precio: 12000, stock: 3, img: "assets/images/acc-01.png" },
    { id: "acc-02", cat: "Accesorios gamer", marca: "SteelSeries", nombre: "SteelSeries QcK Heavy XXL Alfombrilla para ratón", precio: 2900, stock: 10, img: "assets/images/acc-02.png" },
    { id: "acc-03", cat: "Accesorios gamer", marca: "Razer", nombre: "Razer Gigantus V2 XXL Alfombrilla para ratón", precio: 2400, stock: 12, img: "assets/images/acc-03.png" },
    { id: "acc-04", cat: "Accesorios gamer", marca: "Microsoft", nombre: "Xbox Wireless Controller Control inalámbrico", precio: 4900, oferta: 4200, stock: 8, img: "assets/images/acc-04.png" },
    { id: "acc-05", cat: "Accesorios gamer", marca: "Sony", nombre: "Sony DualSense Control inalámbrico para PS5", precio: 5500, stock: 6, img: "assets/images/acc-05.png" },
    { id: "acc-06", cat: "Accesorios gamer", marca: "Elgato", nombre: "Elgato Wave Mic Arm LP Brazo de micrófono de perfil bajo", precio: 4500, stock: 5, img: "assets/images/acc-06.png" },

    // FIGURAS 3D
    { id: "fig-01", cat: "Figuras 3D", marca: "Decoración gamer", nombre: "Figura 3D de dragón RGB para setup gamer", precio: 2500, stock: 5, img: "assets/images/fig-01.png" },
    { id: "fig-02", cat: "Figuras 3D", marca: "Decoración gamer", nombre: "Figura 3D de robot articulado para setup gamer", precio: 2200, stock: 6, img: "assets/images/fig-02.png" },
    { id: "fig-03", cat: "Figuras 3D", marca: "Decoración gamer", nombre: "Lámpara 3D de calavera con luz RGB para setup gamer", precio: 2800, stock: 4, img: "assets/images/fig-03.png" },

   //camara streaming//

   { id: "str-01", cat: "Cámaras y streaming", marca: "Elgato", nombre: "Stream Deck XL Controlador de 32 teclas", precio: 14000, stock: 3, img: "assets/images/str-01.png" },
  ]
};
