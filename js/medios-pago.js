'use strict';

const inputnumeroTarjeta = document.querySelector('#txt-numero-tarjeta')
const inputnombreTitular = document.querySelector('#txt-titular')
const inputfechaExpiracion = document.querySelector('#txt-expiracion')
const inputccv = document.querySelector('#txt-cv')




const btnRegistrar = document.getElementById('btnGuardar');


//Creamos las variables para la validacion, los inputs y los requerimientos de cada campo
let ccNumeroInput = document.querySelector('#txt-numero-tarjeta'),
    ccNumeroPatron = /^\d{0,16}$/g,
    ccNumeroSeparador = " ",
    ccNumeroInputValorAntiguio,
    ccNumeroInputCursorAntiguio,

    ccExpiracionInput = document.querySelector('#txt-expiracion'),
    ccExpiracionPatron = /^\d{0,4}$/g,
    ccExpiracionSeparador = "/",
    ccExpiracionInputValorAntiguio,
    ccExpiracionInputCursorAntiguio,

    ccCVInput = document.querySelector('#txt-cv'),
    ccCVPatron = /^\d{0,3}$/g

//Funcion de mascara para asignar el valor, limite y separador de cada input
let mascara = (valor, limite, separador) => {
        let output = [];
        for (let i = 0; i < valor.length; i++) {
            //Determinamos el espacio entre cada separador
            if (i !== 0 && i % limite === 0) {
                output.push(separador);
            }
            output.push(valor[i]);
        }

        return output.join("");
    }
    //Funcion para remover la mascara
let removerMascara = (valor) => valor.replace(/[^\d]/g, '')

//Funcion para validar el separador entre numeros
let checkSeparador = (position, interval) => Math.floor(position / (interval + 1))

//Funcion utilizada utilizada para asignar valor y la posicion del cursor del numero de tarjeta
let ccNumeroInputKeyDownHandler = (e) => {
    let input = e.target;
    ccNumeroInputValorAntiguio = input.value;
    ccNumeroInputCursorAntiguio = input.selectionEnd;
}


//Funcion utilizada utilizada para asignar valor y la posicion del cursor del input numero tarjeta
let ccNumeroInputHandler = (e) => {
    //Cremamos las variables para obtener los datos del input
    let elemento = e.target,
        nuevoValor = removerMascara(elemento.value),
        nuevaPosicionCursor;

    //Validamos la mascara de 4 digitos + espacio entre ellos
    if (nuevoValor.match(ccNumeroPatron)) {
        nuevoValor = mascara(nuevoValor, 4, ccNumeroSeparador);

        nuevaPosicionCursor =
            ccNumeroInputCursorAntiguio - checkSeparador(ccNumeroInputCursorAntiguio, 4) +
            checkSeparador(ccNumeroInputCursorAntiguio + (nuevoValor.length - ccNumeroInputValorAntiguio.length), 4) +
            (removerMascara(nuevoValor).length - removerMascara(ccNumeroInputValorAntiguio).length);

        elemento.value = (nuevoValor !== "") ? nuevoValor : "";
    } else {
        elemento.value = ccNumeroInputValorAntiguio;
        nuevaPosicionCursor = ccNumeroInputCursorAntiguio;
    }

    elemento.setSelectionRange(nuevaPosicionCursor, nuevaPosicionCursor);

    //Obtenemos el tipo de CC Ingresado
    obtenerTipoCC(elemento.value);
}

//Obtener 
let obtenerTipoCC = (ccValorInicial) => {
        let tipoCC = '',
            tipoCCPatrones = {
                amex: /^3/,
                visa: /^4/,
                mastercard: /^5/,
                disc: /^6/,
                genric: /(^1|^2|^7|^8|^9|^0)/,
            };

        for (const cardType in tipoCCPatrones) {
            if (tipoCCPatrones[cardType].test(ccValorInicial)) {
                tipoCC = cardType;
                break;
            }
        }

        //Asignamos y removemos clase de tarjeta activa segun corresponde
        let ccActiva = document.querySelector('.cc-tipo-img--activo'),
            nuevaCCActiva = document.querySelector(`.cc-tipo-img--${tipoCC}`);

        //Anterior cc removemos clase activa
        if (ccActiva) {
            ccActiva.classList.remove('cc-tipo-img--activo');
        }
        //Nueva cc agregamos clase activa
        if (nuevaCCActiva) {
            nuevaCCActiva.classList.add('cc-tipo-img--activo');
        }
    }
    //Funcion en evento keyDown para el input Expirancion para validar valores ingresados
let ccExpiracionInputKeyDownHandler = (e) => {
    let input = e.target;
    ccExpiracionInputValorAntiguio = input.value;
    ccExpiracionInputCursorAntiguio = input.selectionEnd;
}

//Funcion en evento inputH para el input Expirancion donde validamos los valores ingresados
let ccExpiracionInputHandler = (e) => {
    let input = e.target,
        nuevoValor = input.value;

    nuevoValor = removerMascara(nuevoValor);
    if (nuevoValor.match(ccExpiracionPatron)) {
        nuevoValor = mascara(nuevoValor, 2, ccExpiracionSeparador);
        input.value = nuevoValor;
    } else {
        input.value = ccExpiracionInputValorAntiguio;
    }
};

ccNumeroInput.addEventListener('keydown', ccNumeroInputKeyDownHandler);
ccNumeroInput.addEventListener('input', ccNumeroInputHandler);

ccExpiracionInput.addEventListener('keydown', ccExpiracionInputKeyDownHandler);
ccExpiracionInput.addEventListener('input', ccExpiracionInputHandler);




const validarMedioPago = () => {

    let hayError = validarFormulario();


    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Ups!",
            "text": "Compruebe que todos los campos estan correctamente llenos"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        let mediosPago = {
            numeroTarjeta: inputnumeroTarjeta.value,
            nombreTitular: inputnombreTitular.value,
            fechaExpiracion: inputfechaExpiracion.value,
            ccv: inputccv.value,
        };
        registrarDatos('/medios-pago', mediosPago);
    };


}

btnRegistrar.addEventListener('click', validarMedioPago);