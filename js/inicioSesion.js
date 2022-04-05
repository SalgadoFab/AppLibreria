var inputPassword = document.getElementById("txt-password");
var label = document.getElementById("labelCheck");
var check = document.getElementById("check");
var inputCorreo = document.getElementById("txt-correo");




const validarInicioSesion = () => {
    let hayError;
    let esCorrecto;


    //Obtemos todos los inputs que tengan la propiedad name="input"
    let inputsTxt = document.getElementsByName('input');

    //Hacemos un For, que se ejecutara mientras nuestra contador i se menor que la cantidad de inputsTexts obtenidos
    for (let i = 0; i < inputsTxt.length; i++) {

        //Validamos si el contenido del input esta vacio, de estarlo pasamos la variable de error a true y añadimos la clase de indicador de error  
        if (inputsTxt[i].value == '') {

            hayError = true
            inputsTxt[i].classList.add('inputError')

        } else {
            //Si no esta vacio quitamos la clase de error
            inputsTxt[i].classList.remove('inputError')

        };

    };

    if (hayError == true) {
        Swal.fire({
            'icon': 'error',
            'title': 'No ha podido inciar sesion',
            'text': 'Rellene los campos vacios'
        });



    };




    //Funcion ForEach, hace un cilco que recorre el array listaUsuarios, usando la variable userArray como auxiliar, 
    //se puede ver la variable auxiliar como un i en un ciclo for

    listaUsuarios.forEach(userArray => {
        //Hace un if para comparar password y correo recibidos con los de cada item del array
        if ((userArray.correo == inputCorreo.value) && (userArray.contrasena == inputPassword.value)) {
            //Utiliza el localStorage para almacenar datos del usuario validado en el login
            localStorage.setItem('usuarioConectado', JSON.stringify(userArray));

            esCorrecto = true;
        } else {
            esCorrecto = false;

        };

        if (esCorrecto == true) {
            Swal.fire({
                'icon': 'success',
                'title': 'Bienvenido',
                'text': 'Ha iniciado sesion'
            }).then(() => {
                window.location.href = 'index.html';
            });
        } else if (esCorrecto == false && hayError == false) {
            Swal.fire({
                'icon': 'error',
                'title': 'No ha podido inciar sesion',
                'text': 'Usuario o Contraseña incorrecto'
            });

        };

    });

    //Si la variable de verificacion de inicio de sesion es true lanza un popup indicando que se logro iniciar sesion
    //IMPORTANTE para que este popup se pueda ejectuar debe llamar a la liberia en el html donde se vaya a utilizar,
    //Ver linea 31 en inicio-sesion.html








};
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
//Referenciamos a nuestro boton registrar con el evento click para ejecutar nuestra funcion de validacion



btnIngresar.addEventListener('click', validarInicioSesion);