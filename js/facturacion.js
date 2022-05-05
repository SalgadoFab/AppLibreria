
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
        opt.value = listaPuntos[i].socioComercial;
        opt.innerHTML = listaPuntos[i].socioComercial;
        sltPuntos.appendChild(opt);
    }
    console.log(tarjetasUsuario)
    for (let i = 0; i < tarjetasUsuario.length; i++) {
        let opt = document.createElement('option');
        opt.value = tarjetasUsuario[i].numeroTarjeta;
        opt.innerHTML = tarjetasUsuario[i].nombreTitular + " " + tarjetasUsuario[i].numeroTarjeta  ;
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
    <div class="libro-compra">
        <div class="nombreLibro">
        <label for="nombre-${libros[i][0].nombreLibro}">Nombre del Libro</label>
            <input class="libroAdquirido" id="compra-${libros[i][0].nombreLibro}" type="text" readonly value="${libros[i][0].nombreLibro}">
        </div>
        <div class="precioLibro">
            <label for="precio-${libros[i][0].nombreLibro}">Precio</label>
            <input class="libroAdquiridoPrecio" id="precio-${libros[i][0].nombreLibro}" readonly type="number" min="1" value="${libros[i][0].precio}">
        </div>
        <div class="cantidadLibro">
            <label for="cantidad-${libros[i][0].nombreLibro}">Cantidad</label>
            <input class="libroAdquiridoCantidad" id="cantidad-${libros[i][0].nombreLibro}" type="number" min="1" value="1" onchange="actualizarCantidadPrecio()">
        </div>
        
    </div>
    `;
}

librosContenedor.innerHTML = html;


let metodoRetiro = document.getElementById('metodo-retiro');
let puntos = document.getElementById('retiro-tienda');
let direccion = document.getElementById('envio');

metodoRetiro.addEventListener('change', function() {
    if (this.value == 'Retiro en Tienda') {
        puntos.classList.remove('disable');
        direccion.classList.add('disable');
    } else if (this.value == 'Enviar Mediante Correos') {
        puntos.classList.add('disable');
        direccion.classList.remove('disable');
    } else {
        puntos.classList.add('disable');
        direccion.classList.add('disable');
    }
});


let txtPrecioTotal = document.getElementById('precio');
let impuesto = 13;

const actualizarCantidadPrecio = () => {  
    let cantidadItem = document.getElementsByClassName('libroAdquiridoCantidad');
    let precioItem = document.getElementsByClassName('libroAdquiridoPrecio');
    
    let precioItemCantidad = []
    let total = 0

    for (let i=0; i < cantidadItem.length; i++) {
        precioItemCantidad.push( (parseInt(precioItem[i].value) *parseInt(cantidadItem[i].value) ));
    }

    for (let i=0; i < precioItemCantidad.length; i++) {
        total += precioItemCantidad[i]
        
    }
    
    //Calcular Impuesto
    total += total * (impuesto / 100);

    txtPrecioTotal.value = total;


}


