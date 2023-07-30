document.addEventListener('DOMContentLoaded', onStart);

async function onStart() {
    try {
        var response = await fetch("http://localhost:3000/usuarios?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()
        var usuario = data[0]

        if(usuario.dieta != "") {
            document.getElementById('dieta-actual').textContent = usuario.dieta
        } 

        if (usuario.sexo == "" || usuario.edad == "" ||
            usuario.altura == "" || usuario.peso == "" ||
            usuario.cadera == "" || usuario.cintura == "" ||
            usuario.pecho == "") {

            document.getElementById('configError').textContent = 'Recuerda completar tus datos en: Mi cuenta -> Configuración';
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }

    try {
        var cardsList = document.querySelector('.cards-list');
        var response = await fetch("http://localhost:3000/dietas")
        var cardsJSON = await response.json()

        cardsJSON.forEach(function (cardJSON) {
            card = buildCard("card-" + cardJSON.id, cardJSON.imagen, cardJSON.titulo, cardJSON.subtitulo, cardJSON.descripcion)
            cardsList.appendChild(card);
        });

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}


function buildCard(className, imgSrc, title, subtitulo, descripcion) {
    // Crear el elemento div con la clase especificada
    var cardDiv = document.createElement('div');
    cardDiv.classList.add(className);

    // Crear el elemento div para contener la imagen
    var imgContainerDiv = document.createElement('div');
    imgContainerDiv.classList.add('card-img-container');

    // Crear la etiqueta img y establecer el atributo src
    var img = document.createElement('img');
    img.src = `data:image/png;base64,${imgSrc}`;
    img.style.width = '750px';
    img.style.height = '400px';

    // Agregar la etiqueta img al div de contenedor de imagen
    imgContainerDiv.appendChild(img);

    // Crear el elemento div para el cuerpo de la tarjeta
    var cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Crear el elemento div para el título
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('card-body-title');

    // Crear la etiqueta h1 y establecer el texto
    var h1 = document.createElement('h1');
    h1.textContent = title;

    // Agregar la etiqueta h1 al div de título
    titleDiv.appendChild(h1);

    // Crear el elemento div para el subtítulo
    var subtitleDiv = document.createElement('div');
    subtitleDiv.classList.add('card-body-subtitle');

    // Crear la etiqueta p y establecer el texto
    var p = document.createElement('p');
    p.textContent = subtitulo;

    // Agregar la etiqueta p al div de subtítulo
    subtitleDiv.appendChild(p);

    // Crear el elemento div para "Más información" y "Aceptar Dieta"
    var knowMoreDiv = document.createElement('div');
    knowMoreDiv.classList.add('card-know-more');

    // Crear los botones "Más información" y "Aceptar Dieta"
    var btnMoreInfo = document.createElement('button');
    btnMoreInfo.type = 'button';
    btnMoreInfo.classList.add('btn', 'btn-primary', 'btn-sm', 'btn-more-info-' + className);
    btnMoreInfo.setAttribute('data-bs-toggle', 'modal');
    btnMoreInfo.setAttribute('data-bs-target', '#dietaModal');
    btnMoreInfo.textContent = 'Más información';

    // Detecto si el boton fue presionado (esto no deberia estar aca pero no se donde ponerlo dado que el boton no existe hasta este momento)
    btnMoreInfo.addEventListener('click', function() {
        document.getElementById('dietaModalLabel').textContent = "Informacion de dieta"
        document.getElementById('modal-body').textContent = descripcion
    });

    var btnAcceptDiet = document.createElement('button');
    btnAcceptDiet.type = 'button';
    btnAcceptDiet.classList.add('btn', 'btn-success', 'btn-sm', 'btn-accept-diet-' + className);
    btnAcceptDiet.textContent = 'Aceptar Dieta';

    btnAcceptDiet.addEventListener('click', function() {
        cambiarDieta(title)
    });

    // Agregar los botones al div de "Más información" y "Aceptar Dieta"
    knowMoreDiv.appendChild(btnMoreInfo);
    knowMoreDiv.appendChild(btnAcceptDiet);

    // Agregar los elementos al cuerpo de la tarjeta
    cardBodyDiv.appendChild(titleDiv);
    cardBodyDiv.appendChild(subtitleDiv);
    cardBodyDiv.appendChild(knowMoreDiv);

    // Agregar los elementos al div principal de la tarjeta
    cardDiv.appendChild(imgContainerDiv);
    cardDiv.appendChild(cardBodyDiv);

    // Devolver la tarjeta construida
    return cardDiv;
}

async function cambiarDieta(titulo) {
    try {
        var response = await fetch("http://localhost:3000/usuarios?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()
        var usuario = data[0]

        var dieta = {
            id: usuario.id,
            email: usuario.email,
            password: usuario.password,
            nombre: usuario.nombre,
            tipo: usuario.tipo,
            sexo: usuario.sexo,
            edad: usuario.edad,
            altura: usuario.altura,
            peso: usuario.peso,
            cadera: usuario.cadera,
            cintura: usuario.cintura,
            pecho: usuario.pecho,
            dieta: titulo
        }

        var responsePut = await fetch('http://localhost:3000/usuarios/' + usuario.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dieta)
        });

        if (responsePut.ok) {
            var dataPut = await responsePut.json();
            console.log('Dieta modificada: ', dataPut);
        } else {
            console.log('Error al modificar la dieta: ', responsePut.status);
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}