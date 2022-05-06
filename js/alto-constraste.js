const valor = document.querySelector('.btn-alto-contactraste a');
const body = document.querySelector('body');
const activarAltoContraste = () => {
    


    if ( valor.innerText == 'Activar Alto Contraste' ) {
        valor.innerHTML = "Desactivar Alto Contraste";
        body.classList.add('alto-contraste')
    } else {
        valor.innerHTML = "Activar Alto Contraste";
        body.classList.remove('alto-contraste')
    }

}