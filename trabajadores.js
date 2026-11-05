let trabajadoresGuardados = localStorage.getItem("trabajadores");
let trabajadores;
let posicionEditar = -1;

if (trabajadoresGuardados == null) {
    trabajadores = [
        {nombre: "Maria", especialidad: "Estilista", horario: "08:00 a 17:00"},
        {nombre: "Pedro", especialidad: "Barbero", horario: "09:00 a 18:00"}
    ];
    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
} else {
    trabajadores = JSON.parse(trabajadoresGuardados);
}

function mostrarTrabajadores() {
    let texto = "";

    for (let i = 0; i < trabajadores.length; i++) {
        texto += "<tr>";
        texto += "<td>" + trabajadores[i].nombre + "</td>";
        texto += "<td>" + trabajadores[i].especialidad + "</td>";
        texto += "<td>" + trabajadores[i].horario + "</td>";
        texto += '<td class="text-nowrap">';
        texto += '<button class="btn btn-sm btn-outline-primary me-1" onclick="editarTrabajador(' + i + ')">Editar</button>';
        texto += '<button class="btn btn-sm btn-danger" onclick="eliminarTrabajador(' + i + ')">Eliminar</button>';
        texto += "</td>";
        texto += "</tr>";
    }

    if (trabajadores.length == 0) {
        texto = '<tr><td colspan="4" class="empty-state">Aún no hay trabajadores registrados.</td></tr>';
    }

    document.getElementById("tablaTrabajadores").innerHTML = texto;
}

function existeTrabajador(nombre, posicionIgnorar) {
    for (let i = 0; i < trabajadores.length; i++) {
        if (i != posicionIgnorar &&
            trabajadores[i].nombre.toLowerCase() == nombre.toLowerCase()) {
            return true;
        }
    }

    return false;
}

function agregarTrabajador() {
    let nombre = document.getElementById("nombre").value.trim();
    let especialidad = document.getElementById("especialidad").value.trim();
    let horario = document.getElementById("horario").value.trim();

    if (nombre == "" || especialidad == "" || horario == "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    if (existeTrabajador(nombre, posicionEditar)) {
        mostrarMensaje("mensaje", "Ya existe un trabajador con ese nombre.", "danger");
        return;
    }

    let texto = "";

    if (posicionEditar == -1) {
        trabajadores.push({
            nombre: nombre,
            especialidad: especialidad,
            horario: horario
        });
        texto = "Trabajador registrado correctamente.";
    } else {
        trabajadores[posicionEditar].nombre = nombre;
        trabajadores[posicionEditar].especialidad = especialidad;
        trabajadores[posicionEditar].horario = horario;
        texto = "Trabajador actualizado correctamente.";
    }

    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
    limpiarFormulario();
    mostrarTrabajadores();
    mostrarMensaje("mensaje", texto, "success");
}

function editarTrabajador(posicion) {
    document.getElementById("nombre").value = trabajadores[posicion].nombre;
    document.getElementById("especialidad").value = trabajadores[posicion].especialidad;
    document.getElementById("horario").value = trabajadores[posicion].horario;
    posicionEditar = posicion;

    document.getElementById("btnGuardar").innerHTML =
        '<i class="bi bi-check-lg me-2" aria-hidden="true"></i>Guardar cambios';
    document.getElementById("nombre").focus();
}

function eliminarTrabajador(posicion) {
    if (!confirm("¿Desea eliminar a " + trabajadores[posicion].nombre + "?")) {
        return;
    }

    trabajadores.splice(posicion, 1);
    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
    limpiarFormulario();
    mostrarTrabajadores();
    mostrarMensaje("mensaje", "Trabajador eliminado correctamente.", "success");
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("especialidad").value = "";
    document.getElementById("horario").value = "";
    posicionEditar = -1;

    document.getElementById("btnGuardar").innerHTML =
        '<i class="bi bi-plus-lg me-2" aria-hidden="true"></i>Agregar trabajador';
}

mostrarTrabajadores();
