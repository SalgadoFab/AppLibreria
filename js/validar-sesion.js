let btnEnlaceTienda = document.getElementsByClassName('btnEnlaceTienda'); 
let btnEnlaceDashboard = document.getElementsByClassName('btnEnlaceDashboard')

let usuario = JSON.parse(localStorage.getItem('usuarioConectado'));

const validarUsuarioConectado = () => {

    if (usuario) {
        for (let i = 0; i < btnEnlaceTienda.length; i++) {
            btnEnlaceTienda[i].setAttribute("href", "/html/catalogo-libros-vista-cliente.html");
        }

    } else {
        for (let i = 0; i < btnEnlaceTienda.length; i++) {
            btnEnlaceTienda[i].setAttribute("href", "/html/inicio-sesion.html");
        }
    }

    if (usuario.rol == 1) {
        btnEnlaceDashboard[0].setAttribute("href", "/html/dashboard-admin.html")
    } else {
        btnEnlaceDashboard[0].setAttribute("href", "/html/dashboard-usuario.html")
    }


}

validarUsuarioConectado();