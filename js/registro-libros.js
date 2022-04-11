const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroLibros = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Libro Registrado con Exito"
        });
    }

}

btnRegistrar.addEventListener('click', validarRegistroLibros);