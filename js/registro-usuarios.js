//Obtener campos de Contraseña 
const txtPassword = document.getElementById('txt-password');
const txtPasswordConfirmacion = document.getElementById('txt-password-confirmacion');

const btnRegistrar = document.getElementById('btnGuardar')


//Funcion de Validacion

const validarRegistroUsuario = () => {
    
    //Creamos la letiable de error y le asignamos el valor que devuelva nuestra funcion de validacion de campos del formulario
    //IMPORTANTE - Esta funcion valida solo si el campo se encuentra vacio, para casos mas espesificos crear una validaciones aparte
    let hayError = validarFormulario();


    //Validamos la igualdad entre campos de password
    if (txtPassword.value != txtPasswordConfirmacion.value) {
        hayError = true;

        txtPassword.classList.add("inputError");
        txtPasswordConfirmacion.classList.add("inputError");
    }

    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El usuario no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la letiable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Bienvenido",
            "text": "Usuario Registrado con exito"
        });
    }

} 

//Referenciamos a nuestro boton registrar con el evento click para ejecutar nuestra funcion de validacion
btnRegistrar.addEventListener('click', validarRegistroUsuario);