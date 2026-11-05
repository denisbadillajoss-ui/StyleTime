let clientes = JSON.parse(localStorage.getItem("clientes"));
let trabajadores = JSON.parse(localStorage.getItem("trabajadores"));
let servicios = JSON.parse(localStorage.getItem("servicios"));
let citas = JSON.parse(localStorage.getItem("citas"));

if (clientes == null) {
    clientes = [
        {nombre: "María Rodríguez", telefono: "88881111"},
        {nombre: "Carlos Pérez", telefono: "88882222"}
    ];
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

if (trabajadores == null) {
    trabajadores = [
        {nombre: "Maria", especialidad: "Estilista", horario: "08:00 a 17:00"},
        {nombre: "Pedro", especialidad: "Barbero", horario: "09:00 a 18:00"}
    ];
    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
}

if (servicios == null) {
    servicios = [
        {nombre: "Corte de cabello", duracion: 45, precio: 5000},
        {nombre: "Barba", duracion: 30, precio: 3000}
    ];
    localStorage.setItem("servicios", JSON.stringify(servicios));
}

if (citas == null) {
    citas = [];
    localStorage.setItem("citas", JSON.stringify(citas));
}

function llenarSelects() {
    let textoClientes = '<option value="">Seleccione un cliente</option>';
    let textoTrabajadores = '<option value="">Seleccione un trabajador</option>';
    let textoServicios = '<option value="">Seleccione un servicio</option>';

    for (let i = 0; i < clientes.length; i++) {
        textoClientes += '<option value="' + clientes[i].nombre + '">' + clientes[i].nombre + '</option>';
    }

    for (let i = 0; i < trabajadores.length; i++) {
        textoTrabajadores += '<option value="' + trabajadores[i].nombre + '">' + trabajadores[i].nombre + '</option>';
    }

    for (let i = 0; i < servicios.length; i++) {
        textoServicios += '<option value="' + servicios[i].nombre + '">' + servicios[i].nombre + '</option>';
    }

    document.getElementById("cliente").innerHTML = textoClientes;
    document.getElementById("trabajador").innerHTML = textoTrabajadores;
    document.getElementById("servicio").innerHTML = textoServicios;
}

function mostrarCitas() {
    let texto = "";

    for (let i = 0; i < citas.length; i++) {
        let estado = citas[i].estado;
        if (estado == null) {
            estado = "Activa";
        }

        texto += "<tr>";
        texto += "<td>" + citas[i].cliente + "</td>";
        texto += "<td>" + citas[i].trabajador + "</td>";
        texto += "<td>" + citas[i].servicio + "</td>";
        texto += "<td>" + citas[i].fecha + "</td>";
        texto += "<td>" + citas[i].hora + "</td>";
        texto += "<td>" + estado + "</td>";
        texto += '<td><button class="btn btn-sm btn-outline-primary me-1" onclick="reprogramarCita(' + i + ')">Reprogramar</button>';

        if (estado != "Cancelada") {
            texto += '<button class="btn btn-sm btn-danger" onclick="cancelarCita(' + i + ')">Cancelar</button>';
        }

        texto += "</td>";
        texto += "</tr>";
    }

    document.getElementById("tablaCitas").innerHTML = texto;

    if (citas.length == 0) {
        document.getElementById("tablaCitas").innerHTML =
            '<tr><td colspan="7" class="empty-state">Aún no hay citas registradas.</td></tr>';
    }
}

function obtenerDuracion(nombreServicio) {
    for (let i = 0; i < servicios.length; i++) {
        if (servicios[i].nombre == nombreServicio) {
            return Number(servicios[i].duracion);
        }
    }

    return 0;
}

function convertirMinutos(hora) {
    let partes = hora.split(":");
    return Number(partes[0]) * 60 + Number(partes[1]);
}

function existeChoque(trabajador, servicio, fecha, hora, posicionIgnorar) {
    let inicioNuevo = convertirMinutos(hora);
    let finNuevo = inicioNuevo + obtenerDuracion(servicio);

    for (let i = 0; i < citas.length; i++) {
        if (i != posicionIgnorar &&
            citas[i].trabajador == trabajador &&
            citas[i].fecha == fecha &&
            citas[i].estado != "Cancelada") {

            let inicioCita = convertirMinutos(citas[i].hora);
            let finCita = inicioCita + obtenerDuracion(citas[i].servicio);

            if (inicioNuevo < finCita && finNuevo > inicioCita) {
                return true;
            }
        }
    }

    return false;
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

    if (existeChoque(trabajador, servicio, fecha, hora, -1)) {
        mostrarMensaje("mensaje", "El horario se cruza con otra cita del trabajador.", "danger");
        return;
    }

    citas.push({
        cliente: cliente,
        trabajador: trabajador,
        servicio: servicio,
        fecha: fecha,
        hora: hora,
        observaciones: observaciones,
        estado: "Activa"
    });

    localStorage.setItem("citas", JSON.stringify(citas));
    mostrarCitas();
    mostrarMensaje("mensaje", "Cita registrada correctamente.", "success");

    document.getElementById("cliente").value = "";
    document.getElementById("trabajador").value = "";
    document.getElementById("servicio").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("observaciones").value = "";
}

function cancelarCita(posicion) {
    citas[posicion].estado = "Cancelada";
    localStorage.setItem("citas", JSON.stringify(citas));
    mostrarCitas();
    mostrarMensaje("mensaje", "Cita cancelada correctamente.", "success");
}

function reprogramarCita(posicion) {
    if (citas[posicion].estado == "Cancelada") {
        mostrarMensaje("mensaje", "No se puede reprogramar una cita cancelada.", "danger");
        return;
    }

    let nuevaFecha = prompt("Nueva fecha (AAAA-MM-DD):", citas[posicion].fecha);
    if (nuevaFecha == null || nuevaFecha == "") {
        return;
    }

    let nuevaHora = prompt("Nueva hora (HH:MM):", citas[posicion].hora);
    if (nuevaHora == null || nuevaHora == "") {
        return;
    }

    if (existeChoque(citas[posicion].trabajador, citas[posicion].servicio,
        nuevaFecha, nuevaHora, posicion)) {
        mostrarMensaje("mensaje", "El nuevo horario se cruza con otra cita del trabajador.", "danger");
        return;
    }

    citas[posicion].fecha = nuevaFecha;
    citas[posicion].hora = nuevaHora;

    localStorage.setItem("citas", JSON.stringify(citas));
    mostrarCitas();
    mostrarMensaje("mensaje", "Cita reprogramada correctamente.", "success");
}

llenarSelects();
mostrarCitas();
