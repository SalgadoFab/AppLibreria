const inputProvincia = document.querySelector('#txt-provincia')
const inputCanton = document.querySelector('#txt-canton')
const inputDistrito = document.querySelector('#txt-distrito')
const inputDireccion = document.querySelector('#txt-direccion')

const btnRegistrar = document.getElementById('btnGuardarDireccion');

const validarRegistroDireccionEnvio = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "La direccion no ha sido guardada",
            "text": "Compruebe que todos los campos estan correctamente llenos"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso

        let direccionEnvio = {
            provincia: inputProvincia.value,
            canton: inputCanton.value,
            distrito: inputDistrito.value,
            direccion: inputDireccion.value,
        };
        registrarDatos('/registrar-direccion-envio', direccionEnvio);
    }

}

btnRegistrar.addEventListener('click', validarRegistroDireccionEnvio);