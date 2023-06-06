document.addEventListener('DOMContentLoaded', onStart);

async function onStart() {
    try {
        var response = await fetch("http://localhost:3000/usuarios?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()
        var usuario = data[0]

        if (usuario.dieta != "") {
            document.getElementById('dieta-actual').textContent = usuario.dieta
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }


    try {
        var tbody = document.querySelector("table tbody");
        var response = await fetch("http://localhost:3000/agenda?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()

        for (i = data.length - 1; i > -1; i--) {
            crearFila(data[i])
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }

    function crearFila(elemento) {
        var fila = document.createElement("tr");

        var celdaFecha = document.createElement("td");
        celdaFecha.textContent = elemento.fecha;
        fila.appendChild(celdaFecha);

        var celdaNombre = document.createElement("td");
        celdaNombre.textContent = elemento.nombre;
        fila.appendChild(celdaNombre);

        var celdaDieta = document.createElement("td");
        celdaDieta.textContent = elemento.dieta;
        fila.appendChild(celdaDieta);

        var celdaBtnDetalle = document.createElement('td');
        var btnDetalle = document.createElement('button');
        btnDetalle.type = 'button';
        btnDetalle.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-detalle-' + elemento.id);
        btnDetalle.textContent = 'ver detalle';
        btnDetalle.setAttribute('data-bs-toggle', 'modal');
        btnDetalle.setAttribute('data-bs-target', '#detalleModal');
        celdaBtnDetalle.appendChild(btnDetalle)
        fila.appendChild(celdaBtnDetalle)

        btnDetalle.addEventListener('click', function () {
            document.getElementById('detalleModalLabel').textContent = "Informacion de consumo"
            document.getElementById('modal-detalle-body').textContent = elemento.detalle
        })

        var celdaBtnEliminar = document.createElement('td');
        var btnEliminar = document.createElement('button');
        btnEliminar.type = 'button';
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-eliminar-' + elemento.id);
        btnEliminar.textContent = 'Eliminar';
        celdaBtnEliminar.appendChild(btnEliminar)
        fila.appendChild(celdaBtnEliminar)

        btnEliminar.addEventListener('click', function () {
            var idDato = this.classList.item(this.classList.length - 1).split('-').pop();
            eliminarDatoAgenda(idDato)
        })

        tbody.appendChild(fila);
    }

    async function eliminarDatoAgenda(id) {
        var response = await fetch('http://localhost:3000/agenda/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ""
        });

        if (response.ok) {
            console.log('Eliminado: ', id);
        } else {
            console.log('Error al eliminar: ', response.status);
        }
    }
}

async function agregarDatoAgenda() {

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    document.getElementById("dia-actual").textContent = hoy.toLocaleDateString()

    if (document.getElementById("InputNombre").value == "" || document.getElementById("InputDescripcion").value == "") {
        document.getElementById('AgregarError').textContent = 'Fallo al agregar: completa todos los campos';
        return
    }
    document.getElementById('AgregarError').textContent = '';

    try {
        var response = await fetch("http://localhost:3000/usuarios?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()
        var usuario = data[0]
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }

    agenda = {
        email: localStorage.getItem('user-logged'),
        fecha: hoy.toLocaleDateString(),
        nombre: document.getElementById("InputNombre").value,
        detalle: document.getElementById("InputDescripcion").value,
        dieta: usuario.dieta
    }

    await fetch('http://localhost:3000/agenda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agenda)
    });
}

async function verRevision() {
    var response = await fetch("http://localhost:3000/revisiones?email=" + localStorage.getItem('user-logged'))
    var data = await response.json()
    var revision = data[0]

    if (data.length > 0) {
        document.getElementById('detalleModalLabel').textContent = "Revision del " + revision.fecha
        document.getElementById('modal-detalle-body').textContent = ""
        body = document.getElementById('modal-detalle-body')

        calificacion = document.createElement('p')
        calificacion.textContent = "Calificación: " + revision.calificacion
        body.appendChild(calificacion)

        detalle = document.createElement('p')
        detalle.textContent = "Detalle: " + revision.detalle
        body.appendChild(detalle)
    } else {
        document.getElementById('detalleModalLabel').textContent = "Sin revisiones"
        document.getElementById('modal-detalle-body').textContent = ""
    }
}