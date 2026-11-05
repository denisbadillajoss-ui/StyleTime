let trabajadores = JSON.parse(localStorage.getItem("trabajadores"));
let citas = JSON.parse(localStorage.getItem("citas"));
let clientes = JSON.parse(localStorage.getItem("clientes"));
let ausencias = JSON.parse(localStorage.getItem("ausencias"));

if (trabajadores == null) {
    trabajadores = [
        {nombre: "Maria", especialidad: "Estilista", horario: "08:00 a 17:00"},
        {nombre: "Pedro", especialidad: "Barbero", horario: "09:00 a 18:00"}
    ];
    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
}

if (citas == null) {
    citas = [];
}

if (clientes == null) {
    clientes = [
        {nombre: "María Rodríguez", telefono: "88881111"},
        {nombre: "Carlos Pérez", telefono: "88882222"}
    ];
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

if (ausencias == null) {
    ausencias = [];
}

function llenarTrabajadores() {
    let texto = '<option value="">Seleccione un trabajador</option>';

    for (let i = 0; i < trabajadores.length; i++) {
        texto += '<option value="' + trabajadores[i].nombre + '">' + trabajadores[i].nombre + '</option>';
    }

    document.getElementById("trabajador").innerHTML = texto;
}

function estaAusente(trabajador, fecha) {
    for (let i = 0; i < ausencias.length; i++) {
        if (ausencias[i].trabajador == trabajador && ausencias[i].fecha == fecha) {
            return true;
        }
    }

    return false;
}

function buscarTelefono(nombreCliente) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre == nombreCliente) {
            return clientes[i].telefono;
        }
    }

    return "No registrado";
}

function consultarAgenda() {
    let trabajador = document.getElementById("trabajador").value;
    let fecha = document.getElementById("fecha").value;

    if (trabajador == "" || fecha == "") {
        mostrarMensaje("resultado", "Debe seleccionar un trabajador y una fecha.", "danger");
        return;
    }

    let texto = "";
    let cantidad = 0;

    if (estaAusente(trabajador, fecha)) {
        texto += '<div class="alert alert-warning">El trabajador está marcado como ausente para esta fecha.</div>';
    }

    texto += '<div class="table-responsive mt-3">';
    texto += '<table class="table table-dark table-striped table-bordered align-middle mb-0">';
    texto += '<thead><tr><th>Hora</th><th>Cliente</th><th>Servicio</th><th>Estado</th></tr></thead><tbody>';

    for (let i = 0; i < citas.length; i++) {
        if (citas[i].trabajador == trabajador && citas[i].fecha == fecha) {
            let estado = citas[i].estado;
            if (estado == null) {
                estado = "Activa";
            }

            texto += "<tr>";
            texto += "<td>" + citas[i].hora + "</td>";
            texto += "<td>" + citas[i].cliente + "</td>";
            texto += "<td>" + citas[i].servicio + "</td>";
            texto += "<td>" + estado + "</td>";
            texto += "</tr>";
            cantidad++;
        }
    }

    if (cantidad == 0) {
        texto += '<tr><td colspan="4" class="empty-state">No hay citas para esta fecha.</td></tr>';
    }

    texto += "</tbody></table></div>";

    document.getElementById("resultado").className = "mt-4";
    document.getElementById("resultado").innerHTML = texto;
}

function marcarAusente() {
    let trabajador = document.getElementById("trabajador").value;
    let fecha = document.getElementById("fecha").value;

    if (trabajador == "" || fecha == "") {
        mostrarMensaje("resultado", "Debe seleccionar un trabajador y una fecha.", "danger");
        return;
    }

    if (!estaAusente(trabajador, fecha)) {
        ausencias.push({trabajador: trabajador, fecha: fecha});
        localStorage.setItem("ausencias", JSON.stringify(ausencias));
    }

    let texto = '<div class="alert alert-warning">Trabajador marcado como ausente. Citas afectadas:</div>';
    let cantidad = 0;

    texto += '<div class="table-responsive">';
    texto += '<table class="table table-dark table-striped table-bordered align-middle mb-0">';
    texto += '<thead><tr><th>Hora</th><th>Cliente</th><th>Teléfono</th><th>Servicio</th></tr></thead><tbody>';

    for (let i = 0; i < citas.length; i++) {
        if (citas[i].trabajador == trabajador &&
            citas[i].fecha == fecha &&
            citas[i].estado != "Cancelada") {

            texto += "<tr>";
            texto += "<td>" + citas[i].hora + "</td>";
            texto += "<td>" + citas[i].cliente + "</td>";
            texto += "<td>" + buscarTelefono(citas[i].cliente) + "</td>";
            texto += "<td>" + citas[i].servicio + "</td>";
            texto += "</tr>";
            cantidad++;
        }
    }

    if (cantidad == 0) {
        texto += '<tr><td colspan="4" class="empty-state">No hay citas afectadas.</td></tr>';
    }

    texto += "</tbody></table></div>";

    document.getElementById("resultado").className = "mt-4";
    document.getElementById("resultado").innerHTML = texto;
}

llenarTrabajadores();
