document.getElementById('addVentana').addEventListener('click', function () {
    const index = document.querySelectorAll('.ventana').length + 1;
    const newVentana = `
        <div class="ventana">
            <h4>Ventana ${index}</h4>
            <label for="ancho">Ancho (mm):</label>
            <input type="number" class="ancho" step="1" required>

            <label for="alto">Alto (mm):</label>
            <input type="number" class="alto" step="1" required>

            <label for="tipoVidrio">Tipo de vidrio:</label>
            <select class="tipoVidrio" required>
                <option value="simple">Simple</option>
                <option value="doble">Doble</option>
                <option value="templado">Templado</option>
            </select>

            <label for="tipoMarco">Tipo de marco:</label>
            <select class="tipoMarco" required>
                <option value="estándar">Estándar</option>
                <option value="premium">Premium</option>
            </select>

            <label for="tipoVentana">Tipo de ventana:</label>
            <select class="tipoVentana" required>
                <option value="practicable">Practicable</option>
                <option value="oscilobatiente">Oscilobatiente</option>
                <option value="corredera">Corredera</option>
            </select>

            <label for="color">Color:</label>
            <select class="color" required>
                <option value="blanco">Blanco</option>
                <option value="negro">Negro</option>
                <option value="gris">Gris</option>
                <option value="personalizado">Personalizado</option>
            </select>

            <label for="persianas">¿Necesita persianas?</label>
            <select class="persianas" required>
                <option value="no">No</option>
                <option value="si">Sí</option>
            </select>

            <label for="cantidad">Cantidad:</label>
            <input type="number" class="cantidad" required>
        </div>
    `;
    document.getElementById('ventanasContainer').insertAdjacentHTML('beforeend', newVentana);
});

document.getElementById('presupuestoForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Evitar recarga de página

    let totalPresupuesto = 0; // Inicializa el total del presupuesto
    let detallesVentanas = ''; // Variable para almacenar los detalles de las ventanas

    // Selecciona todas las ventanas
    const ventanas = document.querySelectorAll('.ventana');

    ventanas.forEach((ventana, index) => {
        // Capturar valores de cada ventana
        let ancho = parseFloat(ventana.querySelector('.ancho').value);
        let alto = parseFloat(ventana.querySelector('.alto').value);
        let tipoVidrio = ventana.querySelector('.tipoVidrio').value;
        let tipoMarco = ventana.querySelector('.tipoMarco').value;
        let tipoVentana = ventana.querySelector('.tipoVentana').value;
        let color = ventana.querySelector('.color').value;
        let persianas = ventana.querySelector('.persianas').value;
        let cantidad = parseInt(ventana.querySelector('.cantidad').value);

        // Convertir milímetros a metros
        let anchoMetros = ancho / 1000;
        let altoMetros = alto / 1000;

        // Calcular el área
        let area = anchoMetros * altoMetros;

        // Determinar el número de hojas
        let numeroHojas = 1; // Valor predeterminado
        if (tipoVentana === 'practicable' || tipoVentana === 'oscilobatiente') {
            if (ancho <= 800) {
                numeroHojas = 1;
            } else if (ancho <= 1400) {
                numeroHojas = 2;
            } else {
                numeroHojas = Math.ceil(ancho / 800);
            }
        } else if (tipoVentana === 'corredera') {
            if (ancho <= 800) {
                numeroHojas = 1;
            } else if (ancho <= 1600) {
                numeroHojas = 2;
            } else {
                numeroHojas = Math.ceil(ancho / 800);
            }
        }

        // Definir los costos
        let precioBase = 100;  // Precio base por metro cuadrado
        let costoVidrio = (tipoVidrio === 'doble') ? 1.5 : (tipoVidrio === 'templado') ? 2 : 1;
        let costoMarco = (tipoMarco === 'premium') ? 2 : 1;
        let costoVentana = (tipoVentana === 'corredera') ? 1.2 : 1; // Ajustar costos según el tipo
        let costoColor = (color === 'personalizado') ? 50 : 0;
        let costoPersianas = (persianas === 'si') ? 100 : 0;

        // Calcular el precio total para la ventana actual
        let totalVentana = (precioBase * area * costoVidrio * costoMarco * costoVentana * numeroHojas * cantidad) + costoColor + costoPersianas;

        // Sumar al total del presupuesto
        totalPresupuesto += totalVentana;

        // Detallar la ventana
        detallesVentanas += `<p>Ventana ${index + 1}: ${numeroHojas} hoja(s) - Precio: €${totalVentana.toFixed(2)}</p>`;

        // Lógica para mostrar la imagen de la ventana
        detallesVentanas += `<img src="${obtenerRutaImagen(tipoVentana)}" alt="Imagen de la ventana ${tipoVentana}" style="width:300px;" />`;
    });

    // Mostrar el resultado
    document.getElementById('resultado').innerHTML = `<h3>Presupuesto total: €${totalPresupuesto.toFixed(2)}</h3>` + detallesVentanas;
});

// Función para obtener la ruta de la imagen según el tipo de ventana
function obtenerRutaImagen(tipoVentana) {
    if (tipoVentana === 'practicable') {
        return '../img/practicable.jpg'; // Cambia esta ruta
    } else if (tipoVentana === 'oscilobatiente') {
        return '../img/oscilobatiente.jpg'; // Cambia esta ruta
    } else if (tipoVentana === 'corredera') {
        return '../img/corredera.jpg'; // Cambia esta ruta
    }
    return '';
}
