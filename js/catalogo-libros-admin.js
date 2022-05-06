let lista_libros;
let totalPaginas;
const buscar = document.getElementById('txt-buscar');
const inicializar = async() => {
    lista_libros = await obtenerDatos('obtener-libros');
    totalPaginas = obtenerNumeroPaginas(lista_libros)

    console.log(lista_libros);
    cambiarPagina(1)
    obtenerPaginacion()
    obtenerPaginaActiva()
};

// Items a mostrar por pagina
let itemsPorPagina = 9;

// Fijamos la pagina 1 activa por defecto
let paginaActiva = 1;

//Funcion para obtener el numero de paginas, recibe por parametro el array de elementos y lo divide por la cantidad que deseamos mostrar por pagina
const obtenerNumeroPaginas = (listaArray) => {
    return Math.ceil(listaArray.length / itemsPorPagina)
}

//Funcion para cambiar entre paginas por cada item de paginacion
const cambiarPagina = (pagina) => {
    //Obtenemos el contedor de los items
    let contenedorItems = document.getElementById("catalogoLibrosAdminCTN")

    // Revisamos que la página esté dentro de los límites
    if (pagina < 1) pagina = 1
    if (pagina > totalPaginas) pagina = totalPaginas

    //Limpiamos el contenedor de los items
    contenedorItems.innerHTML = ""

    //Hacemos un for, para cada elemento dentro del rango de la página actual
    for (let i = (pagina - 1) * itemsPorPagina; i < (pagina * itemsPorPagina) && i < lista_libros.length; i++) {

        if ( (lista_libros[i].nombreLibro.toLowerCase().includes(buscar.value.toLowerCase())) || (lista_libros[i].nombreAutor.toLowerCase().includes(buscar.value.toLowerCase())) || (lista_libros[i].generoLibro.toLowerCase().includes(buscar.value.toLowerCase()))  ) {
            //Al contenedor de items le pasamos la estrucutra html para cada item del array
            //Cambiar variables
            contenedorItems.innerHTML += `
                <div class="cardItem">
                <div class="ctnImagenItem">
                    <div class="cardImagen">
                        <a class="abrirLibro" onclick="abrirLibro('${lista_libros[i].nombreLibro}')">
                            <img src="${lista_libros[i].portada}" alt="Portada Libro">
                        </a>
                        <a class="btnEliminarItem" onclick="">
                            <i class="fa-solid fa-trash-can"></i>
                        </a>
                    </div>
                </div>

                <div class="cardInfo-1">
                    <div class="col-1">
                        <div class="nombreLibro espacioInfoItem">
                            <span>
                                Titulo: ${lista_libros[i].nombreLibro}
                            </span>
                        </div>
                        <div class="nombreAutor">
                            <span>
                                Autor: ${lista_libros[i].nombreAutor}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="cardBtns flexContendor">
                    <div class="col-2">
                        <button class="btnModificar">
                            <a onclick="">
                                <i class="fa-solid fa-pen-to-square"></i> Modificar
                            </a>
                        </button>
                    </div>
                    <div class="col-2">
                        <button class="btnOcultar">
                            <a onclick="">
                                <i class="fa-solid fa-eye-slash"></i> Ocultar
                            </a>
                        </button>
                    </div>
                </div>

                <div class="cardInfo-2 flexContendor">

                    
                    <div class="col-3">
                        <div class="precioUnitarioTitulo espacioInfoItem">
                            <span>
                                Precio Unitario
                            </span>
                        </div>  
                        <div class="precioUnitarioItem">
                            0
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="tituloUnidades espacioInfoItem">
                            <span>
                                Unidades Vendidas
                            </span>
                        </div>  
                        <div class="unidadesVendidas">
                            0
                        </div>
                    </div>

                </div>
            </div>`
        }
    }
}

//Funcion para el boton de pagina siguiente
const paginaSiguiente = () => {
    //Si no está en la última página, vaya a la página siguiente
    if (paginaActiva < totalPaginas) {
        cambiarPagina(++paginaActiva);
    }

    obtenerPaginaActiva();
}

//Funcion para el boton de pagina anterior
const paginaAnterior = () => {
    //Si no está en la primera página, devuelve una
    if (paginaActiva > 1) {
        cambiarPagina(--paginaActiva)
    }

    obtenerPaginaActiva();
}

//Funcion para cada item de la paginacion para cambiar entre paginas, recibe como parametro la pagina seleccionada en el frontend
const irPaginaSeleccionada = (pagina) => {
    //Establece la página actual en la página seleccionada
    paginaActiva = pagina

    //Cambia la página a la página seleccionada
    cambiarPagina(pagina)

    obtenerPaginaActiva()
}

//Crea navegación de página individual
const obtenerPaginacion = () => {

    //Obtenemos el contenedor de la paginacion
    let contenedorPaginacion = document.getElementById('ctnPaginacion')
    contenedorPaginacion.innerHTML = ''

    //Creamos la paginacion segun el total de paginas 
    for (let i = 1; i < totalPaginas + 1; i++) {

        //Agregamos la funcion de ir a paginaSeleccionada para cada item con el número de página respectivo
        //Asignamos un id para indentificar la pagina activa con css
        contenedorPaginacion.innerHTML += `<li id="pagina-${i}" class="item-paginacion"><a href="javascript:irPaginaSeleccionada(${i})">${i}</a></li>`
    }
}

//Obtenemos la pagina activa y agregamos la clase paginaActiva para el estilo en frontend
const obtenerPaginaActiva = () => {
    //Obtenemos todos los items de la paginacion en la variable
    let pagina = document.getElementsByClassName('item-paginacion');
    console.log(paginaActiva)

    //Hacemos un for para la cantidad de items de la paginacion obtenidos
    for (let i = 0; i < pagina.length; i++) {

        //Obtemos la pagina activa y le pasamos la clase, removemos la clase para los elementos que dejan de estar activos
        if (('pagina-' + paginaActiva) == (pagina[i].id)) {
            pagina[i].classList.add('paginaActiva')
        } else {
            pagina[i].classList.remove('paginaActiva')
        }
    }

}

inicializar();

buscar.addEventListener('keyup', () => {
    cambiarPagina(paginaActiva);
});

const abrirLibro = async(nombre) => {

    libro = await obtenerDatosAsociados('obtener-libro', nombre);
    console.log(libro);

    localStorage.setItem('libroAbierto', JSON.stringify(libro));
    window.location.href = '/html/vista-libro.html';
};