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
                        ${aux.precio}
                    </p>
                </div>
                <div class="actions flexContendor">
                    <div class="col-2">
                        <button class="btnAgregar">
                            <a onclick="">
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