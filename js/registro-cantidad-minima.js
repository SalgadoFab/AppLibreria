const btnRegistrarCantidad = document.getElementById('btnCantidad');

const validarRegistroCantidad = () => {

    let hayError = validarParametroCantidad();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "La cantidad minima no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Cantidad minima registrado con exito"
        });
        let cantidadMinima = {
            cantidad: input-css.value
        };

        registrarDatos(cantidadMinima, '/registrar-parametros-Cantidad-Minima-LibroFan');
    }

}

btnRegistrarCantidad.addEventListener('click', validarRegistroCantidad);