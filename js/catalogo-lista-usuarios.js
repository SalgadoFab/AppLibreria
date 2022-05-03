'use strict';

const cuerpoTabla = document.querySelector('#tbl-identificacion tbody');
let listaDatos = [];

const inicializar = async() => {
    listaDatos = await obtenerDatos('obtener-usuarios');
    mostrarTabla();
};
const mostrarTabla = async() => {
    cuerpoTabla.innerHTML = '';

    listaDatos.forEach(usuario => {
        let fila = cuerpoTabla.insertRow();

        fila.insertCell().innerText = usuario.identificacion;
        fila.insertCell().innerText = usuario.primerNombre;
        fila.insertCell().innerText = usuario.primerApellido;
        fila.insertCell().innerText = usuario.segundoApellido;
        fila.insertCell().innerText = usuario.provincia;

    });

};




inicializar();