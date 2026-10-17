/* HÉROE: la escena 3D mira hacia el cursor, partículas de fondo y palabra que cambia de categoría */
(() => {
  "use strict";
  const hero = document.getElementById("inicio");
  if (!hero) return;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conMouse = matchMedia("(hover: hover)").matches;

  /* 1. Inclinación hacia el cursor (grados, suaves) */
  const inclina = document.getElementById("inclina");
  if (inclina && !reducido && conMouse) {
    hero.addEventListener("pointermove", e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      inclina.style.setProperty("--tx", (x * 16).toFixed(2));
      inclina.style.setProperty("--ty", (-y * 12).toFixed(2));
    });
    hero.addEventListener("pointerleave", () => {
      inclina.style.setProperty("--tx", 0);
      inclina.style.setProperty("--ty", 0);
    });
  }

  /* 2. Partículas con líneas entre las cercanas. Se pausan fuera de pantalla y con la pestaña oculta. */
  const cv = document.getElementById("particulas");
  if (cv && !reducido) {
    const ctx = cv.getContext("2d");
    const N = matchMedia("(max-width: 700px)").matches ? 24 : 46;
    let w = 0, h = 0, ps = [], corriendo = false, visible = true, raf = 0;
    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        r: Math.random() * 1.5 + .6, c: Math.random() < .55 ? "0,229,255" : "139,92,246"
      }));
    };
    const paso = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        ctx.fillStyle = `rgba(${a.c},.85)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 13000) {
            ctx.strokeStyle = `rgba(${a.c},${((1 - d2 / 13000) * .3).toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(paso);
    };
    const ajustar = () => {
      const debe = visible && !document.hidden;
      if (debe && !corriendo) { corriendo = true; raf = requestAnimationFrame(paso); }
      else if (!debe && corriendo) { corriendo = false; cancelAnimationFrame(raf); }
    };
    medir();
    if ("ResizeObserver" in window) new ResizeObserver(medir).observe(hero);
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
      if (document.hidden) return;
      pal.classList.add("cambia");
      setTimeout(() => { i = (i + 1) % T.categorias.length; poner(); pal.classList.remove("cambia"); }, 260);
    }, 2600);
  }
})();
