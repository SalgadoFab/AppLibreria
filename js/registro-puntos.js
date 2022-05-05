let lista_Socios = [];

const sltSocios = document.getElementById('slt-socio');

const inicializarSocios = async() => {
    lista_Socios = await obtenerDatos('obtener-socios');
    for (let i = 0; i < lista_Socios.length; i++) {
        let opt = document.createElement('option');
        opt.value = lista_Socios[i].nombre;
        opt.innerHTML = lista_Socios[i].nombre;
        sltSocios.appendChild(opt);
    }
};

inicializarSocios();

const txtDireccion = document.getElementById('txt-direccion');

const btnRegistrar = document.getElementById('btnGuardar');
const validarRegistroPunto = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El punto de retiro no se puede registrar",
            "text": "Compruebe que todos los campos estan correctamente llenos"
        });

    } else {

        let punto = {
            socioComercial: sltSocios.value,
            direccion: txtDireccion.value,
        };

        registrarDatos('/registrar-punto', punto);
    }

}

btnRegistrar.addEventListener('click', validarRegistroPunto);