/* VENTANA DE COMPRA: pide los datos del cliente, valida el formulario, muestra el resumen y deja el pedido
   listo para enviarlo por WhatsApp o por correo (según js/config.js) o para copiarlo.
   IMPORTANTE: esta página no tiene servidor ni pasarela de pago, así que NO cobra y NO envía nada por sí sola:
   el cliente manda el mensaje desde su propio WhatsApp o correo. */
(() => {
  "use strict";
  const T = window.TRCG, M = T && T.modal;
  const dlg = document.getElementById("compra"), cuerpo = document.getElementById("compra-cuerpo");
  if (!T || !M || !dlg || !cuerpo) return;
  const { esc, fmt, porId, icono } = T;
  const conMouse = matchMedia("(hover: hover)").matches;

  /* Configuración de la tienda (js/config.js) */
  const CFG = Object.assign({ nombre: "Tus Reales Componentes Gamers", whatsapp: "", email: "", pagos: [] }, window.TIENDA || {});
  const WA = String(CFG.whatsapp || "").replace(/\D/g, "");
  const CORREO = String(CFG.email || "").trim();
  const waOk = WA.length >= 8;
  const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(CORREO);
  const pagos = Array.isArray(CFG.pagos) ? CFG.pagos.filter(Boolean) : [];

  let ctx = null;                      // pedido en curso: { items, desdeCarrito, codigo, fecha }
  let datos = { entrega: "retiro" };   // lo que escribió el cliente (solo en memoria; no se guarda en el navegador)
  let paso = 1, entregado = false;

  /* ---------- utilidades ---------- */
  const normalizar = items => (items || []).map(i => {
    const p = porId.get(i.id); if (!p || p.stock < 1) return null;
    return { id: p.id, cantidad: Math.max(1, Math.min(Math.floor(Number(i.cantidad)) || 1, p.stock)) };
  }).filter(Boolean);
  const total = () => ctx.items.reduce((s, i) => s + porId.get(i.id).precio * i.cantidad, 0);
  const unidades = () => ctx.items.reduce((s, i) => s + i.cantidad, 0);
  const codigoNuevo = () => "TRCG-" + Date.now().toString(36).toUpperCase().slice(-5) + Math.floor(Math.random() * 36).toString(36).toUpperCase();

  /* ---------- pantallas ---------- */
  const cabecera = n => `<header class="co-cab">
      <h2 id="co-titulo" tabindex="-1">${n === 1 ? "Finalizar compra" : "Revisa y envía tu pedido"}</h2>
      <ol class="pasos" aria-label="Pasos de la compra">
        <li class="${n === 1 ? "act" : "hecho"}"${n === 1 ? ' aria-current="step"' : ""}>1 · Tus datos</li>
        <li class="${n === 2 ? "act" : ""}"${n === 2 ? ' aria-current="step"' : ""}>2 · Revisar y enviar</li>
      </ol>
      <p class="co-mini">${unidades()} ${unidades() === 1 ? "producto" : "productos"} · Total de referencia: <b>${fmt(total())}</b></p>
    </header>`;

  function lateral() {
    const filas = ctx.items.map(i => {
      const p = porId.get(i.id);
      return `<li class="co-item"><span class="mini">${p.img ? `<img src="${esc(p.img)}" alt="">` : icono(p.cat)}</span>
        <div><p class="n">${esc(p.nombre)}</p><p class="u">${i.cantidad} × ${fmt(p.precio)}</p></div><p class="s">${fmt(p.precio * i.cantidad)}</p></li>`;
    }).join("");
    return `<aside class="co-side" aria-label="Resumen del pedido">
      <h3>Tu pedido</h3><ul class="co-items">${filas}</ul>
      <dl class="co-tot"><div><dt>Subtotal</dt><dd>${fmt(total())}</dd></div><div><dt>Envío</dt><dd>A coordinar</dd></div><div class="gr"><dt>Total de referencia</dt><dd>${fmt(total())}</dd></div></dl>
      <p class="co-nota">La tienda confirma disponibilidad, costo de envío y precio final antes de cobrar.</p>
      ${ctx.desdeCarrito && paso === 1 ? '<button class="link" type="button" data-editar-carrito>Editar mi carrito</button>' : ""}
    </aside>`;
  }

  const campo = (n, etiqueta, extra = "", tipo = "text") =>
    `<div class="campo"><label for="co-${n}">${etiqueta}</label><input id="co-${n}" name="${n}" type="${tipo}" ${extra} value="${esc(datos[n] || "")}" aria-describedby="e-${n}"><p class="err" id="e-${n}" hidden></p></div>`;

  function formulario() {
    const dom = datos.entrega === "domicilio";
    return `${cabecera(1)}
      <form id="co-form" novalidate>
        ${campo("nombre", "Nombre completo", 'maxlength="80" autocomplete="name" required aria-required="true"')}
        <div class="fila">
          ${campo("telefono", "Teléfono o WhatsApp", 'maxlength="20" inputmode="tel" autocomplete="tel" placeholder="809 555 1234" required aria-required="true"', "tel")}
          ${campo("correo", "Correo <span>(opcional)</span>", 'maxlength="80" autocomplete="email" inputmode="email"', "email")}
        </div>
        <fieldset class="campo"><legend>¿Cómo quieres recibir tu pedido?</legend>
          <div class="opciones">
            <label class="opcion"><input type="radio" name="entrega" value="retiro" ${dom ? "" : "checked"}><span class="rd"></span><span><b>Retiro en tienda</b><small>Coordinas el punto y la hora con la tienda.</small></span></label>
            <label class="opcion"><input type="radio" name="entrega" value="domicilio" ${dom ? "checked" : ""}><span class="rd"></span><span><b>Envío a domicilio</b><small>El costo se confirma con la tienda.</small></span></label>
          </div>
        </fieldset>
        <div class="despliega${dom ? " on" : ""}" id="co-dom"${dom ? "" : " inert"}><div>
          ${campo("sector", "Sector o ciudad", 'maxlength="60" autocomplete="address-level2"')}
          ${campo("direccion", "Dirección y referencia", 'maxlength="140" autocomplete="street-address" placeholder="Calle, número, edificio y un punto de referencia"')}
        </div></div>
        ${pagos.length ? `<div class="campo"><label for="co-pago">Forma de pago preferida</label><select id="co-pago" name="pago" required aria-required="true" aria-describedby="e-pago"><option value="">Elige una opción</option>${pagos.map(x => `<option value="${esc(x)}" ${datos.pago === x ? "selected" : ""}>${esc(x)}</option>`).join("")}</select><p class="err" id="e-pago" hidden></p></div>` : ""}
        <div class="campo"><label for="co-notas">Notas para la tienda <span>(opcional)</span></label><textarea id="co-notas" name="notas" rows="3" maxlength="300">${esc(datos.notas || "")}</textarea></div>
        <label class="chk-co"><input type="checkbox" id="co-ok" name="ok" ${datos.ok ? "checked" : ""} aria-describedby="e-ok"><span>Entiendo que el total es de referencia y que la tienda confirmará disponibilidad, envío y precio final antes de cobrar.</span></label>
        <p class="err" id="e-ok" hidden></p>
        <p class="co-nota">No pedimos datos de tarjeta en esta página. Tus datos solo se usan para armar el mensaje de tu pedido: no se guardan ni se envían a ningún servidor.</p>
        <div class="co-botones"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn brillo" type="submit">Revisar pedido →</button></div>
      </form>`;
  }

  function mensaje(wa) {
    const b = s => (wa ? `*${s}*` : s), d = datos, L = [];
    L.push(`${b("Pedido " + ctx.codigo)} - ${CFG.nombre}`, `Fecha: ${ctx.fecha}`, "", b("Cliente"), `Nombre: ${d.nombre}`, `Teléfono: ${d.telefono}`);
    if (d.correo) L.push(`Correo: ${d.correo}`);
    L.push(d.entrega === "domicilio" ? `Entrega: envío a domicilio - ${d.sector}, ${d.direccion}` : "Entrega: retiro en tienda");
    if (d.pago) L.push(`Pago preferido: ${d.pago}`);
    if (d.notas) L.push(`Notas: ${d.notas}`);
    L.push("", b("Productos"));
    ctx.items.forEach(i => { const p = porId.get(i.id); L.push(`${i.cantidad} x ${p.nombre} (ref. ${p.id}) - ${fmt(p.precio)} c/u = ${fmt(p.precio * i.cantidad)}`); });
    L.push("", `${b("Total de referencia")}: ${fmt(total())}`, "El total es de referencia: la tienda confirma disponibilidad, envío y precio final antes de cobrar.");
    return L.join("\n");
  }

  function revision() {
    const d = datos;
    const filas = [["Nombre", d.nombre], ["Teléfono", d.telefono], d.correo && ["Correo", d.correo],
      ["Entrega", d.entrega === "domicilio" ? `Envío a domicilio: ${d.sector}, ${d.direccion}` : "Retiro en tienda"],
      d.pago && ["Pago preferido", d.pago], d.notas && ["Notas", d.notas]].filter(Boolean);
    const aviso = waOk || mailOk
      ? '<p class="co-aviso"><b>Tu pedido todavía no se ha enviado.</b> Elige cómo mandarlo. Esta página no cobra ni procesa pagos: la tienda te contactará para confirmar disponibilidad, envío y forma de pago.</p>'
      : '<p class="co-aviso"><b>Esta tienda aún no recibe pedidos desde la página.</b> Copia el resumen y envíalo a la tienda por el medio de contacto que ella te indique. Esta página no cobra ni procesa pagos.</p>';
    return `${cabecera(2)}
      <div id="co-estado" aria-live="polite"></div>
      <dl class="co-datos">${filas.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <p class="co-msg-t">Este es el mensaje de tu pedido (código <b>${esc(ctx.codigo)}</b>):</p>
      <pre class="co-msg" tabindex="0" aria-label="Mensaje del pedido">${esc(mensaje(false))}</pre>
      ${aviso}
      <div class="co-envio">
        ${waOk ? '<button class="btn wa brillo" type="button" data-env="wa">Enviar por WhatsApp</button>' : ""}
        ${mailOk ? '<button class="btn" type="button" data-env="mail">Enviar por correo</button>' : ""}
        <button class="btn ghost" type="button" data-env="copiar">Copiar resumen</button>
      </div>
      <div class="co-botones"><button class="btn ghost" type="button" data-volver>← Editar mis datos</button><button class="btn ghost" type="button" data-cerrar>Seguir comprando</button></div>`;
  }

  function pintar() {
    cuerpo.innerHTML = `<button class="mx" type="button" data-cerrar aria-label="Cerrar la ventana de compra">✕</button>
      <div class="co"><div class="co-main">${paso === 1 ? formulario() : revision()}</div>${lateral()}</div>`;
  }

  /* ---------- validación ---------- */
  const REGLAS = {
    nombre: d => d.nombre.length >= 3 && /\p{L}{2,}/u.test(d.nombre) ? "" : "Escribe tu nombre completo.",
    telefono: d => {
      const n = d.telefono.replace(/\D/g, "");
      return /^[\d\s()+.\-]+$/.test(d.telefono) && n.length >= 10 && n.length <= 15 ? "" : "Escribe un teléfono válido, con al menos 10 dígitos.";
    },
    correo: d => !d.correo || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo) ? "" : "Revisa el correo: debe tener @ y un dominio (ejemplo: nombre@correo.com).",
    sector: d => d.entrega !== "domicilio" || d.sector.length >= 3 ? "" : "Indica tu sector o ciudad.",
    direccion: d => d.entrega !== "domicilio" || d.direccion.length >= 8 ? "" : "Escribe tu dirección (calle, número y una referencia).",
    pago: d => !pagos.length || d.pago ? "" : "Elige una forma de pago.",
    ok: d => d.ok ? "" : "Marca la casilla para continuar."
  };

  function leer() {
    const f = cuerpo.querySelector("#co-form"); if (!f) return;
    const v = n => (f.elements[n] ? f.elements[n].value : "").replace(/\s+/g, " ").trim();
    datos = { nombre: v("nombre"), telefono: v("telefono"), correo: v("correo"), entrega: f.elements.entrega.value || "retiro",
      sector: v("sector"), direccion: v("direccion"), pago: v("pago"), notas: v("notas"), ok: f.elements.ok.checked };
  }

  /* Valida todo el formulario (o solo el campo "solo"). Devuelve el primer campo con error. */
  function validar(solo, sacudir = false) {
    leer();
    let primero = null;
    for (const n of Object.keys(REGLAS)) {
      if (solo && solo !== n) continue;
      const campoEl = cuerpo.querySelector("#co-" + n), err = cuerpo.querySelector("#e-" + n);
      if (!campoEl || !err) continue;
      const msg = REGLAS[n](datos);
      err.hidden = !msg; err.textContent = msg;
      if (msg) campoEl.setAttribute("aria-invalid", "true"); else campoEl.removeAttribute("aria-invalid");
      if (!msg) continue;
      if (!primero) primero = campoEl;
      if (sacudir) { const w = campoEl.closest(".campo, .chk-co"); w.classList.remove("sacude"); void w.offsetWidth; w.classList.add("sacude"); }
    }
    return primero;
  }

  function alternarDomicilio(on) {
    const z = cuerpo.querySelector("#co-dom"); if (!z) return;
    z.classList.toggle("on", on); z.inert = !on;
    if (!on) { validar("sector"); validar("direccion"); } // limpia los avisos de esos dos campos
  }

  /* ---------- enviar / copiar ---------- */
  function abrirEnlace(url, nueva = true) {
    const a = document.createElement("a");
    a.href = url; a.rel = "noopener noreferrer"; a.hidden = true;
    if (nueva) a.target = "_blank";
    dlg.append(a); a.click(); a.remove();
  }
  async function copiar(texto) {
    try { await navigator.clipboard.writeText(texto); return true; } catch { /* se prueba el método antiguo */ }
    try {
      const t = document.createElement("textarea");
      t.value = texto; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;left:-9999px;top:0";
      dlg.append(t); t.select();
      const ok = document.execCommand("copy"); t.remove(); return ok;
    } catch { return false; }
  }
  function estado(via) {
    const el = cuerpo.querySelector("#co-estado"); if (!el) return;
    const t = {
      wa: ["Se abrió WhatsApp con tu pedido", "Ya está escrito. <b>Falta un paso: presiona Enviar en WhatsApp</b> para que la tienda lo reciba."],
      mail: ["Se abrió tu aplicación de correo", "El pedido ya está escrito. <b>Falta un paso: presiona Enviar</b> para que la tienda lo reciba."],
      copiar: ["Resumen copiado", "<b>Pégalo en un mensaje a la tienda</b> para que reciba tu pedido."]
    }[via];
    const chispas = [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<i style="--a:${a}deg"></i>`).join("");
    el.innerHTML = `<div class="co-ok"><span class="check"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="M15 27l8 8 15-17"/></svg>${chispas}</span>
      <div><p class="co-ok-t">${t[0]}</p><p class="co-ok-d">${t[1]} Código: <b>${esc(ctx.codigo)}</b></p></div></div>`;
    el.firstElementChild.scrollIntoView({ block: "nearest" });
  }
  async function entregar(via) {
    if (via === "wa") abrirEnlace(`https://wa.me/${WA}?text=${encodeURIComponent(mensaje(true))}`);
    else if (via === "mail") abrirEnlace(`mailto:${CORREO}?subject=${encodeURIComponent(`Pedido ${ctx.codigo} - ${datos.nombre}`)}&body=${encodeURIComponent(mensaje(false))}`, false);
    else if (!(await copiar(mensaje(false)))) return T.aviso("No se pudo copiar. Selecciona el mensaje y cópialo a mano.", true);
    entregado = true;
    estado(via);
  }

  /* ---------- abrir y cerrar ---------- */
  function abrirCompra(det) {
    if (dlg.open) return;
    const items = normalizar(det && det.items);
    if (!items.length) { T.aviso("No hay productos para comprar.", true); return; }
    ctx = { items, desdeCarrito: !!(det && det.desdeCarrito), codigo: codigoNuevo(),
      fecha: new Date().toLocaleString("es-DO", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) };
    paso = 1; entregado = false;
    pintar();
    M.abrir(dlg, { volverA: det && det.origen, alCerrar, fondo: false });
    if (conMouse) setTimeout(() => { const n = cuerpo.querySelector("#co-nombre"); if (n && dlg.open && paso === 1) n.focus(); }, 80);
  }
  function alCerrar() {
    if (entregado && ctx) {
      if (ctx.desdeCarrito) { T.quitarDelCarrito(ctx.items.map(i => i.id)); T.aviso("Listo: quité de tu carrito los productos de este pedido."); }
      datos = { nombre: datos.nombre, telefono: datos.telefono, correo: datos.correo, entrega: datos.entrega, sector: datos.sector, direccion: datos.direccion, pago: datos.pago };
    }
    ctx = null; entregado = false;
  }

  /* ---------- eventos ---------- */
  cuerpo.addEventListener("submit", e => {
    if (e.target.id !== "co-form") return;
    e.preventDefault();
    const malo = validar(null, true);
    if (malo) { malo.focus(); return; }
    paso = 2; pintar(); cuerpo.scrollTop = 0;
    cuerpo.querySelector("#co-titulo").focus({ preventScroll: true });
  });
  cuerpo.addEventListener("input", e => {
    const f = e.target;
    if (f.form && f.form.id === "co-form" && f.getAttribute("aria-invalid") === "true") validar(f.name); // se quita el error al corregir
  });
  cuerpo.addEventListener("focusout", e => {
    const f = e.target;
    if (f.form && f.form.id === "co-form" && REGLAS[f.name] && f.type !== "checkbox" && f.value) validar(f.name); // al salir de un campo con texto
  });
  cuerpo.addEventListener("change", e => {
    const f = e.target;
    if (f.name === "entrega") alternarDomicilio(f.value === "domicilio");
    else if (f.name === "ok" && f.checked) validar("ok");
  });
  cuerpo.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.env) entregar(b.dataset.env);
    else if (b.hasAttribute("data-volver")) { paso = 1; pintar(); cuerpo.scrollTop = 0; cuerpo.querySelector("#co-titulo").focus({ preventScroll: true }); }
    else if (b.hasAttribute("data-editar-carrito")) { M.cerrar(dlg, true); setTimeout(T.abrirCarrito, 30); }
  });
  document.addEventListener("trcg:comprar", e => abrirCompra(e.detail));
})();
