const cuerpoTabla = document.querySelector('#tbl-generos tbody');
let listaGeneros = [];

const inicializar = async() => {
    listaGeneros = await obtenerDatos('obtener-generos');
    console.log(listaGeneros);
    mostrarDatos();
    console.log('test');

};

const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';

    listaGeneros.forEach(generoAux => {


        let fila = cuerpoTabla.insertRow();

        fila.insertCell().textContent = generoAux.codigoGenero;
        fila.insertCell().textContent = generoAux.nombreGenero;

    });
};

inicializar();