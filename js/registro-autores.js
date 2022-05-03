'use strict';
const inputnombreCompleto = document.querySelector('#txt-nombreCompleto')
const inputAnoNacimiento = document.querySelector('#txt-anoNacimiento')
const inputAnoDefuncion = document.querySelector('#txt-anoDefuncion')
const inputNacionalidad = document.querySelector('#txt-nacionalidad')
const inputBiografia = document.querySelector('#txt-biografia')
const inputListaObras = document.querySelector('#txt-listaObras')
const inputAnoPremioNobel = document.querySelector('#txt-anoPremioNobel')

const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroAutor = () => {

    let hayError = validarFormulario();

    let imagen = document.querySelector('#photo');

    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "El autor no se puede registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        let autor = {
            nombreAutor: inputnombreCompleto.value,
            nacimiento: inputAnoNacimiento.value,
            foto: imagen.src,
            defuncion: inputAnoDefuncion.value,
            nacionalidad: inputNacionalidad.value,
            bibliografia: inputBiografia.value,
            libros: inputListaObras.value,
            annoNobel: inputAnoPremioNobel.value,
        };

        registrarDatos('registrar-autor', autor);
    }

};

btnRegistrar.addEventListener('click', validarRegistroAutor);