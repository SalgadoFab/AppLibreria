const btnRegistrarDes = document.getElementById('btnDes');

const validarRegistroDes = () => {

    let hayError = validarParametroDes();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El descuento no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "El descuento fue registrado con exito"
        });
    }

}

btnRegistrarDes.addEventListener('click', validarRegistroDes);