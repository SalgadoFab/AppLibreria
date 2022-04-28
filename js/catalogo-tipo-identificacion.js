const cuerpoTabla = document.querySelector('#tbl-identificacion tbody');
let catalogoListaUsuario = [];

const inicializar = async() => {
    catalogoListaUsuario = await obtenerDatos('obtener-ListaUsuario');
    console.log(catalogoListaUsuario);
    mostrarDatos();
};

const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';

    catalogoListaUsuario.forEach(identificacionAux => {
        let fila = cuerpoTabla.insertRow();
        fila.insertCell().textContent = identificacionAux.codigoUsuario;
        fila.insertCell().textContent = identificacionAux.nombre;
        fila.insertCell().textContent = identificacionAux.apellidos;
        fila.insertCell().textContent = identificacionAux.puntosLibroFan;
        fila.insertCell().textContent = identificacionAux.ultimaActividad;
    });
};

inicializar();