const listaProvincias = document.getElementById('slt-provincias');
const listaCantones = document.getElementById('slt-cantones');
const listaDistritos = document.getElementById('slt-distritos');

let provinciaSeleccionada,
    cantonSeleccionado;

const mostrarProvincias = () => {
    distribucion.provincias.forEach(provincia => {
        listaProvincias.options.add(new Option(provincia.title));
    });
};

const mostrarCantones = (nombreProvincia) => {
    listaCantones.innerHTML = '';
    listaCantones.options.add(new Option('-- Seleccione un cantón --'));
    distribucion.provincias.forEach(provincia => {
        if (provinciaSeleccionada == provincia.title) {
            provincia.cantones.forEach(canton => {
                listaCantones.options.add(new Option(canton.title));
            });
        }
    });
};

const mostrarDistritos = (nombreCanton) => {
    listaDistritos.innerHTML = '';
    listaDistritos.options.add(new Option('-- Seleccione un distrito --'));
    distribucion.provincias.forEach(provincia => {
        if (provinciaSeleccionada == provincia.title) {
            provincia.cantones.forEach(canton => {
                if (cantonSeleccionado == canton.title) {
                    canton.distritos.forEach(distrito => {
                        listaDistritos.options.add(new Option(distrito.title));
                    });
                }
            });
        }
    });
};

mostrarProvincias();
listaProvincias.addEventListener('change', () => {
    provinciaSeleccionada = listaProvincias.value;
    mostrarCantones(provinciaSeleccionada);
})
listaCantones.addEventListener('change', () => {
    cantonSeleccionado = listaCantones.value;
    mostrarDistritos(cantonSeleccionado);
})


const btnRegistrar = document.getElementById('btnGuardar');
const validarRegistroDireccionEnvio = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "La direccion no ha sido guardada",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Direccion guardada correctamente"
        });
    }

}

btnRegistrar.addEventListener('click', validarRegistroDireccionEnvio);