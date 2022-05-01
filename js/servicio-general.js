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

