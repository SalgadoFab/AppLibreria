'use strict';
const usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const cuerpoTabla = document.querySelector('#tbl-facturas tbody');
let listaDatos = [];

const inicializar = async() => {
    listaDatos = await obtenerDatosAsociados('obtener-facturas', usuarioConectado.correo );
    mostrarTabla();
};
const mostrarTabla = async() => {
    cuerpoTabla.innerHTML = '';

    listaDatos.forEach(factura => {
        let fila = cuerpoTabla.insertRow();

        fila.insertCell().innerText = factura.factura;
        fila.insertCell().innerText = factura.items;
        fila.insertCell().innerText = factura.hora;
        fila.insertCell().innerText = factura.fecha;
        fila.insertCell().innerText = factura.tipoRetiro;

    });

};




inicializar();