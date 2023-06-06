document.addEventListener('DOMContentLoaded', onStart);

var radios = document.querySelectorAll('input[name="sexRadios"]');


async function modificarConfiguracion() {

    var checkbox1 = document.getElementById('Radios1')
    var checkbox2 = document.getElementById('Radios2')

    if (checkbox1.checked) {
        putSexo = "h"
    } else if (checkbox2.checked) {
        putSexo = "m"
    }

    var edad = document.getElementById("inputEdad")
    putEdad = edad.value

    var altura = document.getElementById("inputAltura")
    putAltura = altura.value

    var peso = document.getElementById("inputPeso")
    putPeso = peso.value

    var cadera = document.getElementById("inputCadera")
    putCadera = cadera.value

    var cintura = document.getElementById("inputCintura")
    putCintura = cintura.value

    var pecho = document.getElementById("inputPecho")
    putPecho = pecho.value

    try {
        var response = await fetch("http://localhost:3000/usuarios?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()
        var usuario = data[0]
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }

    var conf = {
        id: usuario.id,
        email: usuario.email,
        password: usuario.password,
        nombre: usuario.nombre,
        tipo: "usuario",
        sexo: putSexo,
        edad: putEdad,
        altura: putAltura,
        peso: putPeso,
        cadera: putCadera,
        cintura: putCintura,
        pecho: putPecho,
        dieta: usuario.dieta
    }
        
    try {
        var responsePut = await fetch('http://localhost:3000/usuarios/'+usuario.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conf)
        });

        if (responsePut.ok) {
            var dataPut = await responsePut.json();
            console.log('Configuracion de usuario modificada: ', dataPut);
        } else {
            console.log('Error: ', responsePut.status);
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }


}


async function onStart() {
    try {

        var response = await fetch("http://localhost:3000/usuarios?email=" + localStorage.getItem('user-logged'))
        var data = await response.json()
        var usuario = data[0]

        if (usuario.sexo == "h") {
            document.getElementById("Radios1").checked = true
        } else if (usuario.sexo == "m") {
            document.getElementById("Radios2").checked = true
        }
        var edad = document.getElementById("inputEdad")
        edad.value = usuario.edad
        var altura = document.getElementById("inputAltura")
        altura.value = usuario.altura
        var peso = document.getElementById("inputPeso")
        peso.value = usuario.peso
        var cadera = document.getElementById("inputCadera")
        cadera.value = usuario.cadera
        var cintura = document.getElementById("inputCintura")
        cintura.value = usuario.cintura
        var pecho = document.getElementById("inputPecho")
        pecho.value = usuario.pecho


    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}