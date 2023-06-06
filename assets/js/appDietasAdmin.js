document.addEventListener('DOMContentLoaded', onStart);

async function onStart() {
    try {
        var tbody = document.querySelector("table tbody");
        var response = await fetch("http://localhost:3000/dietas")
        var data = await response.json()

        for (i = data.length - 1; i > -1; i--) {
            crearFila(data[i])
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }

    function crearFila(elemento) {
        var fila = document.createElement("tr");

        var celdaTitulo = document.createElement("td");
        celdaTitulo.textContent = elemento.titulo;
        fila.appendChild(celdaTitulo);

        var celdaBtnSubtitulo = document.createElement('td');
        var btnSubtitulo = document.createElement('button');
        btnSubtitulo.type = 'button';
        btnSubtitulo.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-subtitulo-' + elemento.id);
        btnSubtitulo.textContent = 'ver subtitulo';
        btnSubtitulo.setAttribute('data-bs-toggle', 'modal');
        btnSubtitulo.setAttribute('data-bs-target', '#detalleModal');
        celdaBtnSubtitulo.appendChild(btnSubtitulo)
        fila.appendChild(celdaBtnSubtitulo)
        btnSubtitulo.addEventListener('click', function () {
            document.getElementById('detalleModalLabel').textContent = "Subtitulo de dieta"
            document.getElementById('modal-detalle-body').textContent = elemento.subtitulo
        })

        var celdaBtnDescripcion = document.createElement('td');
        var btnDescripcion = document.createElement('button');
        btnDescripcion.type = 'button';
        btnDescripcion.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-descripcion-' + elemento.id);
        btnDescripcion.textContent = 'ver descripción';
        btnDescripcion.setAttribute('data-bs-toggle', 'modal');
        btnDescripcion.setAttribute('data-bs-target', '#detalleModal');
        celdaBtnDescripcion.appendChild(btnDescripcion)
        fila.appendChild(celdaBtnDescripcion)
        btnDescripcion.addEventListener('click', function () {
            document.getElementById('detalleModalLabel').textContent = "Descripción de dieta"
            document.getElementById('modal-detalle-body').textContent = elemento.descripcion
        })

        var celdaBtnImagen = document.createElement('td');
        var btnImagen = document.createElement('button');
        btnImagen.type = 'button';
        btnImagen.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-imagen-' + elemento.id);
        btnImagen.textContent = 'ver imagen';
        celdaBtnImagen.appendChild(btnImagen)
        fila.appendChild(celdaBtnImagen)

        btnImagen.addEventListener('click', function () {
            window.open('assets/images/' + elemento.imagen, '_blank');
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
            eliminarDieta(idDato)
        })

        tbody.appendChild(fila);
    }

    async function eliminarDieta(id) {
        var response = await fetch('http://localhost:3000/dietas/' + id, {
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

async function agregarDieta() {

    if (document.getElementById("InputTitulo").value == ""
        || document.getElementById("InputSubtitulo").value == ""
        || document.getElementById("InputDescripcion").value == "") {
        document.getElementById('AgregarError').textContent = 'Fallo al agregar: completa todos los campos necesarios';
        return
    }

    img = "card-img-not-found.png"

    if(document.getElementById("InputImagen").value != "") {
        img = document.getElementById("InputImagen").value
    }

    dieta = {
        titulo: document.getElementById("InputTitulo").value,
        subtitulo: document.getElementById("InputSubtitulo").value,
        descripcion: document.getElementById("InputDescripcion").value,
        imagen: img
    }

    await fetch('http://localhost:3000/dietas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dieta)
    });
}