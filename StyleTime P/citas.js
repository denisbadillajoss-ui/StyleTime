
let citas = [];

function mostrarCitas() {
    let texto = "";

    for (let i = 0; i < citas.length; i++) {
        texto += "<tr>";
        texto += "<td>" + citas[i].cliente + "</td>";
        texto += "<td>" + citas[i].trabajador + "</td>";
        texto += "<td>" + citas[i].servicio + "</td>";
        texto += "<td>" + citas[i].fecha + "</td>";
        texto += "<td>" + citas[i].hora + "</td>";
        texto += "</tr>";
    }

    document.getElementById("tablaCitas").innerHTML = texto;
    if (citas.length === 0) {
        document.getElementById("tablaCitas").innerHTML =
            '<tr><td colspan="5" class="empty-state">Aún no hay citas registradas.</td></tr>';
    }
}

function agregarCita() {
    let cliente = document.getElementById("cliente").value;
    let trabajador = document.getElementById("trabajador").value;
    let servicio = document.getElementById("servicio").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let observaciones = document.getElementById("observaciones").value;

    if (cliente == "" || trabajador == "" || servicio == "" ||
        fecha == "" || hora == "") {
        mostrarMensaje("mensaje", "Complete todos los campos obligatorios.", "danger");
        return;
    }

    for (let i = 0; i < citas.length; i++) {
        if (citas[i].trabajador == trabajador &&
            citas[i].fecha == fecha &&
            citas[i].hora == hora) {
            mostrarMensaje("mensaje", "El trabajador ya tiene una cita a esa hora.", "danger");
            return;
        }
    }

    citas.push({
        cliente: cliente,
        trabajador: trabajador,
        servicio: servicio,
        fecha: fecha,
        hora: hora,
        observaciones: observaciones
    });

    mostrarCitas();
    mostrarMensaje("mensaje", "Cita registrada correctamente.", "success");

    document.getElementById("cliente").value = "";
    document.getElementById("trabajador").value = "";
    document.getElementById("servicio").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("observaciones").value = "";
}

mostrarCitas();
