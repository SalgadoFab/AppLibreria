let lista_Autores = [];
let lista_Generos = [];

let sltAutores = document.getElementById('slt-autores');
let sltGeneros = document.getElementById('slt-Generos');

const inicializarAutores = async() => {
    lista_Autores = await obtenerDatos('obtener-autores');
    for (let i = 0; i < lista_Autores.length ; i++){
        let opt = document.createElement('option');
        opt.value = lista_Autores[i].nombreAutor;
        opt.innerHTML = lista_Autores[i].nombreAutor;
        sltAutores.appendChild(opt);
    }
};

const inicializarGeneros = async() => {
    lista_Generos = await obtenerDatos('obtener-generos');
    for (let i = 0; i < lista_Generos.length ; i++){
        let opt = document.createElement('option');
        opt.value = lista_Generos[i].nombreGenero;
        opt.innerHTML = lista_Generos[i].nombreGenero;
        sltGeneros.appendChild(opt);
    }
};

inicializarAutores();
inicializarGeneros();

const inputnombreLibro = document.querySelector('#txt-nombre-libro')
const inputisbn = document.querySelector('#txt-ISBN')
const inputidioma = document.querySelector('#slt-idioma')
const inputformato = document.querySelector('#slt-formato')
const inputfechapliblicacion = document.querySelector('#txt-publicacion')
const inputpremiosLibro = document.querySelector('#txt-Premios')
const inputprecio = document.querySelector('#txt-Precio')
const inputstock = document.querySelector('#txt-stock')
const inputdescuento = document.querySelector('#txt-Descuento')
const inputresenna = document.querySelector('#txt-Resenna')


const btnRegistrar = document.getElementById('btnGuardar');

const validarRegistroLibros = () => {

    let hayError = validarFormulario();
    
    let sltAutores = obtenerValoresMultiSelect('slt-autores');
    sltAutores = sltAutores.join(", ");

    let sltGeneros = obtenerValoresMultiSelect('slt-Generos');
    sltGeneros = sltGeneros.join(", ");

    let imagen = document.querySelector('#photo');

    //Mensaje del resultado de la validacion
    if (hayError == true) {
        Swal.fire({
            "icon": "warning",
            "title": "Error",
            "text": "Compruebe que todos los campos estan correctamente llenados"
        });

    } else { //Si la variable de error termina en false esto lanza un popup al usuario para indicar registro exitoso
        let libros = {
            nombreLibro: inputnombreLibro.value,
            isbn: inputisbn.value,
            portada: imagen.src,
            nombreAutor: sltAutores,
            idiomaLibro: inputidioma.value,
            fechaPublicacion: inputfechapliblicacion.value,
            generoLibro: sltGeneros,
            premios: inputpremiosLibro.value,
            precio: inputprecio.value,
            libroStock: inputstock.value,
            descuento: inputdescuento.value,
            resennaLibro: inputresenna.value,

        };
        registrarDatos('registrar-libro', libros);
    };
}



btnRegistrar.addEventListener('click', validarRegistroLibros);