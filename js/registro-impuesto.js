const btnRegistrarImpuesto = document.getElementById('btnImpuesto');

const validarRegistroImpuesto = () => {

    let hayError = validarParametroImpuesto();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El impuesto no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "El impuesto fue registrado con exito"
        });
    }

}

btnRegistrarImpuesto.addEventListener('click', validarRegistroImpuesto);