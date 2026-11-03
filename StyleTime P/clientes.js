//Clientes es un arreglo con objetos como nombre y telefono
let clientes = [
    {nombre: "María Rodríguez", telefono: "88881111"},
    {nombre: "Carlos Pérez", telefono: "88882222"}
];

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
        document.getElementById("mensaje").textContent =
            "Todos los campos son obligatorios.";
        return;
    }

    clientes.push({nombre: nombre, telefono: telefono});
    mostrarClientes();

    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("mensaje").textContent = "";
}

mostrarClientes();
