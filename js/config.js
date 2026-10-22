// CONFIGURACIÓN DE LA TIENDA: datos para que los pedidos lleguen a ti.
// La página no tiene servidor, así que el pedido se envía desde el teléfono o la computadora del cliente
// por WhatsApp o por correo (con el texto ya armado). Si dejas WhatsApp o correo vacíos, ese botón no aparece y el cliente solo puede copiar el resumen.
window.TIENDA = {
  nombre: "Tus Reales Componentes Gamers",

  // Tu WhatsApp con código de país, solo números (RD: 1 + 809/829/849 + número). Activa "Enviar por WhatsApp".
  whatsapp: "18099247413",

  // El correo donde recibes los pedidos. Activa "Enviar por correo".
  email: "algenissperezz05@gmail.com",

  // Formas de pago que el cliente puede elegir como preferencia (la tienda las confirma al contactarlo).
  // OJO: esta lista es de ejemplo. Cámbiala por las que realmente aceptas.
  pagos: ["Efectivo", "Transferencia bancaria", "Tarjeta (se coordina con la tienda)"]
};
