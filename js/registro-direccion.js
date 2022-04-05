const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroDireccionEnvio = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "La direccion no ha sido guardada",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Direccion guardada correctamente"
        });
    }

}

btnRegistrar.addEventListener('click', validarRegistroDireccionEnvio);