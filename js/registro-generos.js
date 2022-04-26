'use strict';
const inputTipoGenero = document.querySelector('#txt-tipoGenero')
const inputCodigoGenero = document.querySelector('#txt-codigoGenero')
const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroGenero = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El género literario no pudo ser registrado",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        let genero = {
            nombreGenero: inputTipoGenero.value,
            codigoGenero: inputCodigoGenero.value,

        };

        registrarDatos('/registrar-genero', genero);
    };

};

btnRegistrar.addEventListener('click', validarRegistroGenero);