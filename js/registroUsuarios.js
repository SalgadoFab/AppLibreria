//Obtener campos de Contraseña 
const txtPassword = document.getElementById('txt-password');
const txtPasswordConfirmacion = document.getElementById('txt-password-confirmacion');

const btnRegistrar = document.getElementById('btnGuardar')


//Funcion de Validacion

const validarRegistroUsuario = () => {
    //Variable para capturar errores en los inputs
    let hayError;

    //Obtemos todos los inputs que tengan la propiedad name="input"
    let inputsTxt = document.getElementsByName('input');

    //Hacemos un For, que se ejecutara mientras nuestra contador i se menor que la cantidad de inputsTexts obtenidos
    for (let i = 0; i < inputsTxt.length; i++) {
        
        //Validamos si el contenido del input esta vacio, de estarlo pasamos la variable de error a true y añadimos la clase de indicador de error  
        if (inputsTxt[i].value == '') {
            
            hayError = true 
            inputsTxt[i].classList.add('inputError')

        } else {
            //Si no esta vacio quitamos la clase de error
            inputsTxt[i].classList.remove('inputError')
        }
        
    }

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

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Bienvenido",
            "text": "Usuario Registrado con exito"
        });
    }

} 

btnRegistrar.addEventListener('click', validarRegistroUsuario);