/* FICHA DE PRODUCTO: al tocar un producto se abre una ventana con foto, datos, características,
   cantidad, "Añadir al carrito", "Comprar ahora", favoritos y productos relacionados.
   Los textos salen de js/fichas.js; precio, marca, categoría y existencias salen de js/data.js. */
(() => {
  "use strict";
  const T = window.TRCG, M = T && T.modal;
  const dlg = document.getElementById("ficha"), cuerpo = document.getElementById("ficha-cuerpo");
  if (!T || !M || !dlg || !cuerpo) return;
  const { esc, fmt, porId, icono } = T;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conMouse = matchMedia("(hover: hover)").matches;
  let id = null, cant = 1, origen = null;

  const enCarrito = i => (T.itemsCarrito().find(x => x.id === i) || {}).cantidad || 0;
  const relacionados = p => {
    const otros = T.productos.filter(x => x.id !== p.id);
    return [...otros.filter(x => x.cat === p.cat), ...otros.filter(x => x.cat !== p.cat && x.marca === p.marca)].slice(0, 4);
  };

  /* Dibuja la ficha de un producto dentro de la ventana */
  function pintar(nuevo) {
    const p = porId.get(nuevo); if (!p) return;
    id = p.id; cant = 1;
    const f = (window.FICHAS || {})[p.id] || {};
    const desc = f.desc || (window.FICHAS_CAT || {})[p.cat] || `${p.nombre}, de la marca ${p.marca}.`;
    const filas = [["Marca", p.marca], ["Categoría", p.cat], ...(f.specs || []), ["Código", p.id.toUpperCase()]];
    const agot = p.stock < 1, fav = T.esFav(p.id);
    const foto = p.img ? `<img src="${esc(p.img)}" alt="${esc(p.nombre)}">` : icono(p.cat);
    const stockTxt = agot ? "Sin existencias por ahora" : p.stock <= 3 ? `¡Quedan pocas! Solo ${p.stock} disponible${p.stock === 1 ? "" : "s"}` : `${p.stock} disponibles`;
    const stockCls = agot ? "no" : p.stock <= 3 ? "poco" : "";
    const rel = relacionados(p);
    cuerpo.innerHTML = `<article class="pf" data-id="${esc(p.id)}">
      <button class="mx" type="button" data-cerrar aria-label="Cerrar la ficha del producto">✕</button>
      <div class="pf-img"><div class="pf-foto">${foto}</div>${agot ? '<span class="tag out">Agotado</span>' : p.nuevo ? '<span class="tag">Nuevo</span>' : ""}</div>
      <div class="pf-info">
        <p class="pf-meta"><button type="button" data-marca="${esc(p.marca)}">${esc(p.marca)}</button><button type="button" data-cat="${esc(p.cat)}">${esc(p.cat)}</button></p>
        <h2 id="pf-nombre">${esc(p.nombre)}</h2>
        <p class="pf-precio">${fmt(p.precio)}</p>
        <p class="pf-stock ${stockCls}">${stockTxt}</p>
        <p class="pf-desc">${esc(desc)}</p>
        <div class="pf-compra">
          <div class="pf-fila">
            <div class="qty" role="group" aria-label="Cantidad">
              <button type="button" data-pf-menos aria-label="Quitar una unidad" disabled>−</button>
              <output id="pf-cant">1</output>
              <button type="button" data-pf-mas aria-label="Agregar una unidad" ${p.stock <= 1 ? "disabled" : ""}>+</button>
            </div>
            <p class="pf-total">Total: <b id="pf-total">${fmt(p.precio)}</b></p>
          </div>
          <div class="pf-botones">
            <button class="btn brillo" type="button" data-pf-add ${agot ? "disabled" : ""}>Añadir al carrito</button>
            <button class="btn violeta" type="button" data-pf-comprar ${agot ? "disabled" : ""}>Comprar ahora</button>
          </div>
          <button class="btn ghost fav-txt" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de" : "Agregar a"} favoritos: ${esc(p.nombre)}">${fav ? "♥ En favoritos" : "♡ Guardar"}</button>
          <p class="pf-aviso" id="pf-carrito" aria-live="polite"></p>
          <p class="pf-nota">Precio y existencias de referencia: la tienda los confirma al recibir tu pedido.</p>
        </div>
        <dl class="pf-specs">${filas.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </div>
      ${rel.length ? `<section class="pf-rel" aria-labelledby="pf-rel-t"><h3 id="pf-rel-t">También te puede interesar</h3><ul>${rel.map(r =>
        `<li><button type="button" data-rel="${esc(r.id)}"><span class="mini">${r.img ? `<img src="${esc(r.img)}" alt="">` : icono(r.cat)}</span><span class="pf-rel-n">${esc(r.nombre)}</span><b>${fmt(r.precio)}</b></button></li>`).join("")}</ul></section>` : ""}
    </article>`;
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
    t.textContent = fmt(p.precio * cant);
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

  /* La foto se inclina un poco hacia el cursor y una luz la sigue (solo con mouse) */
  function inclinar() {
    const el = cuerpo.querySelector(".pf-img");
    if (!el || reducido || !conMouse) return;
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty("--ry", (x * 16).toFixed(1) + "deg");
      el.style.setProperty("--rx", (-y * 16).toFixed(1) + "deg");
      el.style.setProperty("--gx", ((x + .5) * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", ((y + .5) * 100).toFixed(1) + "%");
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
    else if (b.dataset.rel) pintar(b.dataset.rel);
    else if (b.dataset.marca) { M.cerrar(dlg, true); setTimeout(() => T.verMarca(b.dataset.marca), 30); }
    else if (b.dataset.cat) { M.cerrar(dlg, true); setTimeout(() => T.verCategoria(b.dataset.cat), 30); }
  });

  /* app.js avisa cuando tocan una tarjeta */
  document.addEventListener("trcg:ver", e => {
    const d = e.detail || {};
    if (!porId.has(d.id) || dlg.open) return;
    const c = d.origen;
    origen = c && c.querySelector ? (c.querySelector(".ver") || c) : c;
    pintar(d.id);
    M.abrir(dlg, { volverA: origen });
  });
  /* si cambia el carrito mientras la ficha está abierta (por ejemplo al agregar), se actualiza el aviso */
  document.addEventListener("trcg:agregado", () => { if (dlg.open) actualizarCarrito(); });
})();
