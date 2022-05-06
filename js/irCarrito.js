let carrito = JSON.parse(localStorage.getItem('librosCarrito'));
const irCarrito = () => {
    if (carrito) {
        
        window.location.href = '/html/facturacion.html';

    } else {

        Swal.fire({
            "icon": "warning",
            "title": "Ups",
            "text": 'Debes agregar un item al carrito para poder continuar'
        });

    }
}
