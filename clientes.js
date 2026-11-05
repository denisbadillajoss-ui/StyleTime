let clientesGuardados = localStorage.getItem("clientes");
let clientes;

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
    let texto = "";

    for (let i = 0; i < clientes.length; i++) {
        texto += "<tr>";
        texto += "<td>" + clientes[i].nombre + "</td>";
        texto += "<td>" + clientes[i].telefono + "</td>";
        texto += "</tr>";
    }

    document.getElementById("tablaClientes").innerHTML = texto;
}

function agregarCliente() {
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;

    if (nombre.trim() == "" || telefono.trim() == "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    clientes.push({nombre: nombre, telefono: telefono});
    localStorage.setItem("clientes", JSON.stringify(clientes));
    mostrarClientes();

    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    mostrarMensaje("mensaje", "Cliente registrado correctamente.", "success");
}

mostrarClientes();
