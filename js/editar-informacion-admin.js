//Obtener campos de Contraseña 
const txtPassword = document.getElementById('txt-password');
const txtPasswordConfirmacion = document.getElementById('txt-password-confirmacion');
const btnActualizar = document.getElementById('btnActualizar');
const txtCodigo = document.getElementById('txt-codigo');

//Variable que contiene si el password tiene errores de requerimientos
let errorRequerimientoPassword = false;

//Funcion de Validacion de requerimientos de contraseña
(function() {
    //Obtenemos el campo de contraseña
    let password = document.querySelector('.password');
    console.log(password)

    //Obtenemos los campos de ayuda
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

//Funcion de Validacion de campos normales
const validarEditarInformacionAdmin = () => {

    //Creamos la letiable de error y le asignamos el valor que devuelva nuestra funcion de validacion de campos del formulario
    //IMPORTANTE - Esta funcion valida solo si el campo se encuentra vacio, para casos mas espesificos crear una validaciones aparte
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

    console.log(errorCamposVacios)

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
            "title": "Informacion Actualizada",
            "text": "Tu informacion ha sido actualizada correctamente"
        });
    }

}

//Referenciamos a nuestro boton registrar con el evento click para ejecutar nuestra funcion de validacion
btnActualizar.addEventListener('click', validarEditarInformacionAdmin);


let codigo;
const codePass = () => {
    codigo = '';
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
}

const btnEnviarCodigo = document.getElementById('btnEnviarCodigo');
btnEnviarCodigo.onclick = function() {

    codePass();
    console.log(codigo);

    let codigoEnviado = true;

    if ((codigoEnviado == true)) {
        Swal.fire({
            "icon": "success",
            "title": "Codigo Enviado",
            "text": "Revisa tu bandeja de entrada para obtener el codigo de seguridad"
        });
        codigoEnviado = false;
    }

}