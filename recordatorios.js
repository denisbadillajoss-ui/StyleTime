// Registro en memoria, igual que los demás módulos. El envío sigue pendiente.
let recordatorios = [];

function mostrarRecordatorios() {
    const tabla = document.getElementById("tablaRecordatorios");
    tabla.replaceChildren();

    if (recordatorios.length === 0) {
        tabla.innerHTML = '<tr><td colspan="3" class="empty-state">Aún no hay recordatorios registrados.</td></tr>';
        return;
    }

    for (const recordatorio of recordatorios) {
        const fila = document.createElement("tr");
        for (const valor of [recordatorio.cliente, recordatorio.mensaje, recordatorio.estado]) {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
}

function agregarRecordatorio() {
    const cliente = document.getElementById("cliente").value;
    const mensaje = document.getElementById("mensajeTexto").value;

    if (cliente.trim() === "" || mensaje.trim() === "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    recordatorios.push({ cliente: cliente, mensaje: mensaje, estado: "Pendiente" });
    mostrarRecordatorios();
    document.getElementById("cliente").value = "";
    document.getElementById("mensajeTexto").value = "";
    mostrarMensaje("mensaje", "Recordatorio registrado correctamente. Envío pendiente.", "success");
}

mostrarRecordatorios();
