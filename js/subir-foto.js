'use strict';
const boton_foto = document.querySelector('#btn-foto');
const imagen = document.querySelector('#photo');
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'nolimits2022',
    uploadPreset: 'preset_solutions'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    }
});
imagen.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);