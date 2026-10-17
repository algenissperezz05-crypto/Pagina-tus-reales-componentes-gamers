(() => {
  "use strict";
  const grid = document.getElementById("grid");
  if (!window.CATALOGO) { grid.textContent = "No se pudo cargar el catálogo. Comprueba que exista js/data.js."; return; }
  const { moneda, categorias, productos } = window.CATALOGO;

  /* UTILIDADES */
  const $ = (s, el = document) => el.querySelector(s);
  const fmt = n => `${moneda} ${n.toLocaleString("es-DO")}`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento disponible */ } }
  };
  const ICONOS = {
    "Tarjetas gráficas": '<rect x="6" y="20" width="52" height="24" rx="3"/><circle cx="22" cy="32" r="7"/><circle cx="42" cy="32" r="7"/><path d="M10 44v6h12v-6"/>',
    "Procesadores": '<rect x="16" y="16" width="32" height="32" rx="3"/><rect x="25" y="25" width="14" height="14"/><path d="M24 8v8M32 8v8M40 8v8M24 48v8M32 48v8M40 48v8M8 24h8M8 32h8M8 40h8M48 24h8M48 32h8M48 40h8"/>',
    "Memoria RAM": '<rect x="4" y="20" width="56" height="20" rx="2"/><path d="M12 25h8v10h-8zM28 25h8v10h-8zM44 25h8v10h-8zM4 46h12M24 46h36"/>',
    "Almacenamiento": '<rect x="10" y="12" width="44" height="40" rx="4"/><circle cx="32" cy="32" r="9"/><circle cx="32" cy="32" r="2"/>',
    "Monitores": '<rect x="6" y="10" width="52" height="34" rx="3"/><path d="M26 44l-3 10h18l-3-10M20 54h24"/>',
    "Periféricos": '<rect x="4" y="22" width="56" height="22" rx="3"/><path d="M10 28h4M18 28h4M26 28h4M34 28h4M42 28h4M50 28h4M10 34h4M18 34h4M26 34h20M50 34h4"/>',
    "Placas base": '<rect x="8" y="8" width="48" height="48" rx="3"/><rect x="16" y="16" width="14" height="14"/><path d="M38 16h10M38 22h10M16 40h32M16 48h20"/><circle cx="44" cy="46" r="3"/>',
    "Refrigeración": '<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="4"/><path d="M32 28c0-8 6-12 10-10M36 32c8 0 12 6 10 10M32 36c0 8-6 12-10 10M28 32c-8 0-12-6-10-10"/>',
    "Fuentes de alimentación": '<rect x="8" y="16" width="48" height="32" rx="3"/><circle cx="24" cy="32" r="9"/><path d="M26 25l-5 8h6l-4 7M40 26h10M40 32h10M40 38h10"/>',
    "Cajas PC": '<rect x="14" y="6" width="36" height="52" rx="3"/><circle cx="32" cy="22" r="7"/><path d="M22 40h20M22 46h20M22 52h8"/>',
    "Cámaras y streaming": '<circle cx="32" cy="28" r="14"/><circle cx="32" cy="28" r="6"/><path d="M24 44v8h16v-8M20 56h24"/>',
    "Audio": '<path d="M12 38v-6a20 20 0 0 1 40 0v6"/><rect x="8" y="36" width="10" height="16" rx="3"/><rect x="46" y="36" width="10" height="16" rx="3"/>',
    "Accesorios gamer": '<rect x="8" y="22" width="48" height="24" rx="12"/><path d="M20 30v8M16 34h8M42 31h2M46 37h2"/>',
    "Figuras 3D": '<path d="M32 8l22 12v24L32 56 10 44V20z"/><path d="M10 20l22 12 22-12M32 32v24"/>'
  };
  const icono = cat => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[cat] || ""}</svg>`;

  /* ESTADO: carrito y favoritos se guardan en el navegador */
  const porId = new Map(productos.map(p => [p.id, p]));
  let carrito = store.get("trcg.carrito", {});
  if (!carrito || typeof carrito !== "object" || Array.isArray(carrito)) carrito = {};
  for (const [id, q] of Object.entries(carrito)) {
    const p = porId.get(id);
    if (!p || p.stock < 1 || !Number.isInteger(q) || q < 1) delete carrito[id];
    else carrito[id] = Math.min(q, p.stock);
  }
  const favsGuardados = store.get("trcg.favs", []);
  const favs = new Set(Array.isArray(favsGuardados) ? favsGuardados.filter(id => porId.has(id)) : []);
  const tope = Math.ceil(Math.max(...productos.map(p => p.precio)) / 1000) * 1000;
  const filtro = { q: "", cat: "Todas", marca: "Todas", max: tope, stock: false, favs: false, orden: "relevancia" };

  /* CATÁLOGO: filtrar, ordenar y pintar */
  function visibles() {
    const q = norm(filtro.q.trim());
    const l = productos.filter(p =>
      (filtro.cat === "Todas" || p.cat === filtro.cat) &&
      (filtro.marca === "Todas" || p.marca === filtro.marca) &&
      p.precio <= filtro.max &&
      (!filtro.stock || p.stock > 0) &&
      (!filtro.favs || favs.has(p.id)) &&
      (!q || norm(`${p.nombre} ${p.marca} ${p.cat}`).includes(q)));
    const cmp = {
      "precio-asc": (a, b) => a.precio - b.precio,
      "precio-desc": (a, b) => b.precio - a.precio,
      "nombre": (a, b) => a.nombre.localeCompare(b.nombre, "es"),
      "novedad": (a, b) => Number(!!b.nuevo) - Number(!!a.nuevo)
    }[filtro.orden];
    return cmp ? l.sort(cmp) : l;
  }
  function tarjeta(p) {
    const agot = p.stock < 1, fav = favs.has(p.id);
    const foto = p.img ? `<img src="${esc(p.img)}" alt="${esc(p.nombre)}" loading="lazy">` : `${icono(p.cat)}<small>Imagen de ejemplo</small>`;
    return `<article class="card" data-id="${esc(p.id)}">
      <div class="img">${foto}${agot ? '<span class="tag out">Agotado</span>' : p.nuevo ? '<span class="tag">Nuevo</span>' : ""}<span class="ojo" aria-hidden="true">Ver detalles</span></div>
      <div class="info"><p class="meta">${esc(p.marca)}</p><h3><button class="ver" type="button" data-ver="${esc(p.id)}">${esc(p.nombre)}</button></h3><p class="price">${fmt(p.precio)}</p>
        <p class="stock ${agot ? "no" : ""}">${agot ? "Sin existencias" : `${p.stock} disponibles`}</p></div>
      <div class="acc">
        <button class="btn" type="button" data-add="${esc(p.id)}" ${agot ? "disabled" : ""}>Agregar al carrito</button>
        <button class="fav" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de" : "Agregar a"} favoritos: ${esc(p.nombre)}">${fav ? "♥" : "♡"}</button>
      </div></article>`;
  }
  /* Animación de entrada: solo las tarjetas nuevas; si cambia categoría, marca, orden o favoritos, entran todas */
  let previos = new Set(), ultimaVista = "";
  function render() {
    const l = visibles();
    $("#resumen").textContent = `${l.length} ${l.length === 1 ? "producto" : "productos"}`;
    const sinFavs = filtro.favs && !favs.size;
    grid.innerHTML = l.length ? l.map(tarjeta).join("") :
      `<div class="vacio"><p>${sinFavs ? "Aún no tienes favoritos. Toca el corazón de un producto para guardarlo." : "Ningún producto coincide con tu búsqueda o filtros."}</p><button class="btn ghost" type="button" id="vacio-limpiar">Limpiar filtros</button></div>`;
    const vista = [filtro.cat, filtro.marca, filtro.orden, filtro.favs].join("|");
    if (vista !== ultimaVista) previos = new Set();
    ultimaVista = vista;
    let n = 0;
    grid.querySelectorAll(".card").forEach(c => {
      if (previos.has(c.dataset.id)) return;
      c.style.setProperty("--i", n++);
      c.classList.add("entra");
    });
    previos = new Set(l.map(p => p.id));
  }
  function limpiarFiltros() {
    Object.assign(filtro, { q: "", cat: "Todas", marca: "Todas", max: tope, stock: false, favs: false, orden: "relevancia" });
    $("#q").value = ""; $("#f-marca").value = "Todas"; $("#f-precio").value = tope;
    $("#f-stock").checked = false; $("#orden").value = "relevancia";
    $("#btn-fav").setAttribute("aria-pressed", "false");
    pintarChips(); $("#o-precio").textContent = fmt(tope); render();
  }
  const pintarChips = () => document.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === filtro.cat));

  /* AVISOS */
  function aviso(msg, error = false) {
    const t = document.createElement("p");
    t.className = "toast" + (error ? " err" : "");
    t.textContent = msg;
    $("#toasts").append(t);
    setTimeout(() => t.classList.add("sale"), 2900);
    setTimeout(() => t.remove(), 3200);
  }

  /* FAVORITOS: actualiza todos los corazones del producto (tarjeta y ficha) */
  function alternarFav(id) {
    favs.has(id) ? favs.delete(id) : favs.add(id);
    store.set("trcg.favs", [...favs]);
    $("#n-fav").textContent = favs.size;
    const on = favs.has(id);
    if (filtro.favs) render();
    document.querySelectorAll(`[data-fav="${CSS.escape(id)}"]`).forEach(btn => {
      btn.setAttribute("aria-pressed", on);
      btn.setAttribute("aria-label", `${on ? "Quitar de" : "Agregar a"} favoritos: ${porId.get(id).nombre}`);
      btn.textContent = btn.classList.contains("fav-txt") ? (on ? "♥ En favoritos" : "♡ Guardar") : (on ? "♥" : "♡");
      btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
    });
    aviso(on ? "Guardado en favoritos." : "Quitado de favoritos.");
  }

  /* CARRITO */
  function pintarCarrito() {
    const ids = Object.keys(carrito);
    $("#n-cart").textContent = ids.reduce((s, id) => s + carrito[id], 0);
    $("#total").textContent = fmt(ids.reduce((s, id) => s + carrito[id] * porId.get(id).precio, 0));
    $("#vacio").hidden = ids.length > 0;
    $("#vaciar").disabled = !ids.length;
    $("#pagar").disabled = !ids.length;
    $("#lista-cart").innerHTML = ids.map(id => {
      const p = porId.get(id), q = carrito[id];
      return `<li class="line"><div class="mini">${p.img ? `<img src="${esc(p.img)}" alt="">` : icono(p.cat)}</div>
        <div><p class="n">${esc(p.nombre)}</p><p class="u">${fmt(p.precio)} c/u</p>
          <div class="qty"><button type="button" data-q="${esc(id)}" data-d="-1" aria-label="Quitar una unidad de ${esc(p.nombre)}">−</button><output>${q}</output><button type="button" data-q="${esc(id)}" data-d="1" aria-label="Agregar una unidad de ${esc(p.nombre)}" ${q >= p.stock ? "disabled" : ""}>+</button></div></div>
        <div class="r"><p class="sub">${fmt(p.precio * q)}</p><button class="link" type="button" data-rm="${esc(id)}">Eliminar</button></div></li>`;
    }).join("");
  }
  function guardarCarrito() { store.set("trcg.carrito", carrito); pintarCarrito(); }
  /* Agrega "cantidad" unidades (por defecto 1). Devuelve true si se agregó algo. */
  function agregar(id, cantidad = 1, origen = null) {
    const p = porId.get(id); if (!p) return false;
    const actual = carrito[id] || 0;
    if (p.stock < 1) { aviso("Este producto está agotado.", true); return false; }
    if (actual >= p.stock) { aviso(`Solo hay ${p.stock} disponibles de este producto.`, true); return false; }
    const nuevo = Math.min(actual + cantidad, p.stock), sumadas = nuevo - actual;
    carrito[id] = nuevo; guardarCarrito();
    aviso(sumadas < cantidad
      ? `Solo se pudieron agregar ${sumadas}: el máximo disponible es ${p.stock}.`
      : `${sumadas > 1 ? sumadas + " × " : ""}${p.nombre} se agregó al carrito.`);
    const n = $("#n-cart"); n.classList.remove("pulse"); void n.offsetWidth; n.classList.add("pulse");
    document.dispatchEvent(new CustomEvent("trcg:agregado", { detail: { id, origen } }));
    return true;
  }
  const itemsCarrito = () => Object.entries(carrito).map(([id, cantidad]) => ({ id, cantidad }));
  function quitar(id) { delete carrito[id]; guardarCarrito(); $("#cerrar").focus(); }
  function cambiar(id, d) {
    const p = porId.get(id), q = (carrito[id] || 0) + d;
    if (q < 1) return quitar(id);
    if (q > p.stock) return aviso(`Solo hay ${p.stock} disponibles de este producto.`, true);
    carrito[id] = q; guardarCarrito();
    ($(`[data-q="${id}"][data-d="${d}"]:not(:disabled)`) || $(`[data-q="${id}"]:not(:disabled)`))?.focus();
  }
  const drawer = $("#carrito"), velo = $("#velo"), btnCart = $("#btn-cart");
  function abrir(v) {
    drawer.classList.toggle("open", v); velo.classList.toggle("open", v);
    btnCart.setAttribute("aria-expanded", v); document.body.classList.toggle("lock", v);
    (v ? $("#cerrar") : btnCart).focus();
  }

  /* EVENTOS */
  grid.addEventListener("click", e => {
    const a = e.target.closest("[data-add]"), f = e.target.closest("[data-fav]");
    if (a) agregar(a.dataset.add, 1, a);
    else if (f) alternarFav(f.dataset.fav);
    else if (e.target.id === "vacio-limpiar") limpiarFiltros();
    else {
      /* clic en cualquier parte de la tarjeta (imagen, nombre...) abre la ficha del producto */
      const c = e.target.closest(".card");
      if (c) document.dispatchEvent(new CustomEvent("trcg:ver", { detail: { id: c.dataset.id, origen: c } }));
    }
  });
  $("#pagar").onclick = () => {
    abrir(false);
    document.dispatchEvent(new CustomEvent("trcg:comprar", { detail: { items: itemsCarrito(), desdeCarrito: true } }));
  };
  $("#lista-cart").addEventListener("click", e => {
    const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]");
    if (q) cambiar(q.dataset.q, Number(q.dataset.d));
    else if (r) quitar(r.dataset.rm);
  });
  $("#vaciar").onclick = () => { if (confirm("¿Vaciar todo el carrito?")) { carrito = {}; guardarCarrito(); aviso("Carrito vacío."); } };
  btnCart.onclick = () => abrir(true);
  $("#cerrar").onclick = velo.onclick = () => abrir(false);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("open")) abrir(false); });
  drawer.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;
    const f = [...drawer.querySelectorAll("button:not(:disabled)")], first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $("#busqueda").addEventListener("submit", e => e.preventDefault());
  $("#q").addEventListener("input", e => { filtro.q = e.target.value; render(); });
  $("#f-marca").onchange = e => { filtro.marca = e.target.value; render(); };
  $("#f-precio").oninput = e => { filtro.max = Number(e.target.value); $("#o-precio").textContent = fmt(filtro.max); render(); };
  $("#f-stock").onchange = e => { filtro.stock = e.target.checked; render(); };
  $("#orden").onchange = e => { filtro.orden = e.target.value; render(); };
  $("#f-limpiar").onclick = limpiarFiltros;
  $("#btn-fav").onclick = e => {
    filtro.favs = !filtro.favs;
    e.currentTarget.setAttribute("aria-pressed", filtro.favs);
    render();
    if (filtro.favs) $("#catalogo").scrollIntoView();
  };
  $("#cats").addEventListener("click", e => {
  const c = e.target.closest("[data-cat]");
  if (!c) return;

  filtro.cat = c.dataset.cat;
  pintarChips();
  render();
  irACatalogo();
});

  /* Si una imagen no carga, se muestra el icono de la categoría */
  document.addEventListener("error", e => {
    const im = e.target;
    if (!(im instanceof HTMLImageElement) || !im.closest(".img, .mini, .pf-img")) return;
    const p = productos.find(x => im.getAttribute("src") === x.img);
    im.replaceWith(Object.assign(document.createElement("span"), { innerHTML: icono(p ? p.cat : "") }).firstChild);
  }, true);

  /* MENÚ PRINCIPAL */
  const menu = $("#menu"), menuBtn = $("#menu-toggle"), subBtn = $("#menu-cats"), sub = $("#sub-cats");
  function abrirMenu(v) { menu.classList.toggle("open", v); menuBtn.setAttribute("aria-expanded", v); }
  function abrirSub(v) { sub.hidden = !v; subBtn.setAttribute("aria-expanded", v); }
  function irACatalogo() {
  $("#catalogo").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
  sub.innerHTML = ["Todas", ...categorias].map(c => `<li><button type="button" data-menu-cat="${esc(c)}">${esc(c)}</button></li>`).join("");
  menuBtn.onclick = () => abrirMenu(!menu.classList.contains("open"));
  subBtn.onclick = () => abrirSub(sub.hidden);
  sub.addEventListener("click", e => {
    const b = e.target.closest("[data-menu-cat]"); if (!b) return;
    filtro.cat = b.dataset.menuCat; pintarChips(); render();
    abrirSub(false); abrirMenu(false); irACatalogo();
  });
  $("#menu-novedades").addEventListener("click", () => {
    filtro.orden = "novedad"; $("#orden").value = "novedad"; render();
  });
  menu.addEventListener("click", e => { if (e.target.closest("a")) { abrirSub(false); abrirMenu(false); } });
  document.addEventListener("click", e => { if (!e.target.closest(".has-sub")) abrirSub(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { abrirSub(false); abrirMenu(false); } });

  /* INICIO */
  $("#cats").innerHTML = ["Todas", ...categorias].map(c => `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${c === "Todas"}">${esc(c)}</button>`).join("");
  $("#f-marca").innerHTML = ["Todas", ...new Set(productos.map(p => p.marca))].map(m => `<option>${esc(m)}</option>`).join("");
  const rango = $("#f-precio"); rango.min = 0; rango.max = tope; rango.value = tope;
  $("#o-precio").textContent = fmt(tope);
  $("#n-fav").textContent = favs.size;
  if (matchMedia("(max-width: 899px)").matches) $("#det-filtros").open = false;
  pintarCarrito(); render();

  /* API para los demás módulos (ficha de producto, compra y efectos) */
  window.TRCG = {
    productos, categorias, porId, fmt, esc, icono, aviso,
    agregar, alternarFav,
    esFav: id => favs.has(id),
    itemsCarrito,
    quitarDelCarrito: ids => { ids.forEach(id => delete carrito[id]); guardarCarrito(); },
    abrirCarrito: () => abrir(true),
    verCategoria: cat => { filtro.cat = cat; pintarChips(); render(); irACatalogo(); },
    verMarca: m => { filtro.marca = m; $("#f-marca").value = m; render(); irACatalogo(); }
  };
  document.dispatchEvent(new CustomEvent("trcg:listo"));
})();
