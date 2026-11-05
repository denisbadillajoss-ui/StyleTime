//Comprobación a las páginas
if (sessionStorage.getItem("sesion") != "administrador") {
    window.location.replace("login.html");
}

function cerrarSesion() {
    sessionStorage.removeItem("sesion");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function() {
    let enlaces = document.querySelectorAll(".session-link");

    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener("click", function(evento) {
            evento.preventDefault();
            cerrarSesion();
        });
    }
});
