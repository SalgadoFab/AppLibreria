let inputCorreo = document.getElementById("txt-correo");
let inputPassword = document.getElementById("txt-password");
let label = document.getElementById("labelCheck");
let check = document.getElementById("check");


const validarInicioSesion = () => {
    //Variable para capturar inicio de sesion correcto
    let datosValidados; 

    //Recorremos todos los usuarios y validamos los datos ingresados con el json de usuarios
    listaUsuarios.forEach(userArray => {
        
        if ( (userArray.correo == inputCorreo.value) && (userArray.contrasena == inputPassword.value) ) {
            localStorage.setItem('usuarioConectado', JSON.stringify(userArray));
            datosValidados = true;
        }   
    });

    //Ventana emergente para indicar login exitoso
    if (datosValidados == true) {
        Swal.fire({
            'icon' : 'success',
            'title' : 'Bienvenido',
            'text' : 'Ha iniciado sesion'
        }).then(()=>{
           
        });
    } else { 
        Swal.fire({
            'icon' : 'error',
            'title' : 'No ha podido inciar sesion',
            'text' : 'Usuario o Contraseña incorrecto'
        });
    }

};

btnIngresar.addEventListener('click', validarInicioSesion);