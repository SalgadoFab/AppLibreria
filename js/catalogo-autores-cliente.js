let totalPaginas;
const buscar = document.getElementById('txt-buscar');

const inicializar = async() => {
    
    listaAutores = await obtenerDatos('obtener-autores');
    console.log(listaAutores);

    totalPaginas = obtenerNumeroPaginas(listaAutores)
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
    let contenedorItems = document.getElementById("catalogoAutoresClienteCTN")

    // Revisamos que la página esté dentro de los límites
    if (pagina < 1) pagina = 1
    if (pagina > totalPaginas) pagina = totalPaginas

    //Limpiamos el contenedor de los items
    contenedorItems.innerHTML = ""

    //Hacemos un for, para cada elemento dentro del rango de la página actual
    for (let i = (pagina - 1) * itemsPorPagina; i < (pagina * itemsPorPagina) && i < listaAutores.length; i++) {

        if (listaAutores[i].nombreAutor.toLowerCase().includes(buscar.value.toLowerCase())) {
            //Al contenedor de items le pasamos la estrucutra html para cada item del array
            //Cambiar variables
            contenedorItems.innerHTML += `
            <div class="cardItem">
            <div class="ctnImagenItem">
                <div class="cardImagen">
                    <img src="${listaAutores[i].imagenAutor}" alt="Portada Libro">
                    <a class="btnEliminarItem" onclick="">
                        <i class="fa-regular fa-heart"></i>
                    </a>
                </div>
            </div>

            <div class="cardInfo-1">
                <div class="col-1">
                    <div class="nombreAutor espacioInfoItem">
                        <span>
                            Nombre del Autor:
                        </span>
                        <div class="nombreAutorItem">
                            <span>
                                <br>
                                ${listaAutores[i].nombreAutor}
                            </span>
                        </div>

                    </div>

                </div>
            </div>

            <div class="cardBtns flexContendor">
                <div class="col-2">
                    <div class="promPlumas espacioInfoItem">
                        <span>
                            Promedio Plumas:
                        </span>
                    </div>
                    <div class="promedioPlumasItem">
                        <span>
                            <br>
                            0
                        </span>
                    </div>

                </div>

                <div class="col-2">
                    <div class="librosPublicados espacioInfoItem">
                        <span>
                            Libros publicados:
                        </span>
                    </div>
                    <div class="librosPublicadosItem">
                        <span>
                            <br>
                            0
                        </span>
                    </div>
                </div>
            </div>

            <div class="cardInfo-2 flexContendor">

                <div class="col-3">
                    <div class="nacionalidadAutor espacioInfoItem">
                        <span>
                            Nacionalidad:
                        </span>
                    </div>
                    <div class="nacionalidadAutorItem">
                        <span>
                            ${listaAutores[i].nacionalidad}
                        </span>
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