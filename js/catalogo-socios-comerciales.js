// Items a mostrar por pagina
let itemsPorPagina = 5;

// Fijamos la pagina 1 activa por defecto
let paginaActiva = 1;

//Funcion para obtener el numero de paginas, recibe por parametro el array de elementos y lo divide por la cantidad que deseamos mostrar por pagina
const obtenerNumeroPaginas = (listaArray) => {
    return Math.ceil(listaArray.length / itemsPorPagina)
}

// Obtenemos el numero de paginas para nuestra paginacion
let totalPaginas = obtenerNumeroPaginas(listaSocios)

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
    for (let i = (pagina - 1) * itemsPorPagina; i < (pagina * itemsPorPagina) && i < listaSocios.length; i++) {

        //Al contenedor de items le pasamos la estrucutra html para cada item del array
        //Cambiar variables
        contenedorItems.innerHTML += `
        <div class="cardItem">
            <div class="ctnImagenItem">
                <div class="cardImagen">
                    <img src="${listaSocios[i].imgSocio}" alt="Portada Libro">
                    <a class="btnEliminarItem" onclick="">
                        <i class="fa-solid fa-trash-can"></i>
                    </a>
                </div>
            </div>

            <div class="cardInfo-1">
                <div class="col-1">
                    <div class="nombreLibro espacioInfoItem">
                        <span>
                            Nombre: ${listaSocios[i].nombre}
                        </span>
                    </div>
                    <div class="nombreAutor">
                        <div class="socio-ID">
                            <span>
                                ID:
                            </span>
                        </div>

                        <div class="socio-codigo">
                            <span>
                                Codigo: ${listaSocios[i].codigo}
                            </span>
                        </div>
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
        </div>`
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

//Ejecutamos la funciones principales al momento de que la pagina carga por primera vez
window.onload = function() {
    cambiarPagina(1) //Establecer página predeterminada
    obtenerPaginacion() //Generar paginacion
    obtenerPaginaActiva()
};