const nombreSocio = document.getElementById('txt-nombreSocio');
const codigo = document.getElementById('txt-codigoSocio');

const btnRegistrar = document.getElementById('btn-registrar');

const validarRegistroSocio = () => {

    let hayError;


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
    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El socio comercial no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Socio Comercial registrado con exito"
        });
    }

}

btnRegistrar.addEventListener('click', validarRegistroSocio);