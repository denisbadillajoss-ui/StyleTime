let recordatorios = JSON.parse(localStorage.getItem("recordatorios"));

if (recordatorios == null) {
    recordatorios = [];
}

function mostrarRecordatorios() {
    let texto = "";

    for (let i = 0; i < recordatorios.length; i++) {
        texto += "<tr>";
        texto += "<td>" + recordatorios[i].cliente + "</td>";
        texto += "<td>" + recordatorios[i].mensaje + "</td>";
        texto += "<td>" + recordatorios[i].estado + "</td>";
        texto += "</tr>";
    }

    if (recordatorios.length == 0) {
        texto = '<tr><td colspan="3" class="empty-state">Aún no hay recordatorios registrados.</td></tr>';
    }

    document.getElementById("tablaRecordatorios").innerHTML = texto;
}

function agregarRecordatorio() {
    let cliente = document.getElementById("cliente").value;
    let mensaje = document.getElementById("mensajeTexto").value;

    if (cliente.trim() == "" || mensaje.trim() == "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    recordatorios.push({
        cliente: cliente,
        mensaje: mensaje,
        estado: "Pendiente"
    });

    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
    mostrarRecordatorios();

    document.getElementById("cliente").value = "";
    document.getElementById("mensajeTexto").value = "";
    mostrarMensaje("mensaje", "Recordatorio registrado correctamente.", "success");
}

mostrarRecordatorios();
