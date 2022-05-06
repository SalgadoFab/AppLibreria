const container = document.getElementById('contenedor-principal');
let libro = JSON.parse(localStorage.getItem('libroAbierto'));
console.log(libro);

const mostrarInformacionLibro  = (libro) => {
    return "<div class=\"ctnLibroAbierto\">" + libro.map(aux => `
    

        <div class="info-libro flexContendor">
            <div class="portada">
                <img src="${aux.portada}" alt="Portada de Libro">
            </div>

            <div class="metadatos">
                <div class="tituloLibro">
                    <h1>
                        ${aux.nombreLibro}
                    </h1>
                </div>
                <div class="autor">
                    <h2>
                        Autor: 
                    </h2>
                    <p>
                        ${aux.nombreAutor}
                    </p>
                </div>
                <div class="fecha-publicacion">
                    <h2>
                        Fecha de Publicación: 
                    </h2>
                    <p>
                        ${aux.fechaPublicacion}
                    </p>
                </div>
                <div class="idioma">
                    <h2>
                        Idioma: 
                    </h2>
                    <p>
                        ${aux.idiomaLibro}
                    </p>
                </div>
                <div class="genero">
                    <h2>
                        Genero: 
                    </h2>
                    <p>
                        ${aux.generoLibro}
                    </p>
                </div>
                <div class="precio">
                    <p>
                    Precio ₡ ${aux.precio}
                    </p>
                </div>
                <div class="actions flexContendor">
                    <div class="col-2">
                        <button class="btnAgregar">
                            <a onclick="addCarrito('${aux.nombreLibro}')">
                                <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
                            </a>
                        </button>
                    </div>
                    <div class="col-2">
                        <button class="btnComprarAhora">
                            <a onclick="">
                                <i class="fa-solid fa-bag-shopping"></i> Comprar ahora
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="review">
            <h2>
                Reseña: 
            </h2>
            <p>
                ${aux.resennaLibro}
            </p>
        </div>

    `).join('') + "</div>";
}

container.innerHTML = mostrarInformacionLibro(libro);



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