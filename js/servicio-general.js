const registrarDatos = async(endpoint, data) => {
    let url = `http://localhost:3000/api/${endpoint}`;

    await axios({
            'url': url,
            'method': 'post',
            'responseType': 'json',
            'data': data
        })
        .then(response => {
            Swal.fire({
                text: response.data.mensaje,
                icon: 'success'
            }).then(() => {
                location.reload();
            });
            
        })
        .catch(error => {
            Swal.fire({
                title: 'El registro no se pudo realizar',
                text: error,
                icon: 'error'
            });
        });
};

const obtenerDatos = async(endpoint) => {
    let url = `http://localhost:3000/api/${endpoint}`;
    let listaDatos = [];
    await axios({
            'url': url,
            'method': 'get',
            'responseType': 'json'
        })
        .then(response => {
            listaDatos = response.data.lista;
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                text: error
            });
        });

    return listaDatos;
};


const obtenerDatosAsociados = async(endpoint, filtro) => {
    let url = `http://localhost:3000/api/${endpoint}/${filtro}`;
    let listaDatos = [];
    await axios({
            'url': url,
            'method': 'get',
            'responseType': 'json'
        })
        .then(response => {
            listaDatos = response.data.lista;
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                text: error
            });
        });

    return listaDatos;
};


const registrarFactura = async(endpoint, data) => {
    let url = `http://localhost:3000/api/${endpoint}`;

    await axios({
            'url': url,
            'method': 'post',
            'responseType': 'json',
            'data': data
        })
        .then(response => {
            Swal.fire({
                text: response.data.mensaje,
                icon: 'success'
            }).then(() => {
                window.localStorage.removeItem('librosCarrito');
                window.location.href = '/html/catalogo-libros-vista-cliente.html';
            });
            
        })
        .catch(error => {
            Swal.fire({
                title: 'No se pudo realizar el pago',
                text: error,
                icon: 'error'
            });
        });
};
