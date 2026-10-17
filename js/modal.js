/* VENTANAS: utilidades que comparten la ficha de producto y la ventana de compra.
   Usan la etiqueta nativa <dialog>: se cierra con Esc, la página de fondo queda bloqueada y el foco no se escapa. */
(() => {
  "use strict";
  const T = window.TRCG;
  if (!T || typeof HTMLDialogElement === "undefined") return;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pila = []; // ventanas abiertas (la última queda encima)

  /* Los avisos (toasts) se mudan a la ventana abierta; si no, quedarían tapados por ella */
  function colocarAvisos() {
    const av = document.getElementById("toasts");
    if (av) (pila[pila.length - 1] || document.body).append(av);
  }

  /* abrir(ventana, { volverA: elemento que recupera el foco al cerrar, alCerrar: función, fondo: false = no cerrar al tocar el fondo }) */
  function abrir(dlg, op = {}) {
    if (!dlg || dlg.open) return;
    dlg._volverA = op.volverA || document.activeElement;
    dlg._alCerrar = op.alCerrar || null;
    dlg._fondo = op.fondo !== false;
    dlg.classList.remove("saliendo");
    dlg.showModal();
    pila.push(dlg);
    document.body.classList.add("lock");
    colocarAvisos();
  }

  /* cerrar(ventana, true) = sin animación de salida */
  function cerrar(dlg, rapido = false) {
    if (!dlg || !dlg.open || dlg._saliendo) return;
    if (rapido || reducido) { dlg.close(); return; }
    dlg._saliendo = true;
    dlg.classList.add("saliendo");
    setTimeout(() => { if (dlg.open) dlg.close(); }, 220);
  }

  function preparar(d) {
    d.addEventListener("cancel", e => { e.preventDefault(); cerrar(d); }); // tecla Esc
    let abajo = null;
    d.addEventListener("pointerdown", e => { abajo = e.target; });
    d.addEventListener("click", e => {
      if (e.target.closest("[data-cerrar]")) cerrar(d);
      else if (e.target === d && abajo === d && d._fondo) cerrar(d); // clic en el fondo oscuro
    });
    d.addEventListener("close", () => {
      d._saliendo = false; d.classList.remove("saliendo");
      const i = pila.indexOf(d); if (i > -1) pila.splice(i, 1);
      colocarAvisos();
      const cajon = document.getElementById("carrito");
      if (!pila.length && !(cajon && cajon.classList.contains("open"))) document.body.classList.remove("lock");
      const v = d._volverA, a = document.activeElement;
      if (!pila.length && v && document.contains(v) && (!a || a === document.body || d.contains(a))) v.focus({ preventScroll: true });
      const cb = d._alCerrar; d._alCerrar = d._volverA = null;
      if (cb) cb();
    });
  }

  document.querySelectorAll("dialog.modal").forEach(preparar);
  T.modal = { abrir, cerrar };
})();
