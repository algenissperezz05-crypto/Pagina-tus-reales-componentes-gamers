/* EFECTOS: progreso de lectura, cabecera, aparición al desplazarse, luz del cursor, tarjetas con inclinación,
   cifras que cuentan, marquesina de marcas, vuelo al carrito, ondas en botones y botón "volver arriba". */
(() => {
  "use strict";
  const T = window.TRCG;
  if (!T) return;
  const $ = (s, el = document) => el.querySelector(s);
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conMouse = matchMedia("(hover: hover)").matches;

  /* 1. Progreso, cabecera compacta y botón de subir (un solo listener, ligero) */
  const prog = $("#progreso"), cab = $(".top"), subir = $("#subir");
  let espera = false;
  const alScroll = () => {
    espera = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : 0);
    cab.classList.toggle("compacta", scrollY > 40);
    subir.hidden = scrollY < 700;
  };
  addEventListener("scroll", () => { if (!espera) { espera = true; requestAnimationFrame(alScroll); } }, { passive: true });
  alScroll();
  subir.addEventListener("click", () => scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" }));

  /* 2. Aparición suave de los bloques marcados con .reveal */
  const rev = [...document.querySelectorAll(".reveal")];
  if (!("IntersectionObserver" in window)) rev.forEach(e => e.classList.add("visto"));
  else {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visto"); io.unobserve(en.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });
    rev.forEach(e => io.observe(e));
  }

  /* 3. Luz suave que sigue al cursor */
  const luz = $("#luz");
  if (luz && !reducido && conMouse) {
    let lx = 0, ly = 0, raf = 0;
    addEventListener("pointermove", e => {
      lx = e.clientX; ly = e.clientY; luz.classList.add("on");
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; luz.style.transform = `translate3d(${lx}px,${ly}px,0)`; });
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => luz.classList.remove("on"));
  }

  /* 4. Tarjetas: inclinación 3D suave y luz que sigue al cursor */
  const grid = $("#grid");
  if (grid && !reducido && conMouse) {
    grid.addEventListener("pointermove", e => {
      const c = e.target.closest(".card"); if (!c) return;
      const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
      c.style.setProperty("--ry", ((x / r.width - .5) * 8).toFixed(2) + "deg");
      c.style.setProperty("--rx", ((.5 - y / r.height) * 8).toFixed(2) + "deg");
      c.classList.add("inclinada");
    });
    grid.addEventListener("pointerout", e => {
      const c = e.target.closest(".card");
      if (c && !c.contains(e.relatedTarget)) c.classList.remove("inclinada");
    });
  }

  /* 5. Cifras (calculadas con tu catálogo) que cuentan hacia arriba al aparecer */
  const cifras = {
    "c-prod": T.productos.length,
    "c-cat": T.categorias.length,
    "c-marca": new Set(T.productos.map(p => p.marca)).size,
    "c-stock": T.productos.filter(p => p.stock > 0).length
  };
  const contar = el => {
    const n = Number(el.dataset.contar);
    if (reducido) { el.textContent = n; return; }
    const t0 = performance.now(), dur = 1100;
    const paso = t => {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };
  for (const [id, n] of Object.entries(cifras)) { const el = $("#" + id); el.dataset.contar = n; el.textContent = reducido ? n : 0; }
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      co.unobserve(en.target); contar(en.target.querySelector("b"));
    }), { threshold: 0.5 });
    document.querySelectorAll(".dato").forEach(d => co.observe(d));
  } else document.querySelectorAll(".dato b").forEach(contar);

  /* 6. Marquesina de marcas: clic en una marca filtra el catálogo */
  const pista = $("#pista-marcas");
  if (pista) {
    const marcas = [...new Set(T.productos.map(p => p.marca))];
    pista.innerHTML =
      marcas.map(m => `<button type="button" data-marca="${T.esc(m)}">${T.esc(m)}</button>`).join("") +
      marcas.map(m => `<button type="button" tabindex="-1" aria-hidden="true" data-marca="${T.esc(m)}">${T.esc(m)}</button>`).join("");
    pista.addEventListener("click", e => { const b = e.target.closest("[data-marca]"); if (b) T.verMarca(b.dataset.marca); });
  }

  /* 7. Al agregar al carrito, la imagen del producto vuela hasta el botón del carrito */
  document.addEventListener("trcg:agregado", e => {
    if (reducido) return;
    const origen = e.detail && e.detail.origen;
    const cont = origen && origen.closest ? origen.closest(".card, .pf") : null;
    const src = cont && cont.querySelector(".img img, .pf-img img, .img > svg, .pf-img svg");
    const dest = $("#btn-cart");
    if (!src || !dest) return;
    const a = src.getBoundingClientRect(), b = dest.getBoundingClientRect();
    if (!a.width || !b.width) return;
    const ax = a.left + a.width / 2, ay = a.top + a.height / 2;
    const n = document.createElement("div");
    n.className = "vuela";
    n.append(src.cloneNode(true));
    n.style.left = ax + "px"; n.style.top = ay + "px";
    (document.querySelector("dialog[open]") || document.body).append(n); // dentro de la ventana abierta para que no quede tapado
    requestAnimationFrame(() => requestAnimationFrame(() => {
      n.style.transform = `translate(${b.left + b.width / 2 - ax}px,${b.top + b.height / 2 - ay}px) scale(.25)`;
      n.style.opacity = ".25";
    }));
    setTimeout(() => n.remove(), 850);
  });

  /* 8. Onda al hacer clic en los botones */
  document.addEventListener("pointerdown", e => {
    const b = e.target.closest(".btn");
    if (!b || b.disabled || reducido) return;
    const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height);
    const o = document.createElement("span");
    o.className = "onda";
    o.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.append(o);
    setTimeout(() => o.remove(), 650);
  });
})();
