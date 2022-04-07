let inputCorreo = document.getElementById("txt-correo");
let inputPassword = document.getElementById("txt-password");
let label = document.getElementById("labelCheck");
let check = document.getElementById("check");
let inputsTxt = document.getElementsByName('input');


const validarInicioSesion = () => {
    //Variable para capturar inicio de sesion correcto
    let datosValidados;

    //Recorremos todos los usuarios y validamos los datos ingresados con el json de usuarios
    listaUsuarios.forEach(userArray => {

        if ((userArray.correo == inputCorreo.value) && (userArray.contrasena == inputPassword.value)) {
            localStorage.setItem('usuarioConectado', JSON.stringify(userArray));
            datosValidados = true;
        }
    });

    //Ventana emergente para indicar login exitoso
    if (datosValidados == true) {
        Swal.fire({
            'icon': 'success',
            'title': 'Bienvenido',
            'text': 'Ha iniciado sesion'
        }).then(() => {
            window.location.href = '#';
        });
    } else {
        Swal.fire({
            'icon': 'error',
            'title': 'No ha podido inciar sesion',
            'text': 'Usuario o Contraseña incorrecto'
        });
    }

};
var password = document.getElementById("txt-contrasena");

//Mientras el input check esté seleccionado funcion(){
check.onclick = function() {
    if (check.checked) {
        inputPassword.setAttribute("type", "text");
        label.innerHTML = "Ocultar Contraseña";
    } else {


        inputPassword.setAttribute("type", "password");
        label.innerHTML = "Mostrar Contraseña";
    }
};
btnIngresar.addEventListener('click', validarInicioSesion);