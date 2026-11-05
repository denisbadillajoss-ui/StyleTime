let clientesGuardados = localStorage.getItem("clientes");
let clientes;
let posicionEditar = -1;

if (clientesGuardados == null) {
    clientes = [
        {nombre: "María Rodríguez", telefono: "88881111"},
        {nombre: "Carlos Pérez", telefono: "88882222"}
    ];
    localStorage.setItem("clientes", JSON.stringify(clientes));
} else {
    clientes = JSON.parse(clientesGuardados);
}

function mostrarClientes() {
    let filtro = document.getElementById("buscar").value.trim().toLowerCase();
    let texto = "";

    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre.toLowerCase().includes(filtro)) {
            texto += "<tr>";
            texto += "<td>" + clientes[i].nombre + "</td>";
            texto += "<td>" + clientes[i].telefono + "</td>";
            texto += '<td class="text-nowrap">';
            texto += '<button class="btn btn-sm btn-outline-primary me-1" onclick="editarCliente(' + i + ')">Editar</button>';
            texto += '<button class="btn btn-sm btn-danger" onclick="eliminarCliente(' + i + ')">Eliminar</button>';
            texto += "</td>";
            texto += "</tr>";
        }
    }

    if (texto == "") {
        texto = '<tr><td colspan="3" class="empty-state">No se encontraron clientes.</td></tr>';
    }

    document.getElementById("tablaClientes").innerHTML = texto;
}

function telefonoValido(telefono) {
    return /^[0-9]{8}$/.test(telefono);
}

function existeCliente(nombre, telefono, posicionIgnorar) {
    for (let i = 0; i < clientes.length; i++) {
        if (i != posicionIgnorar) {
            if (clientes[i].nombre.toLowerCase() == nombre.toLowerCase() ||
                clientes[i].telefono == telefono) {
                return true;
            }
        }
    }

    return false;
}

function agregarCliente() {
    let nombre = document.getElementById("nombre").value.trim();
    let telefono = document.getElementById("telefono").value.trim();

    if (nombre == "" || telefono == "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    if (!telefonoValido(telefono)) {
        mostrarMensaje("mensaje", "El teléfono debe tener exactamente 8 dígitos.", "danger");
        return;
    }

    if (existeCliente(nombre, telefono, posicionEditar)) {
        mostrarMensaje("mensaje", "Ya existe un cliente con ese nombre o teléfono.", "danger");
        return;
    }

    let texto = "";

    if (posicionEditar == -1) {
        clientes.push({nombre: nombre, telefono: telefono});
        texto = "Cliente registrado correctamente.";
    } else {
        clientes[posicionEditar].nombre = nombre;
        clientes[posicionEditar].telefono = telefono;
        texto = "Cliente actualizado correctamente.";
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));
    limpiarFormulario();
    mostrarClientes();
    mostrarMensaje("mensaje", texto, "success");
}

function editarCliente(posicion) {
    document.getElementById("nombre").value = clientes[posicion].nombre;
    document.getElementById("telefono").value = clientes[posicion].telefono;
    posicionEditar = posicion;

    document.getElementById("btnGuardar").innerHTML =
        '<i class="bi bi-check-lg me-2" aria-hidden="true"></i>Guardar cambios';
    document.getElementById("nombre").focus();
}

function eliminarCliente(posicion) {
    if (!confirm("¿Desea eliminar a " + clientes[posicion].nombre + "?")) {
        return;
    }

    clientes.splice(posicion, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    limpiarFormulario();
    mostrarClientes();
    mostrarMensaje("mensaje", "Cliente eliminado correctamente.", "success");
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    posicionEditar = -1;

    document.getElementById("btnGuardar").innerHTML =
        '<i class="bi bi-plus-lg me-2" aria-hidden="true"></i>Agregar cliente';
}

mostrarClientes();
