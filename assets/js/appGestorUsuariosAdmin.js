document.addEventListener('DOMContentLoaded', onStart);

async function onStart() {
    try {
        var tbody = document.querySelector("table tbody");
        var response = await fetch("http://localhost:3000/usuarios")
        var data = await response.json()

        for (i = data.length - 1; i > -1; i--) {
            if (data[i].tipo == "admin") {
                continue
            }
            crearFila(data[i])
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }

    async function crearFila(elemento) {
        var fila = document.createElement("tr");

        var celdaNombre = document.createElement("td");
        celdaNombre.textContent = elemento.nombre;
        fila.appendChild(celdaNombre);

        var celdaEmail = document.createElement("td");
        celdaEmail.textContent = elemento.email;
        fila.appendChild(celdaEmail);

        var celdaDieta = document.createElement("td");
        celdaDieta.textContent = elemento.dieta;
        if (elemento.dieta == "") {
            celdaDieta.textContent = "Sin dieta activa"
        }
        fila.appendChild(celdaDieta);

        revision = await getRevision(elemento.email)

        var celdaFechaRevision = document.createElement("td");
        celdaFechaRevision.textContent = " "
        fila.appendChild(celdaFechaRevision);
        var celdaResultadoRevision = document.createElement("td");
        celdaResultadoRevision.textContent = " "
        fila.appendChild(celdaResultadoRevision);

        if (revision.length != 0) {
            celdaFechaRevision.textContent = revision[0].fecha;
            celdaResultadoRevision.textContent = revision[0].calificacion;
        }

        var celdaBtnVerAgenda = document.createElement('td');
        var btnVerAgenda = document.createElement('button');
        btnVerAgenda.type = 'button';
        btnVerAgenda.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-agenda-' + elemento.email);
        btnVerAgenda.textContent = 'ver agenda';
        btnVerAgenda.setAttribute('data-bs-toggle', 'modal');
        btnVerAgenda.setAttribute('data-bs-target', '#detalleModal');
        celdaBtnVerAgenda.appendChild(btnVerAgenda)
        fila.appendChild(celdaBtnVerAgenda)
        btnVerAgenda.addEventListener('click', function () {
            document.getElementById('detalleModalLabel').textContent = "Agenda"
            document.getElementById('modal-detalle-body').textContent = ""
            buildAgendaModal(elemento.email)
        })

        var celdaBtnRevision = document.createElement('td');
        var btnRevision = document.createElement('button');
        btnRevision.type = 'button';
        btnRevision.classList.add('btn', 'btn-success', 'btn-sm', 'btn-revision-' + elemento.email);
        btnRevision.textContent = 'Hacer Revision';
        btnRevision.setAttribute('data-bs-toggle', 'modal');
        btnRevision.setAttribute('data-bs-target', '#revisionModal');
        celdaBtnRevision.appendChild(btnRevision)
        fila.appendChild(celdaBtnRevision)
        btnRevision.addEventListener('click', function () {
            var clasesButton = btnRevision.classList
            var ultimaClase = clasesButton[clasesButton.length - 1]
            const elementoEmail = ultimaClase.split('-').pop()
            sessionStorage.setItem('email-revision', elementoEmail)
            console.log(elementoEmail)
        })

        tbody.appendChild(fila);
    }
}

async function getRevision(email) {
    try {
        var response = await fetch("http://localhost:3000/revisiones?email=" + email)
        var revision = await response.json()
        return revision
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}

async function buildAgendaModal(email) {
    try {
        var response = await fetch("http://localhost:3000/agenda?email=" + email)
        var agenda = await response.json()
        var body = document.getElementById('modal-detalle-body')

        eliminarHijos(body)

        if (agenda.length != 0) {
            for (i = agenda.length - 1; i > -1; i--) {

                fecha = document.createElement('p')
                fecha.textContent = "Fecha: " + agenda[i].fecha
                console.log(agenda[i])
                body.appendChild(fecha)

                nombreComida = document.createElement('p')
                nombreComida.textContent = "Nombre de comida: " + agenda[i].nombre
                body.appendChild(nombreComida)

                detalleComida = document.createElement('p')
                detalleComida.textContent = "Nombre de comida: " + agenda[i].detalle
                body.appendChild(detalleComida)

                separador = document.createElement('p')
                separador.textContent = "-------------------------------------------------------------------------------------------"
                body.appendChild(separador)
            }
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}

function eliminarHijos(elementoPadre) {
    const hijos = elementoPadre.childNodes;

    const hijosArray = Array.from(hijos);

    hijosArray.forEach(function (hijo) {
        elementoPadre.removeChild(hijo);
    });
}

async function hacerRevision() {
    if (document.getElementById("InputCalificacion").value == ""
        || document.getElementById("InputDetalle").value == "") {
        document.getElementById('RevisionError').textContent = 'Fallo al agregar: completa todos los campos necesarios';
        return
    }
    document.getElementById('RevisionError').textContent = ''

    var sessionEmail = sessionStorage.getItem('email-revision')

    try {

        savedRevision = await getRevision(sessionEmail)
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);

        var revision = {
            email: sessionEmail,
            calificacion: document.getElementById("InputCalificacion").value,
            detalle: document.getElementById("InputDetalle").value,
            fecha: hoy.toLocaleDateString()
        }

        if (savedRevision.length != 0) {

            var revisionPut = {
                id: savedRevision.id,
                email: sessionEmail,
                calificacion: document.getElementById("InputCalificacion").value,
                detalle: document.getElementById("InputDetalle").value,
                fecha: hoy.toLocaleDateString()
            }
            await fetch('http://localhost:3000/revisiones/' + savedRevision[0].id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(revisionPut)
            });
        } else {
            await fetch('http://localhost:3000/revisiones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(revision)
        });
        }

    } catch (error) {

    }





}

