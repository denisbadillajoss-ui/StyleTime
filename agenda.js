
function consultarAgenda() {
    let trabajador = document.getElementById("trabajador").value;
    let fecha = document.getElementById("fecha").value;

    if (fecha == "") {
        mostrarMensaje("resultado", "Debe seleccionar una fecha.", "danger");
        return;
    }

    mostrarMensaje("resultado",
        "Agenda solicitada para " + trabajador +
        " el día " + fecha +
        ". Consulta de disponibilidad pendiente de integración.", "info");
}
