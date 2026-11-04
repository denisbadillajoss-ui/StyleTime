let trabajadores = [
    {nombre: "Maria", especialidad: "Estilista", horario: "08:00 a 17:00"},
    {nombre: "Pedro", especialidad: "Barbero", horario: "09:00 a 18:00"}
];

function mostrarTrabajadores() {
    let texto = "";

    for (let i = 0; i < trabajadores.length; i++) {
        texto += "<tr>";
        texto += "<td>" + trabajadores[i].nombre + "</td>";
        texto += "<td>" + trabajadores[i].especialidad + "</td>";
        texto += "<td>" + trabajadores[i].horario + "</td>";
        texto += "</tr>";
    }

    document.getElementById("tablaTrabajadores").innerHTML = texto;
}

function agregarTrabajador() {
    let nombre = document.getElementById("nombre").value;
    let especialidad = document.getElementById("especialidad").value;
    let horario = document.getElementById("horario").value;

    if (nombre.trim() == "" || especialidad.trim() == "" ||
        horario.trim() == "") {
        mostrarMensaje("mensaje", "Todos los campos son obligatorios.", "danger");
        return;
    }

    trabajadores.push({
        nombre: nombre,
        especialidad: especialidad,
        horario: horario
    });

    mostrarTrabajadores();

    document.getElementById("nombre").value = "";
    document.getElementById("especialidad").value = "";
    document.getElementById("horario").value = "";
    mostrarMensaje("mensaje", "Trabajador registrado correctamente.", "success");
}

mostrarTrabajadores();
