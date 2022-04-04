const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroPunto= () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El punto de retiro no se puede registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Punto de retiro registrado con exito"
        });
    }

}

btnRegistrar.addEventListener('click', validarRegistroPunto);