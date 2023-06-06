var emailInput = document.getElementById('InputEmail');
var nameInput = document.getElementById('InputName');
var passwordInput = document.getElementById('InputPassword');
var passwordRInput = document.getElementById('InputPasswordR');


emailInput.addEventListener('input', validarEmailInput);
passwordInput.addEventListener('input', validarPasswordInput);
passwordRInput.addEventListener('input', validarPasswordRInput);


function validarEmailInput() {
    var email = emailInput.value;
    if (validarEmail(email)) {
        emailInput.classList.remove('is-invalid');
        document.getElementById('emailError').textContent = '';
        return true;
    } else {
        emailInput.classList.add('is-invalid');
        document.getElementById('emailError').textContent = 'Ingresa una dirección de correo electrónico válida.';
        return false;
    }
}


function validarPasswordInput() {
    var password = passwordInput.value;
    if (validarPassword(password)) {
        passwordInput.classList.remove('is-invalid');
        document.getElementById('passwordError').textContent = '';
        return true;
    } else {
        passwordInput.classList.add('is-invalid');
        document.getElementById('passwordError').textContent = 'La contraseña debe contener al menos 8 caracteres alfanuméricos.';
        return false;
    }
}

function validarPasswordRInput() {
    var password = passwordInput.value;
    var passwordR = passwordRInput.value;
    if (password !== passwordR) {
        passwordRError.textContent = 'Las contraseñas no coinciden';
        return false;
    } else {
        passwordRError.textContent = '';
        return true;
    }
}

function validarEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    var emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

function validarPassword(password) {
    // Expresión regular para validar que la contraseña contenga al menos 8 caracteres alfanuméricos
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

async function register() {
    if (validarEmailInput() && validarPasswordInput() && validarPasswordRInput()) {
        var response = await fetch("http://localhost:3000/usuarios?email=" + emailInput.value)
        var data = await response.json()

        if (data.length > 0) {
            emailInput.classList.add('is-invalid');
            document.getElementById('emailError').textContent = 'Correo ya registrado';
            return;
        }

        var usr = {
            email: emailInput.value,
            password: passwordInput.value,
            nombre: nameInput.value,
            tipo: "usuario",
            sexo: "",
            edad: "",
            altura: "",
            peso: "",
            cadera: "",
            cintura: "",
            pecho: ""
        }

        try {

            var responsePost = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usr)
            });

            if (responsePost.ok) {
                var dataPost = await responsePost.json();
                console.log('Usuario creado:', dataPost);
            } else {
                console.log('Error al crear el usuario:', responsePost.status);
                return;
            }

            window.open('index.html', '_self');

        } catch (error) {
            console.log('Error en la solicitud:', error);
        }

    }
}