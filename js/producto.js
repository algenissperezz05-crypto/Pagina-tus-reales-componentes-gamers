/* FICHA DE PRODUCTO: al tocar un producto (o un combo) se abre una ventana con foto, datos, características,
   cantidad, "Añadir al carrito", "Comprar ahora", favoritos y productos relacionados.
   Los textos salen de js/fichas.js; precio, marca, categoría y existencias salen de js/data.js; los combos, de js/combos.js. */
(() => {
  "use strict";
  const T = window.TRCG, M = T && T.modal;
  const dlg = document.getElementById("ficha"), cuerpo = document.getElementById("ficha-cuerpo");
  if (!T || !M || !dlg || !cuerpo) return;
  const { esc, fmt, porId, icono } = T;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conMouse = matchMedia("(hover: hover)").matches;
  let id = null, cant = 1, origen = null, deCombo = null; // deCombo: combo desde el que se abrió una pieza (para "Volver al combo")

  const enCarrito = i => (T.itemsCarrito().find(x => x.id === i) || {}).cantidad || 0;
  const relacionados = p => {
    if (p.combo) return T.combos.filter(x => x.id !== p.id).slice(0, 4);
    const otros = T.productos.filter(x => x.id !== p.id);
    return [...otros.filter(x => x.cat === p.cat), ...otros.filter(x => x.cat !== p.cat && x.marca === p.marca)].slice(0, 4);
  };
  const miniatura = p => p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy" decoding="async">` : icono(p.cat);

  /* Precio grande de la ficha: con oferta, muestra el normal tachado */
  const precioFicha = p => p.dto
    ? `<p class="pf-precio"><span class="sr">Precio actual: </span>${fmt(p.venta)} <s class="antes"><span class="sr">Precio anterior: </span>${fmt(p.precio)}</s></p>`
    : `<p class="pf-precio">${fmt(p.venta)}</p>`;

  function infoStock(p) {
    const agot = p.stock < 1, poco = !agot && p.stock <= 3, n = p.stock;
    const txt = agot ? "Sin existencias por ahora"
      : p.combo ? (poco ? `¡Quedan pocos! Solo ${n} combo${n === 1 ? "" : "s"} disponible${n === 1 ? "" : "s"}` : `${n} combos disponibles`)
      : (poco ? `¡Quedan pocas! Solo ${n} disponible${n === 1 ? "" : "s"}` : `${n} disponibles`);
    return { agot, txt, cls: agot ? "no" : poco ? "poco" : "" };
  }

  /* Cantidad, total y botones de compra (iguales para productos y combos) */
  function panelCompra(p, agot) {
    const fav = T.esFav(p.id);
    return `<div class="pf-compra">
          <div class="pf-fila">
            <div class="qty" role="group" aria-label="Cantidad">
              <button type="button" data-pf-menos aria-label="Quitar una unidad" disabled>−</button>
              <output id="pf-cant">1</output>
              <button type="button" data-pf-mas aria-label="Agregar una unidad" ${p.stock <= 1 ? "disabled" : ""}>+</button>
            </div>
            <p class="pf-total">Total: <b id="pf-total">${fmt(p.venta)}</b></p>
          </div>
          <div class="pf-botones">
            <button class="btn brillo" type="button" data-pf-add ${agot ? "disabled" : ""}>${p.combo ? "Añadir combo al carrito" : "Añadir al carrito"}</button>
            <button class="btn violeta" type="button" data-pf-comprar ${agot ? "disabled" : ""}>Comprar ahora</button>
          </div>
          ${p.combo ? "" : `<button class="btn ghost fav-txt" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de" : "Agregar a"} favoritos: ${esc(p.nombre)}">${fav ? "♥ En favoritos" : "♡ Guardar"}</button>`}
          <p class="pf-aviso" id="pf-carrito" aria-live="polite"></p>
          <p class="pf-nota">${p.combo ? "Precios, piezas y existencias de referencia: la tienda confirma disponibilidad y compatibilidad al recibir tu pedido." : "Precio y existencias de referencia: la tienda los confirma al recibir tu pedido."}</p>
        </div>`;
  }

  /* "También te puede interesar" (en un combo: los otros combos) */
  function seccionRelacionados(p) {
    const rel = relacionados(p);
    if (!rel.length) return "";
    return `<section class="pf-rel" aria-labelledby="pf-rel-t"><h3 id="pf-rel-t">${p.combo ? "Otros combos" : "También te puede interesar"}</h3><ul>${rel.map(r =>
      `<li><button type="button" data-rel="${esc(r.id)}"><span class="mini">${miniatura(r)}</span><span class="pf-rel-n">${esc(r.nombre)}</span><b>${fmt(r.venta)}</b></button></li>`).join("")}</ul></section>`;
  }

  /* Ficha de un producto */
  function htmlProducto(p) {
    const f = (window.FICHAS || {})[p.id] || {};
    const desc = f.desc || (window.FICHAS_CAT || {})[p.cat] || `${p.nombre}, de la marca ${p.marca}.`;
    const filas = [["Marca", p.marca], ["Categoría", p.cat], ...(f.specs || []), ["Código", p.id.toUpperCase()]];
    const s = infoStock(p);
    const foto = p.img ? `<img src="${esc(p.img)}" alt="${esc(p.nombre)}" decoding="async">` : icono(p.cat);
    const combo = deCombo && porId.get(deCombo);
    return `<article class="pf" data-id="${esc(p.id)}">
      <button class="mx" type="button" data-cerrar aria-label="Cerrar la ficha del producto">✕</button>
      <div class="pf-img"><div class="pf-foto">${foto}</div>${s.agot ? '<span class="tag out">Agotado</span>' : p.nuevo ? '<span class="tag">Nuevo</span>' : ""}${p.dto && !s.agot ? `<span class="tag dto">−${p.dto}%<span class="sr"> de descuento</span></span>` : ""}</div>
      <div class="pf-info">
        ${combo ? `<p class="pf-volver"><button class="link" type="button" data-volver-combo>← Volver a ${esc(combo.nombre)}</button></p>` : ""}
        <p class="pf-meta"><button type="button" data-marca="${esc(p.marca)}">${esc(p.marca)}</button><button type="button" data-cat="${esc(p.cat)}">${esc(p.cat)}</button></p>
        <h2 id="pf-nombre">${esc(p.nombre)}</h2>
        ${precioFicha(p)}
        <p class="pf-stock ${s.cls}">${s.txt}</p>
        <p class="pf-desc">${esc(desc)}</p>
        ${panelCompra(p, s.agot)}
        <dl class="pf-specs">${filas.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </div>
      ${seccionRelacionados(p)}
    </article>`;
  }

  /* Ficha de un combo: lo que incluye, el ahorro y las mismas opciones de compra */
  function htmlCombo(p) {
    const s = infoStock(p);
    const piezas = p.items.map(i => porId.get(i));
    const foto = p.img ? `<img src="${esc(p.img)}" alt="${esc(p.nombre)}" decoding="async">` : icono("Combos");
    return `<article class="pf pf-combo" data-id="${esc(p.id)}">
      <button class="mx" type="button" data-cerrar aria-label="Cerrar la ficha del combo">✕</button>
      <div class="pf-img"><div class="pf-foto">${foto}</div>${s.agot ? '<span class="tag out">Agotado</span>' : ""}${p.dto && !s.agot ? `<span class="tag dto">−${p.dto}%<span class="sr"> de descuento</span></span>` : ""}
        <p class="pf-nivel">${esc(p.etiqueta)}<small>${piezas.length} piezas incluidas</small></p></div>
      <div class="pf-info">
        <p class="pf-meta"><span class="pf-chip">PC completa</span><span class="pf-chip">${esc(p.etiqueta)}</span></p>
        <h2 id="pf-nombre">${esc(p.nombre)}</h2>
        ${precioFicha(p)}
        ${p.dto ? `<p class="pf-ahorro">Ahorras <b>${fmt(p.ahorro)}</b> (${p.dto}%) frente a comprar las piezas por separado</p>` : ""}
        <p class="pf-stock ${s.cls}">${s.txt}</p>
        <p class="pf-desc">${esc([p.lema, p.nota].filter(Boolean).join(" "))}</p>
        ${panelCompra(p, s.agot)}
        <h3 class="pf-sub">Qué incluye</h3>
        <ul class="pf-piezas">${piezas.map(x => `<li><button type="button" data-pieza="${esc(x.id)}" aria-label="Ver ${esc(x.nombre)}">
          <span class="mini">${miniatura(x)}</span><span class="pz-n"><b>${esc(x.nombre)}</b><small>${esc(x.cat)}${x.dto ? " · en oferta" : ""}</small></span><span class="pz-p">${fmt(x.venta)}</span></button></li>`).join("")}</ul>
        <p class="pf-suma"><span>Piezas por separado</span><b>${fmt(p.precio)}</b></p>
      </div>
      ${seccionRelacionados(p)}
    </article>`;
  }

  /* Dibuja la ficha dentro de la ventana */
  function pintar(nuevo) {
    const p = porId.get(nuevo); if (!p) return;
    id = p.id; cant = 1;
    cuerpo.innerHTML = p.combo ? htmlCombo(p) : htmlProducto(p);
    [...cuerpo.querySelector(".pf-info").children].forEach((el, i) => el.style.setProperty("--k", i));
    cuerpo.scrollTop = 0;
    actualizarCarrito();
    inclinar();
  }

  /* "Ya tienes N en tu carrito" */
  function actualizarCarrito() {
    const el = cuerpo.querySelector("#pf-carrito"); if (!el) return;
    const n = enCarrito(id);
    el.innerHTML = n ? `Ya tienes <b>${n}</b> en tu carrito. <button class="link" type="button" data-pf-vercarrito>Ver carrito</button>` : "";
  }

  function actualizarCantidad() {
    const p = porId.get(id);
    cuerpo.querySelector("#pf-cant").textContent = cant;
    const t = cuerpo.querySelector("#pf-total");
    t.textContent = fmt(p.venta * cant);
    t.classList.remove("pulse"); void t.offsetWidth; t.classList.add("pulse");
    const menos = cuerpo.querySelector("[data-pf-menos]"), mas = cuerpo.querySelector("[data-pf-mas]");
    menos.disabled = cant <= 1; mas.disabled = cant >= p.stock;
    const a = document.activeElement;
    if (a && a.disabled && (a === menos || a === mas)) (a === mas ? menos : mas).focus(); // el foco no se pierde
  }

  /* Botón "Añadido" un instante */
  function destello(b) {
    const t = b.textContent;
    b.textContent = "✓ Añadido"; b.classList.add("listo");
    setTimeout(() => { if (b.isConnected) { b.textContent = t; b.classList.remove("listo"); } }, 1400);
  }

  /* La foto se inclina un poco hacia el cursor y una luz la sigue (solo con mouse; un cálculo por cuadro) */
  function inclinar() {
    const el = cuerpo.querySelector(".pf-img");
    if (!el || reducido || !conMouse) return;
    let raf = 0, ev = null;
    el.addEventListener("pointermove", e => {
      ev = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
        el.style.setProperty("--ry", (x * 16).toFixed(1) + "deg");
        el.style.setProperty("--rx", (-y * 16).toFixed(1) + "deg");
        el.style.setProperty("--gx", ((x + .5) * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", ((y + .5) * 100).toFixed(1) + "%");
      });
    });
    el.addEventListener("pointerleave", () => { el.style.removeProperty("--rx"); el.style.removeProperty("--ry"); });
  }

  function comprarAhora(p) {
    M.cerrar(dlg, true);
    document.dispatchEvent(new CustomEvent("trcg:comprar", { detail: { items: [{ id: p.id, cantidad: cant }], desdeCarrito: false, origen } }));
  }

  cuerpo.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || !id) return;
    const p = porId.get(id);
    if (b.hasAttribute("data-pf-menos")) { cant = Math.max(1, cant - 1); actualizarCantidad(); }
    else if (b.hasAttribute("data-pf-mas")) { cant = Math.min(p.stock, cant + 1); actualizarCantidad(); }
    else if (b.hasAttribute("data-pf-add")) { if (T.agregar(p.id, cant, b)) { destello(b); actualizarCarrito(); } }
    else if (b.hasAttribute("data-pf-comprar")) comprarAhora(p);
    else if (b.hasAttribute("data-pf-vercarrito")) { M.cerrar(dlg, true); setTimeout(T.abrirCarrito, 30); }
    else if (b.dataset.fav) T.alternarFav(b.dataset.fav);
    else if (b.dataset.pieza) { deCombo = p.combo ? p.id : null; pintar(b.dataset.pieza); }      // pieza de un combo
    else if (b.hasAttribute("data-volver-combo")) { const c = deCombo; deCombo = null; if (c) pintar(c); }
    else if (b.dataset.rel) { deCombo = null; pintar(b.dataset.rel); }
    else if (b.dataset.marca) { M.cerrar(dlg, true); setTimeout(() => T.verMarca(b.dataset.marca), 30); }
    else if (b.dataset.cat) { M.cerrar(dlg, true); setTimeout(() => T.verCategoria(b.dataset.cat), 30); }
  });

  /* app.js avisa cuando tocan una tarjeta */
  document.addEventListener("trcg:ver", e => {
    const d = e.detail || {};
    if (!porId.has(d.id) || dlg.open) return;
    const c = d.origen;
    origen = c && c.querySelector ? (c.querySelector(".ver") || c) : c;
    deCombo = null;
    pintar(d.id);
    M.abrir(dlg, { volverA: origen });
  });
  dlg.addEventListener("close", () => { deCombo = null; });
  /* si cambia el carrito mientras la ficha está abierta (por ejemplo al agregar), se actualiza el aviso */
  document.addEventListener("trcg:agregado", () => { if (dlg.open) actualizarCarrito(); });
})();
