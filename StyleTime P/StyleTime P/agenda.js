
function consultarAgenda() {
    let trabajador = document.getElementById("trabajador").value;
    let fecha = document.getElementById("fecha").value;

    if (fecha == "") {
        document.getElementById("resultado").textContent =
            "Debe seleccionar una fecha.";
        return;
    }

    document.getElementById("resultado").textContent =
        "Agenda solicitada para " + trabajador +
        " el día " + fecha +
        ". Consulta de disponibilidad pendiente de integración.";
}
