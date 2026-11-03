
let servicios = [
    {nombre: "Corte de cabello", duracion: 45, precio: 5000},
    {nombre: "Barba", duracion: 30, precio: 3000}
];

function mostrarServicios() {
    let texto = "";

    for (let i = 0; i < servicios.length; i++) {
        texto += "<tr>";
        texto += "<td>" + servicios[i].nombre + "</td>";
        texto += "<td>" + servicios[i].duracion + " minutos</td>";
        texto += "<td>₡" + servicios[i].precio + "</td>";
        texto += "</tr>";
    }

    document.getElementById("tablaServicios").innerHTML = texto;
}

function agregarServicio() {
    let nombre = document.getElementById("nombre").value;
    let duracionTexto = document.getElementById("duracion").value;
    let precioTexto = document.getElementById("precio").value;

    if (nombre.trim() == "" || duracionTexto == "" ||
        precioTexto == "") {
        document.getElementById("mensaje").textContent =
            "Todos los campos son obligatorios.";
        return;
    }

    let duracion = Number(duracionTexto);
    let precio = Number(precioTexto);

    if (duracion <= 0 || precio < 0) {
        document.getElementById("mensaje").textContent =
            "Verifique la duración y el precio.";
        return;
    }

    servicios.push({
        nombre: nombre,
        duracion: duracion,
        precio: precio
    });

    mostrarServicios();

    document.getElementById("nombre").value = "";
    document.getElementById("duracion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("mensaje").textContent = "";
}

mostrarServicios();
