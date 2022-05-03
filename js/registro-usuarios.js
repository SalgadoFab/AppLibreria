let lista_Autores = [];
let lista_Generos = [];

let sltAutoresFavs = document.getElementById('slt-autores-favs');
let sltGenerosFavs = document.getElementById('slt-generos-favs');

const inicializarAutores = async() => {
    lista_Autores = await obtenerDatos('obtener-autores');
    for (let i = 0; i < lista_Autores.length ; i++){
        let opt = document.createElement('option');
        opt.value = lista_Autores[i].nombreAutor;
        opt.innerHTML = lista_Autores[i].nombreAutor;
        sltAutoresFavs.appendChild(opt);
    }
};

const inicializarGeneros = async() => {
    lista_Generos = await obtenerDatos('obtener-generos');
    for (let i = 0; i < lista_Generos.length ; i++){
        let opt = document.createElement('option');
        opt.value = lista_Generos[i].nombreGenero;
        opt.innerHTML = lista_Generos[i].nombreGenero;
        sltGenerosFavs.appendChild(opt);
    }
};

inicializarAutores();
inicializarGeneros();


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

//Obtener campos de Contraseña 
const txtPassword = document.getElementById('txt-password');
const txtPasswordConfirmacion = document.getElementById('txt-password-confirmacion');
const btnRegistrar = document.getElementById('btnGuardar');

//Variable que contiene si el password tiene errores de requerimientos
let errorRequerimientoPassword = false;

//Funcion de Validacion de requerimientos de contraseña
(function(){
    //Obtenemos el campo de contraseña
    let password = document.querySelector('.password');
    console.log(password)

    //Obtemos
    let requerimientoPassword = {
        longitudCaracteres: document.querySelector('.texto-ayuda .longitud'),
        minuscula: document.querySelector('.texto-ayuda .minuscula'),
        mayuscula: document.querySelector('.texto-ayuda .mayuscula'),
        caracter: document.querySelector('.texto-ayuda .caracter')
    };

    console.log(requerimientoPassword.longitudCaracteres)

    //Patron de requerimientos para la contraseña, funciona como un array de funciones
    let patron = {
        //Valida que la contraseña tenga 8 o mas caracteres
        longitudCaracteres: function() {
            //Valida que la contraseña tenga 8 o mas caracteres 
            if( password.value.length >= 8 ) {
                return true;
            }
        },
        //Valida que la contraseña contenga minusculas 
        minuscula: function() {
            //La variable requerimiento almacena el requisito a validar de la contraseña
            let requerimiento = /^(?=.*[a-z]).+$/; 

            //Se testea el requerimiento expresado a la contraseña
            if( requerimiento.test(password.value) ) {
                return true;
            }
        },
        //Valida que la contraseña contenga mayusculas
        mayuscula: function() {
            //La variable requerimiento almacena el requisito a validar de la contraseña
            let requerimiento = /^(?=.*[A-Z]).+$/; 

            //Se testea el requerimiento expresado a la contraseña
            if( requerimiento.test(password.value) ) {
                return true;
            }
        },
        //Valida que la contraseña contenga caracteres alfanumericos 
        caracter: function() {
            //La variable requerimiento almacena el requisito a validar de la contraseña
            let requerimiento = /^(?=.*[0-9_\W]).+$/; // caracter character or number patron

            if( requerimiento.test(password.value) ) {
                return true;
            }
        }   
    };
    
    //Se ejecuta la validacion de la contraseña en tiempo real con cada valor ingresado al input
    password.addEventListener('keyup', function (){
        //Verifica que la contraseña tenga un mínimo de 8 caracteres
        validarPatron( patron.longitudCaracteres(), requerimientoPassword.longitudCaracteres );
        
        //Verifica que la contraseña contenga una letra minúscula
        validarPatron( patron.minuscula(), requerimientoPassword.minuscula );
        
        //Verifica que la contraseña contenga una letra mayuscula
        validarPatron( patron.mayuscula(), requerimientoPassword.mayuscula );
        
        //Verifica que la contraseña contenga un número o caracter
        validarPatron( patron.caracter(), requerimientoPassword.caracter );
    
        //Valida que todos los requerimientos contengan la clase validado
        if( validarClase(requerimientoPassword.longitudCaracteres, 'validado') && validarClase(requerimientoPassword.minuscula, 'validado') &&  validarClase(requerimientoPassword.mayuscula, 'validado') &&  validarClase(requerimientoPassword.caracter, 'validado') ) {
            console.log("PASSWORD Valida")
            errorRequerimientoPassword = false
            txtPassword.classList.remove("inputError");
        } else {
            console.log("PASSWORD Invalida")
            errorRequerimientoPassword = true

            txtPassword.classList.add("inputError");
        }
    });
    
    //Funcion de validacion reutilizable para cada requerimiento de la contraseña
    function validarPatron(patron, requerimiento) {
        //Si el patron es validado agregamos la clase validado
        if(patron) {
            agregarClase(requerimiento, 'validado');
        }
        //Si el patron falla removemos la clase validado
        else {
            removerClase(requerimiento, 'validado');
        }
    }
    
    function agregarClase(elemento, nombreClase) {

        //Agregamos la clase obtenida por parametro del elemento necesario
        if (elemento.classList) {
            elemento.classList.add(nombreClase);
        }
        else {
            elemento.className += ' ' + nombreClase;
        }
    }
    
    function removerClase(elemento, nombreClase) {
        
        //Removemos la clase obtenida por parametro del elemento necesario
        if (elemento.classList) {
            elemento.classList.remove(nombreClase);
        } else {
            elemento.className = elemento.className.replace(new RegExp('(^|\\b)' + nombreClase.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    
    function validarClase(elemento, nombreClase) {

        //Valida que el elemento contenga la clase recibida por parametro
        if (elemento.classList) {
            return elemento.classList.contains(nombreClase);    
        }
        else {
            new RegExp('(^| )' + nombreClase + '( |$)', 'gi').test(elemento.className); 
        }
    }
    
})();


// this of eye method
const mostrarPassword = (input, selector) => {
    if(input.classList.contains('activo')) {
        input.setAttribute('type', 'text');
        selector.className = 'fa fa-eye';
        input.classList.remove('activo')
    } else {
        input.setAttribute('type', 'password');
        selector.className = 'fa fa-eye-slash';
        input.classList.add('activo')
    }
}

mostrarPass = document.getElementById('mostrarPassword');
mostrarPassConfirmacion = document.getElementById('mostrarPasswordConfirmacion');

mostrarPass.onclick = function () {
    mostrarPassword (txtPassword, mostrarPass)
}
mostrarPassConfirmacion.onclick = function () {
    mostrarPassword (txtPasswordConfirmacion, mostrarPassConfirmacion)
}


//Funcion de Validacion de campos normales
const validarRegistroUsuario = () => {
    //Creamos la letiable de error y le asignamos el valor que devuelva nuestra funcion de validacion de campos del formulario
    //IMPORTANTE - Esta funcion valida solo si el campo se encuentra vacio, para casos mas espesificos crear una validaciones aparte
    let errorCamposVacios = validarFormulario();


    //Validamos la igualdad entre campos de password
    if (txtPassword.value != txtPasswordConfirmacion.value) {
        errorCamposVacios = true;

        txtPassword.classList.add("inputError");
        txtPasswordConfirmacion.classList.add("inputError");
    }

    if (errorRequerimientoPassword == true) {
        txtPassword.classList.add("inputError");
    }
    

    const txtPrimerNombre = document.getElementById('txt-primer-nombre');
    const txtSegundoNombre = document.getElementById('txt-segundo-nombre');
    const txtPrimerApellido =  document.getElementById('txt-primer-apellido');
    const txtSegundoApellido =  document.getElementById('txt-segundo-apellido');
    const sltTipoIdentificacion = document.getElementById('slt-tipo-indentificacion');
    const txtIdentificacion = document.getElementById('txt-indentificacion');
    const sltGenero = document.getElementById('slt-genero');
    //listaProvincias
    //listaCantones
    //listaDistritos
    const txtDireccion = document.getElementById('txt-direccion');
    const txtCorreo = document.getElementById('txt-correo');
    //txtPassword

    let sltAutoresFavs = obtenerValoresMultiSelect('slt-autores-favs');
    let sltGenerosFavs = obtenerValoresMultiSelect('slt-generos-favs');

    let imagen = document.querySelector('#photo');

    if ( (errorCamposVacios == true) || (errorRequerimientoPassword == true) ) {
        Swal.fire({
            "icon": "warning",
            "title": "El usuario no se pudo registrar",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { 
        let usuario = {

            primerNombre: txtPrimerNombre.value,
            segundoNombre: txtSegundoNombre.value,
            primerApellido: txtPrimerApellido.value,
            segundoApellido: txtSegundoApellido.value,
            tipoIdentificacion: sltTipoIdentificacion.value,
            identificacion: txtIdentificacion.value,
            foto: imagen.src,
            provincia: listaProvincias.value,
            canton: listaCantones.value,
            distrito: listaDistritos.value,
            direccion: txtDireccion.value,
            genero: sltGenero.value,
            correo: txtCorreo.value,
            password: txtPassword.value,
            autoresFavs: sltAutoresFavs,
            generosFavs: sltGenerosFavs
            
        }

        registrarDatos('registrar-usuario', usuario);
    }

} 

//Referenciamos a nuestro boton registrar con el evento click para ejecutar nuestra funcion de validacion
btnRegistrar.addEventListener('click', validarRegistroUsuario);