const inputNombreSocio = document.querySelector('#txt-nombre-socio')
const inputCodigoSocio = document.querySelector('#txt-codigo-socio')
const inputDireccionSocio = document.querySelector('#txt-direccion-socio')


const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroSocio = () => {

    let hayError = validarFormulario();
    let imagen = document.querySelector('#photo');

    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El socio comercial no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenos"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        let socio = {
            nombre: inputNombreSocio.value,
            logo: imagen.src,
            codigo: inputCodigoSocio.value,
            direccion: inputDireccionSocio.value
        };
        registrarDatos('registrar-socio', socio);
    }

}

btnRegistrar.addEventListener('click', validarRegistroSocio);