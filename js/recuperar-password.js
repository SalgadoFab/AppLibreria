const btnActualizarPassword = document.getElementById('btnActualizarPassword');
let listaUsuarios

const inicializarUsuarios = async() => {
    listaUsuarios = await obtenerDatos('obtener-usuarios');
    btnActualizarPassword.classList.add('btnDesactivado')
    console.log(listaUsuarios);
};
inicializarUsuarios();

const txtCorreo = document.getElementById('txt-correo');
const txtCodigo = document.getElementById('txt-codigo');
const txtPassword = document.getElementById('txt-nuevo-password');
const txtPasswordConfirmacion = document.getElementById('txt-password-confirmacion');

//Variable que contiene si el password tiene errores de requerimientos
let errorRequerimientoPassword = false;

//Funcion de Validacion de requerimientos de contraseña
(function() {
    //Obtenemos el campo de contraseña
    let password = document.querySelector('.password');
    console.log(password)

    //Obtemos
    let requerimientoPassword = {
        longitudCaracteres: document.querySelector('.texto-ayuda .longitud'),
        minuscula: document.querySelector('.texto-ayuda .minuscula'),
        mayuscula: document.querySelector('.texto-ayuda .mayuscula'),
        caracter: document.querySelector('.texto-ayuda .caracter')
    };

    console.log(requerimientoPassword.longitudCaracteres)

    //Patron de requerimientos para la contraseña, funciona como un array de funciones
    let patron = {
        //Valida que la contraseña tenga 8 o mas caracteres
        longitudCaracteres: function() {
            //Valida que la contraseña tenga 8 o mas caracteres 
            if (password.value.length >= 8) {
                return true;
            }
        },
        //Valida que la contraseña contenga minusculas 
        minuscula: function() {
            //La variable requerimiento almacena el requisito a validar de la contraseña
            let requerimiento = /^(?=.*[a-z]).+$/;

            //Se testea el requerimiento expresado a la contraseña
            if (requerimiento.test(password.value)) {
                return true;
            }
        },
        //Valida que la contraseña contenga mayusculas
        mayuscula: function() {
            //La variable requerimiento almacena el requisito a validar de la contraseña
            let requerimiento = /^(?=.*[A-Z]).+$/;

            //Se testea el requerimiento expresado a la contraseña
            if (requerimiento.test(password.value)) {
                return true;
            }
        },
        //Valida que la contraseña contenga caracteres alfanumericos 
        caracter: function() {
            //La variable requerimiento almacena el requisito a validar de la contraseña
            let requerimiento = /^(?=.*[0-9_\W]).+$/; // caracter character or number patron

            if (requerimiento.test(password.value)) {
                return true;
            }
        }
    };

    //Se ejecuta la validacion de la contraseña en tiempo real con cada valor ingresado al input
    password.addEventListener('keyup', function() {
        //Verifica que la contraseña tenga un mínimo de 8 caracteres
        validarPatron(patron.longitudCaracteres(), requerimientoPassword.longitudCaracteres);

        //Verifica que la contraseña contenga una letra minúscula
        validarPatron(patron.minuscula(), requerimientoPassword.minuscula);

        //Verifica que la contraseña contenga una letra mayuscula
        validarPatron(patron.mayuscula(), requerimientoPassword.mayuscula);

        //Verifica que la contraseña contenga un número o caracter
        validarPatron(patron.caracter(), requerimientoPassword.caracter);

        //Valida que todos los requerimientos contengan la clase validado
        if (validarClase(requerimientoPassword.longitudCaracteres, 'validado') && validarClase(requerimientoPassword.minuscula, 'validado') && validarClase(requerimientoPassword.mayuscula, 'validado') && validarClase(requerimientoPassword.caracter, 'validado')) {
            console.log("PASSWORD Valida")
            errorRequerimientoPassword = false
            txtPassword.classList.remove("inputError");
        } else {
            console.log("PASSWORD Invalida")
            errorRequerimientoPassword = true

            txtPassword.classList.add("inputError");
        }
    });

    //Funcion de validacion reutilizable para cada requerimiento de la contraseña
    function validarPatron(patron, requerimiento) {
        //Si el patron es validado agregamos la clase validado
        if (patron) {
            agregarClase(requerimiento, 'validado');
        }
        //Si el patron falla removemos la clase validado
        else {
            removerClase(requerimiento, 'validado');
        }
    }

    function agregarClase(elemento, nombreClase) {

        //Agregamos la clase obtenida por parametro del elemento necesario
        if (elemento.classList) {
            elemento.classList.add(nombreClase);
        } else {
            elemento.className += ' ' + nombreClase;
        }
    }

    function removerClase(elemento, nombreClase) {

        //Removemos la clase obtenida por parametro del elemento necesario
        if (elemento.classList) {
            elemento.classList.remove(nombreClase);
        } else {
            elemento.className = elemento.className.replace(new RegExp('(^|\\b)' + nombreClase.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    function validarClase(elemento, nombreClase) {

        //Valida que el elemento contenga la clase recibida por parametro
        if (elemento.classList) {
            return elemento.classList.contains(nombreClase);
        } else {
            new RegExp('(^| )' + nombreClase + '( |$)', 'gi').test(elemento.className);
        }
    }

})();

// this of eye method
const mostrarPassword = (input, selector) => {
    if (input.classList.contains('activo')) {
        input.setAttribute('type', 'text');
        selector.className = 'fa fa-eye';
        input.classList.remove('activo')
    } else {
        input.setAttribute('type', 'password');
        selector.className = 'fa fa-eye-slash';
        input.classList.add('activo')
    }
}


mostrarPass = document.getElementById('mostrarPassword');
mostrarPassConfirmacion = document.getElementById('mostrarPasswordConfirmacion');

mostrarPass.onclick = function() {
    mostrarPassword(txtPassword, mostrarPass)
}
mostrarPassConfirmacion.onclick = function() {
    mostrarPassword(txtPasswordConfirmacion, mostrarPassConfirmacion)
}



let codigo;
const codePass = () => {
    codigo = '';
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
}

const btnObtenerCodigo = document.getElementById('btnObtenerCodigo');
const obtenerCodigo = () => {

    codePass();
    console.log(codigo);

    //Variable para capturar si el usuario ya esta registrado
    let usuarioRegistrado = false;
    let correoVacio = false;

    if (txtCorreo.value == '') {

        txtCorreo.classList.add('inputError');

        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Porfavor ingresa tu correo electronico',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        txtCorreo.classList.remove('inputError');

        //Recorremos todos los usuarios y validamos los datos ingresados con el json de usuarios
        listaUsuarios.forEach(userArray => {
            if ((userArray.correo == txtCorreo.value)) {
                usuarioRegistrado = true;
            }
        });

        if (usuarioRegistrado == false) {
            Swal.fire({
                "icon": "warning",
                "title": "Error",
                "text": "El correo electronico ingresado no ha sido registrado previamente"
            });

        } else {
            Swal.fire({
                "icon": "success",
                "title": "Codigo Obtenido",
                "text": codigo
            });
            btnActualizarPassword.classList.remove('btnDesactivado')
        }
    }
}
btnObtenerCodigo.addEventListener('click', obtenerCodigo);



const actualizarPassword = () => {
    let errorCamposVacios = validarFormulario();

    //Validamos la igualdad entre campos de password
    if (txtPassword.value != txtPasswordConfirmacion.value) {
        errorCamposVacios = true;

        txtPassword.classList.add("inputError");
        txtPasswordConfirmacion.classList.add("inputError");
    }

    if (errorRequerimientoPassword == true) {
        txtPassword.classList.add("inputError");
    }


    let errorCodigoSeguridad = false;

    if (txtCodigo.value != codigo) {
        errorCodigoSeguridad = true
        txtCodigo.classList.add("inputError");
    } else {
        errorCodigoSeguridad = false
        txtCodigo.classList.remove("inputError");
    }

    //Mensaje del resultado de la validacion
    if ((errorCamposVacios == true) || (errorRequerimientoPassword == true) || (errorCodigoSeguridad == true)) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que todos los campos estan correctamente llenos"
        });

    } else { //Si la letiable de error termina en false esto lanza un popup al usuario para indicar actualizacion exitoso
        Swal.fire({
            "icon": "success",
            "title": "Contraseña Actualizada",
            "text": "Tu informacion ha sido actualizada correctamente"
        }).then(() => {
            window.location.href = '/html/inicio-sesion.html';
        });
    }
}
btnActualizarPassword.addEventListener('click', actualizarPassword);