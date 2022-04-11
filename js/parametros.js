const txtCantidadCompras = document.getElementById('txt-cantidad-compras');
const txtActualizarPrecioEnvio = document.getElementById('txt-actualizar-precio');
const txtActualizarImpuesto = document.getElementById ('txt-actualizar-impuesto');
const txtActualizarDescuento = document.getElementById('txt-actualizar-descuento');

const btnGuardarCantidadCompras = document.getElementById('btnGuardarCantidadCompras');
const btnActualizarPrecio = document.getElementById('btnActualizarPrecio');
const btnActualizarImpuesto = document.getElementById('btnActualizarImpuesto');
const btnActualizarDescuento = document.getElementById('btnActualizarDescuento');


const validarCantidadComprasLibroFan = () => {
    let errorCantidadCompras = false;
    console.log(txtCantidadCompras  );

    if (txtCantidadCompras.value == '' ) {
        errorCantidadCompras = true;
        txtCantidadCompras.classList.add("inputError");
    } else {
        txtCantidadCompras.classList.remove("inputError");
    }

    if (errorCantidadCompras == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que el nuevo valor de la cantidad compras"
        });

    } else { 
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Cantidad minima de compras actualizada"
        });
    }
};

btnGuardarCantidadCompras.addEventListener('click', validarCantidadComprasLibroFan);

const validarActualizarPrecioEnvio = () => {
    let errorPrecioEnvio = false;

    if (txtActualizarPrecioEnvio.value == '' ) {
        errorPrecioEnvio = true;
        txtActualizarPrecioEnvio.classList.add("inputError");
    } else {
        txtActualizarPrecioEnvio.classList.remove("inputError");
    }

    if (errorPrecioEnvio == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que el nuevo valor del precio de envio"
        });

    } else { 
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Precio de envio actualizado"
        });
    }
};
btnActualizarPrecio.addEventListener('click', validarActualizarPrecioEnvio);


const validarActualizarImpuesto = () => {
    let errorActualizarImpuesto = false;

    if (txtActualizarImpuesto.value == '' ) {
        errorActualizarImpuesto = true;
        txtActualizarImpuesto.classList.add("inputError");
    } else {
        txtActualizarImpuesto.classList.remove("inputError");
    }

    if (errorActualizarImpuesto == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que el nuevo valor del impuesto"
        });

    } else { 
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Tarifa de impuesto actualizado"
        });
    }
};
btnActualizarImpuesto.addEventListener('click', validarActualizarImpuesto);


const validarActualizarDescuento = () => {
    let errorActualizarDescuento = false;

    if (txtActualizarDescuento.value == '' ) {
        errorActualizarDescuento = true;
        txtActualizarDescuento.classList.add("inputError");
    } else {
        txtActualizarDescuento.classList.remove("inputError");
    }

    if (errorActualizarDescuento == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que el nuevo valor del descuento"
        });

    } else { 
        Swal.fire({
            "icon": "success",
            "title": "Éxito",
            "text": "Tarifa de descuento libroFan actualizado"
        });
    }
};
btnActualizarDescuento.addEventListener('click', validarActualizarDescuento);