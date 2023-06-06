var emailInput = document.getElementById('InputEmail');
var passwordInput = document.getElementById('InputPassword');

emailInput.addEventListener('input', validarEmailInput);
passwordInput.addEventListener('input', validarPasswordInput);

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

function validarEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    var emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}


async function login() {

    if (validarEmailInput()) {

        try {

            var response = await fetch("http://localhost:3000/usuarios?email=" + emailInput.value)
            var data = await response.json()

            if (data.length > 0) {
                var usuario = data[0]

                if (usuario.password == passwordInput.value) {
                    localStorage.setItem('user-logged', usuario.email)

                    if (usuario.tipo == "usuario") {
                        window.open('dietasUsuario.html', '_self');
                    } else if (usuario.tipo == "admin") {
                        window.open('dietasAdmin.html', '_self');
                    }

                } else {
                    emailInput.classList.add('is-invalid');
                    passwordInput.classList.add('is-invalid');
                    document.getElementById('passwordError').textContent = 'Usuario o contraseña incorrectos';
                }
            }
            
        } catch (error) {
            console.log('Error en la solicitud:', error);
        }
    }
}