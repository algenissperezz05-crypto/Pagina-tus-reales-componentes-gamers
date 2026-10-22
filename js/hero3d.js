/* HÉROE: la escena 3D mira hacia el cursor, partículas de fondo y palabra que cambia de categoría.
   Cuando el héroe no se ve (porque bajaste en la página, cambiaste de pestaña o hay una ventana abierta) todo se pausa. */
(() => {
  "use strict";
  const hero = document.getElementById("inicio");
  if (!hero) return;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conMouse = matchMedia("(hover: hover)").matches;

  /* 1. Inclinación hacia el cursor (grados, suaves). Un cálculo por cuadro de pantalla, no uno por cada movimiento del mouse. */
  const inclina = document.getElementById("inclina");
  if (inclina && !reducido && conMouse) {
    let ev = null, raf = 0;
    const pinta = () => {
      raf = 0;
      if (!ev) return;
      const r = hero.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
      inclina.style.setProperty("--tx", (x * 16).toFixed(2));
      inclina.style.setProperty("--ty", (-y * 12).toFixed(2));
    };
    hero.addEventListener("pointermove", e => { ev = e; if (!raf) raf = requestAnimationFrame(pinta); }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      ev = null;
      inclina.style.setProperty("--tx", 0);
      inclina.style.setProperty("--ty", 0);
    });
  }

  /* 2. Partículas con líneas entre las cercanas. Van a ~30 cuadros por segundo (sobra para puntos tan lentos),
        dibujan las líneas por grupos y se pausan fuera de pantalla y con la pestaña oculta. */
  const cv = document.getElementById("particulas");
  let arrancar = () => {}, parar = () => {};
  if (cv && !reducido) {
    const ctx = cv.getContext("2d");
    const N = matchMedia("(max-width: 700px)").matches ? 22 : 40;
    const COLORES = ["0,229,255", "139,92,246"], NIVELES = 5, D2 = 13000;
    const segs = Array.from({ length: COLORES.length * NIVELES }, () => []);
    let w = 0, h = 0, ps = [], raf = 0, ult = 0;
    const medir = () => {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.max(1, Math.round(w)); cv.height = Math.max(1, Math.round(h)); // sin multiplicar por la densidad de píxeles: son puntos y líneas tenues
      ps = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        r: Math.random() * 1.5 + .6, c: Math.random() < .55 ? 0 : 1
      }));
    };
    const paso = t => {
      raf = requestAnimationFrame(paso);
      const dt = t - ult;
      if (dt < 30) return;
      ult = t;
      const k = Math.min(dt, 100) / 16.67; // misma velocidad aparente aunque se salten cuadros
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx * k; p.y += p.vy * k;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (const s of segs) s.length = 0;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < D2) segs[a.c * NIVELES + Math.min(NIVELES - 1, ((1 - d2 / D2) * NIVELES) | 0)].push(a.x, a.y, b.x, b.y);
        }
      }
      for (let c = 0; c < COLORES.length; c++) {
        for (let n = 0; n < NIVELES; n++) {
          const s = segs[c * NIVELES + n];
          if (!s.length) continue;
          ctx.strokeStyle = `rgba(${COLORES[c]},${(((n + .5) / NIVELES) * .3).toFixed(3)})`;
          ctx.beginPath();
          for (let q = 0; q < s.length; q += 4) { ctx.moveTo(s[q], s[q + 1]); ctx.lineTo(s[q + 2], s[q + 3]); }
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${COLORES[c]},.85)`;
        ctx.beginPath();
        for (const p of ps) if (p.c === c) { ctx.moveTo(p.x + p.r, p.y); ctx.arc(p.x, p.y, p.r, 0, 6.2832); }
        ctx.fill();
      }
    };
    arrancar = () => { if (!raf) { ult = performance.now(); raf = requestAnimationFrame(paso); } };
    parar = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    medir();
    if ("ResizeObserver" in window) new ResizeObserver(medir).observe(hero);
  }

  /* Pausa todo (partículas y animaciones CSS del héroe, con la clase "pausa") cuando el héroe no se ve */
  if (!reducido) {
    let visible = true;
    const ajustar = () => {
      const debe = visible && !document.hidden;
      hero.classList.toggle("pausa", !debe);
      if (debe) arrancar(); else parar();
    };
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; ajustar(); }).observe(hero);
    document.addEventListener("visibilitychange", ajustar);
    ajustar();
  }

  /* 3. "Explora ___": cambia de categoría y al hacer clic lleva a ella */
  const pal = document.getElementById("palabra"), T = window.TRCG;
  if (pal && T && T.categorias.length) {
    let i = 0;
    const poner = () => {
      const c = T.categorias[i];
      pal.textContent = c; pal.dataset.cat = c; pal.setAttribute("aria-label", `Ver ${c}`);
    };
    poner();
    pal.addEventListener("click", () => T.verCategoria(pal.dataset.cat));
    if (!reducido) setInterval(() => {
      if (document.hidden || hero.classList.contains("pausa")) return;
      pal.classList.add("cambia");
      setTimeout(() => { i = (i + 1) % T.categorias.length; poner(); pal.classList.remove("cambia"); }, 260);
    }, 2600);
  }
})();
