let serviciosGuardados = localStorage.getItem("servicios");
let servicios;
let posicionEditar = -1;

if (serviciosGuardados == null) {
    servicios = [
        {nombre: "Corte de cabello", duracion: 45, precio: 5000},
        {nombre: "Barba", duracion: 30, precio: 3000}
    ];
    localStorage.setItem("servicios", JSON.stringify(servicios));
} else {
    servicios = JSON.parse(serviciosGuardados);
}

function mostrarServicios() {
    let texto = "";

    for (let i = 0; i < servicios.length; i++) {
        texto += "<tr>";
        texto += "<td>" + servicios[i].nombre + "</td>";
        texto += "<td>" + servicios[i].duracion + " minutos</td>";
        texto += "<td>₡" + servicios[i].precio + "</td>";
        texto += '<td class="text-nowrap">';
        texto += '<button class="btn btn-sm btn-outline-primary me-1" onclick="editarServicio(' + i + ')">Editar</button>';
        texto += '<button class="btn btn-sm btn-danger" onclick="eliminarServicio(' + i + ')">Eliminar</button>';
        texto += "</td>";
        texto += "</tr>";
    }

    if (servicios.length == 0) {
        texto = '<tr><td colspan="4" class="empty-state">Aún no hay servicios registrados.</td></tr>';
    }

    document.getElementById("tablaServicios").innerHTML = texto;
}

function existeServicio(nombre, posicionIgnorar) {
    for (let i = 0; i < servicios.length; i++) {
        if (i != posicionIgnorar &&
            servicios[i].nombre.toLowerCase() == nombre.toLowerCase()) {
            return true;
        }
    }

    return false;
}

function agregarServicio() {
    let nombre = document.getElementById("nombre").value.trim();
    let duracionTexto = document.getElementById("duracion").value;
    let precioTexto = document.getElementById("precio").value;

    if (nombre == "" || duracionTexto == "" || precioTexto == "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    let duracion = Number(duracionTexto);
    let precio = Number(precioTexto);

    if (duracion <= 0 || precio < 0) {
        mostrarMensaje("mensaje", "Verifique la duración y el precio.", "danger");
        return;
    }

    if (existeServicio(nombre, posicionEditar)) {
        mostrarMensaje("mensaje", "Ya existe un servicio con ese nombre.", "danger");
        return;
    }

    let texto = "";

    if (posicionEditar == -1) {
        servicios.push({
            nombre: nombre,
            duracion: duracion,
            precio: precio
        });
        texto = "Servicio registrado correctamente.";
    } else {
        servicios[posicionEditar].nombre = nombre;
        servicios[posicionEditar].duracion = duracion;
        servicios[posicionEditar].precio = precio;
        texto = "Servicio actualizado correctamente.";
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));
    limpiarFormulario();
    mostrarServicios();
    mostrarMensaje("mensaje", texto, "success");
}

function editarServicio(posicion) {
    document.getElementById("nombre").value = servicios[posicion].nombre;
    document.getElementById("duracion").value = servicios[posicion].duracion;
    document.getElementById("precio").value = servicios[posicion].precio;
    posicionEditar = posicion;

    document.getElementById("btnGuardar").innerHTML =
        '<i class="bi bi-check-lg me-2" aria-hidden="true"></i>Guardar cambios';
    document.getElementById("nombre").focus();
}

function eliminarServicio(posicion) {
    if (!confirm("¿Desea eliminar el servicio " + servicios[posicion].nombre + "?")) {
        return;
    }

    servicios.splice(posicion, 1);
    localStorage.setItem("servicios", JSON.stringify(servicios));
    limpiarFormulario();
    mostrarServicios();
    mostrarMensaje("mensaje", "Servicio eliminado correctamente.", "success");
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("duracion").value = "";
    document.getElementById("precio").value = "";
    posicionEditar = -1;

    document.getElementById("btnGuardar").innerHTML =
        '<i class="bi bi-plus-lg me-2" aria-hidden="true"></i>Agregar servicio';
}

mostrarServicios();
