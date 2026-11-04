// Presentación compartida: no modifica los datos ni las reglas de cada módulo.
function mostrarMensaje(id, texto, tipo) {
    const mensaje = document.getElementById(id);
    mensaje.className = "mensaje alert alert-" + tipo +
        (tipo === "success" ? " correcto" : "");
    mensaje.textContent = texto;
    mensaje.setAttribute("role", tipo === "danger" ? "alert" : "status");

    const formulario = mensaje.closest("section").querySelector("form");
    if (formulario) {
        formulario.classList.toggle("was-validated", tipo === "danger");
    }
}
