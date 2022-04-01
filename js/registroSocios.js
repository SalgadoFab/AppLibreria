const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroSocio = () => {

    let hayError = validarFormulario();



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