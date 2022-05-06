
let usuarioCompra = JSON.parse(localStorage.getItem('usuarioConectado'));

const container = document.getElementById('contenedor-items-compra');
const sltPuntos = document.getElementById('punto-retiro');
const sltMetodosPago = document.getElementById('metodo-pago');

let libros = JSON.parse(localStorage.getItem('librosCarrito'));

let tarjetasUsuario = [];

const inicializarDatos = async() => {
    tarjetasUsuario = await obtenerDatosAsociados('obtener-medio-pago', usuario.correo );
    listaPuntos = await obtenerDatos('obtener-puntos');

    for (let i = 0; i < listaPuntos.length; i++) {
        let opt = document.createElement('option');
        opt.value = listaPuntos[i].socioComercial + " " + listaPuntos[i].direccion;
        opt.innerHTML = listaPuntos[i].socioComercial + " " + listaPuntos[i].direccion;
        sltPuntos.appendChild(opt);
    }
    console.log(tarjetasUsuario)
    for (let i = 0; i < tarjetasUsuario.length; i++) {
        let opt = document.createElement('option');
        opt.value = tarjetasUsuario[i].numeroTarjeta;
        opt.innerHTML = tarjetasUsuario[i].numeroTarjeta + " " + tarjetasUsuario[i].nombreTitular  ;
        sltMetodosPago.appendChild(opt);
    }

    actualizarCantidadPrecio()
};

inicializarDatos()


let html = ''
let librosContenedor = document.getElementById('contenedor-items-compra');
librosContenedor.innerHTML = ''

for (let i=0;i<libros.length; i++) {
    html += `
    <div class="libro-compra" id="${libros[i][0].isbn}">
        <div class="nombreLibro" style="width: 40%;">
            <label for="nombre-${libros[i][0].nombreLibro}">Nombre del Libro</label>
                <input class="libroAdquirido" id="compra-${libros[i][0].nombreLibro}" type="text" readonly value="${libros[i][0].nombreLibro}">
            </div>
        <div class="precioLibro">
            <label for="precio-${libros[i][0].nombreLibro}">Precio</label>
            <input class="libroAdquiridoPrecio" id="precio-${libros[i][0].nombreLibro}" readonly type="number" min="1" value="${libros[i][0].precio - ( (libros[i][0].precio / 100) * libros[i][0].descuento ) }">
        </div>
        <div class="cantidadLibro">
            <label for="cantidad-${libros[i][0].nombreLibro}">Cantidad</label>
            <input class="libroAdquiridoCantidad" id="cantidad-${libros[i][0].nombreLibro}" type="number" min="1" value="1" onchange="actualizarCantidadPrecio()">
        </div>
        <div class="eliminarItem">
            <a onclick="eliminarProducto('${libros[i][0].isbn}')" > 
                Eliminar Item
            </a>
        </div>
    </div>
    `;
}

librosContenedor.innerHTML = html;

let sltMetodoRetiro = document.getElementById('metodo-retiro');
let Divpuntos = document.getElementById('retiro-tienda');
let Divdireccion = document.getElementById('envio');

sltMetodoRetiro.addEventListener('change', function() {
    if (this.value == 'Retiro en Tienda') {
        Divpuntos.classList.remove('disable');
        Divdireccion.classList.add('disable');
    } else if (this.value == 'Enviar Mediante Correos') {
        Divpuntos.classList.add('disable');
        Divdireccion.classList.remove('disable');
    }

    actualizarCantidadPrecio();

});


let txtPrecioTotal = document.getElementById('precio');
let impuesto = 13;
let precioEnvio = 2500;

let total = 0

const actualizarCantidadPrecio = () => {  
    
    total = 0;
    
    let cantidadItem = document.getElementsByClassName('libroAdquiridoCantidad');
    let precioItem = document.getElementsByClassName('libroAdquiridoPrecio');
    
    let precioItemCantidad = []


    for (let i=0; i < cantidadItem.length; i++) {
        precioItemCantidad.push( (parseInt(precioItem[i].value) *parseInt(cantidadItem[i].value) ));
    }

    for (let i=0; i < precioItemCantidad.length; i++) {
        total += precioItemCantidad[i]
        
    }
    
    
    //Calcular Impuesto
    total += total * (impuesto / 100);

    if ( sltMetodoRetiro.value == 'Enviar Mediante Correos') {
        total += precioEnvio;
    }

    console.log(sltMetodoRetiro.value)
    
    txtPrecioTotal.value = total;
    

}


const eliminarProducto = (id) => {
    const element = document.getElementById(id);
    element.remove();

    actualizarCantidadPrecio();
}


let metodoPagoSeleccionado = [];

sltMetodosPago.addEventListener('change', function() {
    obtenerDatosMetodoPago( sltMetodosPago.value );
});


const obtenerDatosMetodoPago = ( numeroTarjeta ) => {
    for (let i =0; i<tarjetasUsuario.length; i++ ) {
        if ( tarjetasUsuario[i].numeroTarjeta = numeroTarjeta ) {
            metodoPagoSeleccionado = tarjetasUsuario[i];
        }
    }
    console.log(metodoPagoSeleccionado)
}


const btnComprar = document.getElementById('btnComprar');

//Data

const txt_provincia = document.getElementById('txt-provincia');
const txt_canton = document.getElementById('txt-canton');
const txt_distrito = document.getElementById('txt-distrito');
const txt_direccion_exacta = document.getElementById('txt-direccion');

sltMetodoRetiro;

sltPuntos;
sltMetodosPago;

const txt_cvv = document.getElementById('cvv');


let idFactura;
const idGenerador = () => {
    idFactura = '';
    let caracteres = '0123456789';
    for (let i = 0; i < 6; i++) {
        idFactura += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
}

const comprar = () => {

    idGenerador()

    let provinciaEnvio;
    let cantonEnvio;
    let distritoEnvio;
    let direccionEnvio;

    let tipoRetiro;

    let fechaData = new Date();
    let fecha = fechaData.getDate()+'-'+ (fechaData.getMonth()+1) + '-' + fechaData.getFullYear();
    let hora = fechaData.getHours() + ":" + fechaData.getMinutes() + ":" + fechaData.getSeconds();

    console.log(hora)

    let librosPorComprar = []
    let librosAdquiridos = document.getElementsByClassName('libroAdquirido');
    let cantidades = document.getElementsByClassName('libroAdquiridoCantidad');
    for (let i = 0; i<librosAdquiridos.length; i++) {
        librosPorComprar.push( librosAdquiridos[i].value + ' - cantidad: ' + cantidades[i].value );
    }

    librosPorComprar = librosPorComprar.join(', ');
    console.log(librosPorComprar)
    hayErrorCamposReactivos = false;
    hayErrorMetodo = false;
    hayErrorCCV = false;

    let inputsEnvio = document.getElementsByName('inputsEnvio');
    let inputPunto = document.getElementsByName('retiroPunto');

    if ( sltMetodoRetiro.value == 'Enviar Mediante Correos' ) {
        hayErrorCamposReactivos = validarCamposReactivos(inputsEnvio);
        desactivarCamposActivos (inputPunto);

        provinciaEnvio = txt_provincia.value
        cantonEnvio = txt_canton.value
        distritoEnvio = txt_distrito.value
        direccionEnvio = txt_direccion_exacta.value

        tipoRetiro = 'Enviar Mediante Correos'

    }  else {
        hayErrorCamposReactivos = validarCamposReactivos(inputPunto);
        desactivarCamposActivos (inputsEnvio);

        tipoRetiro = sltMetodoRetiro.value + ' ' + sltPuntos.value;

        provinciaEnvio = 'N/A'
        cantonEnvio = 'N/A'
        distritoEnvio = 'N/A'
        direccionEnvio = 'N/A'
    }

    if (sltMetodosPago.value == '') {
        hayErrorMetodo = true;
        sltMetodosPago.classList.add('inputError');
    } else {
        hayErrorMetodo = false;
        sltMetodosPago.classList.remove('inputError');
    }


    let msj;
    if ( txt_cvv.value == '' ) {
        msj = 'Porfavor ingresa el CCV de la tarjeta seleccionada';
        hayErrorCCV = true;
        txt_cvv.classList.add('inputError');
    } else if ( txt_cvv.value != metodoPagoSeleccionado.ccv) {
        msj = 'El CCV Ingresado es incorrecto';
        hayErrorCCV = true;
        txt_cvv.classList.add('inputError');
    } else {
        hayErrorCCV = false;
        txt_cvv.classList.remove('inputError');
    }


    if (hayErrorCamposReactivos == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que todos los campos estan correctamente llenos"
        });
    } else if (hayErrorMetodo == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Selecciona el metodo de pago, de no tener ninguno registrado porfavor has click en el boton de Registrar Metodo"
        });
    } else if (hayErrorCCV == true){
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": msj
        });
    } else {

        //Obtener nombres de libros 
        let factura = {

            factura: idFactura,
            usuario : usuarioCompra.primerNombre+" "+usuarioCompra.segundoNombre+" "+usuarioCompra.primerApellido+" "+usuarioCompra.segundoApellido,
            usuarioCorreo : usuarioCompra.correo,
            items: librosPorComprar,
            tipoRetiro: tipoRetiro,
            provinciaEnvio : provinciaEnvio,
            cantonEnvio : cantonEnvio,
            distritoEnvio : distritoEnvio,
            direccionEnvio : direccionEnvio,
            fecha: fecha,
            hora: hora, 
            totalPago: total

        }

        
        registrarFactura('registrar-factura', factura);


    }

}

btnComprar.addEventListener('click', comprar);

const validarCamposReactivos = (inputsTxt) => {
    let hayError;
    for (let i = 0; i < inputsTxt.length; i++) { 
        if (inputsTxt[i].value == '') {
            hayError = true 
            inputsTxt[i].classList.add('inputError')

        } else {
            inputsTxt[i].classList.remove('inputError')
        }        
    }
    return hayError; 
}
const desactivarCamposActivos = (inputsTxt) => {
    for (let i = 0; i < inputsTxt.length; i++) { 
        inputsTxt[i].classList.remove('inputError');
    }
}
