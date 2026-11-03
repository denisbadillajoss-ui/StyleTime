
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>StyleTime - Recordatorios</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Recordatorios de citas</h1>
        <a href="index.html">Volver al inicio</a>
    </header>

    <main>
        <section>
            <h2>Registrar recordatorio</h2>

            <label for="cliente">Cliente:</label>
            <input type="text" id="cliente">

            <label for="mensajeTexto">Mensaje:</label>
            <textarea id="mensajeTexto"></textarea>

            <button type="button" onclick="agregarRecordatorio()">
                Agregar recordatorio
            </button>

            <p id="mensaje" class="mensaje"></p>
        </section>

        <section>
            <h2>Recordatorios registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Mensaje</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="tablaRecordatorios"></tbody>
            </table>
        </section>
    </main>

    <script src="js/recordatorios.js"></script>
</body>
</html>
