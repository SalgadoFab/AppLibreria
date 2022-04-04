/*

Funcion GLOBAL de Validacion
Esta funcion es utilizada para la validacion global de cualquier campo donde se coloque la propiedad name="input"

*/
const validarFormulario = () => {
    //Variable para capturar errores en los inputs
    let hayError;

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
        }
        
    }

    //Devolvemos nuestra variable de error para lanzar el popup de formulario si es necesario
    return hayError; 
} 