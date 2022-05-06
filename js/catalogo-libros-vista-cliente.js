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
    let contenedorItems = document.getElementById("catalogoLibrosClienteCTN")

    // Revisamos que la página esté dentro de los límites
    if (pagina < 1) pagina = 1
    if (pagina > totalPaginas) pagina = totalPaginas

    //Limpiamos el contenedor de los items
    contenedorItems.innerHTML = ""

    //Hacemos un for, para cada elemento dentro del rango de la página actual
    for (let i = (pagina - 1) * itemsPorPagina; i < (pagina * itemsPorPagina) && i < lista_libros.length; i++) {

        //Al contenedor de items le pasamos la estrucutra html para cada item del array
        //Cambiar variables
        contenedorItems.innerHTML += `
        <div class="cardItem">
            <div class="ctnImagenItem">
                <div class="cardImagen">
                    <a class="abrirLibro" onclick="abrirLibro('${lista_libros[i].nombreLibro}')">
                        <img src="${lista_libros[i].portada}" alt="Portada Libro">
                    </a>
                    <a class="btnFavorito" onclick="">
                        <i class="fa-solid fa-heart"></i>
                    </a>
                </div>
            </div>

            <div class="cardInfo-1">
                <div class="col-1">
                    <div class="nombreLibro espacioInfoItem">
                        <span>
                            Nombre de Libro: ${lista_libros[i].nombreLibro}
                        </span>
                    </div>

                </div>

                <div class="col-1">
                    <div class="nombreLibro espacioInfoItem">
                        <span>
                            Género: ${lista_libros[i].generoLibro}
                        </span>
                    </div>

                </div>

                <div class="col-1">
                    <div class="nombreLibro espacioInfoItem">
                        <span>
                            Autor: ${lista_libros[i].nombreAutor}
                        </span>
                    </div>

                </div>
                <div class="col-3">
                    <div class="nombreLibro espacioInfoItem">
                        <span>
                        ₡ ${lista_libros[i].precio}
                        </span>
                    </div>

                </div>
            </div>

            <div class="cardBtns flexContendor">
                <div class="col-2">
                    <button class="btnAgregar">
                        <a onclick="addCarrito('${lista_libros[i].nombreLibro}')">
                            <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
                        </a>
                    </button>
                </div>
                <div class="col-2">
                    <button class="btnComprarAhora">
                        <a onclick="compraDirecta('${lista_libros[i].nombreLibro}')">
                            <i class="fa-solid fa-bag-shopping"></i> Comprar ahora
                        </a>
                    </button>
                </div>
            </div>

            <div class="cardInfo-3">
                <div class="col-3">
                    <div class="Plumas-espacioInfoItem">
                        <span>    
                            <i class="fa-solid fa-feather-pointed"></i>
                            <i class="fa-solid fa-feather-pointed"></i>
                            <i class="fa-solid fa-feather-pointed"></i>
                            <i class="fa-solid fa-feather-pointed"></i>
                            <i class="fa-solid fa-feather-pointed"></i>
                        </span>
                    </div>

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

inicializar();


const abrirLibro = async(nombre) => {

    libro = await obtenerDatosAsociados('obtener-libro', nombre);
    console.log(libro);

    localStorage.setItem('libroAbierto', JSON.stringify(libro));
    window.location.href = '/html/vista-libro.html';
};



let librosCarritoNuevoItem = [];
const addCarrito = async(nombre) =>{
    
    libro = await obtenerDatosAsociados('obtener-libro', nombre);

    if ( validarCarrito() ) {
        

        let carritoLocal = JSON.parse(localStorage.getItem('librosCarrito'));
        
        
        if (validarLibroEnCarrito(carritoLocal, nombre)) {
            console.log('Libro En Carrito');
            
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Este producto ya ha sido agregado al carrito',
                showConfirmButton: false,
                timer: 2000
            });

        } else {

            console.log('Libro Añadido Al Carrito Existente');
            carritoLocal.push(libro);
            localStorage.setItem('librosCarrito', JSON.stringify(carritoLocal));

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro agregado al carrito correctamente',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                location.reload();
            });
        }
        
    } else {
        console.log('Carrito creado con ' + nombre);
        librosCarritoNuevoItem.push(libro); 
        localStorage.setItem('librosCarrito', JSON.stringify(librosCarritoNuevoItem));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Libro agregado al carrito correctamente',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            location.reload();
        });;

    }
}

const validarCarrito = () => {
    let carrito = JSON.parse(localStorage.getItem('librosCarrito'));

    if (carrito) {
        return true;
    } else {
        return false;
    }
}

const validarLibroEnCarrito = (carritoLocal, nombre) => {

    for (let i = 0; i < carritoLocal.length; i++) {
    
        if (carritoLocal[i][0].nombreLibro == nombre) {
            
            return true;
        } 

    }
}

const compraDirecta = async (nombre) => {
    libro = await obtenerDatosAsociados('obtener-libro', nombre);

    localStorage.setItem('CompraDirecta', JSON.stringify(libro));
}