const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();

//Middleware para el manejo de la subida de archivos
app.use(fileUpload());

//Configuración para servir archivos estáticos
app.use(express.static('public'));

//Cargar el formulario de subida de archivos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Función asíncrona para procesar la subida de archivos
const subirArchivos = async (req, res) => {
    try {
        //Verificar si se han subido archivos
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subió ningún archivo.');
        }

        //Manejar múltiples archivos
        let archivos = req.files.archivos;
        if (!Array.isArray(archivos)) {
            archivos = [archivos]; //Convertir a array si es un solo archivo
        }

    console.log(req.body.nombreAlbum);

        //Crear la carpeta 'uploads' si no existe
        if (!fs.existsSync(`./uploads/${req.body.nombreAlbum}`)) {
            fs.mkdirSync(`./uploads/${req.body.nombreAlbum}`);
        }

        let contador=0;
        //Iterar y subir cada archivo
        for (const archivo of archivos) {
            contador++;

            //Crear nombre único usando timestamp
           //v1 timestamp + nombre del archivo 
           //const nombreArchivo = `${formatearTimestamp(new Date)}-${archivo.name}`;

            //v2 
            const extension = path.extname(archivo.name);
            const nombreArchivo = `${formatearTimestamp(new Date)}-${contador}-${extension}`;

            //Mover el archivo de forma asíncrona
            await archivo.mv(`./uploads/${req.body.nombreAlbum}/${nombreArchivo}`);
        }

        //Enviar respuesta cuando se suban todos los archivos
        res.send('Archivos subidos con éxito');
    } catch (err) {

        //Manejar errores de subida
        res.status(500).send('Error al subir archivos');
    }
};

//Ruta para procesar la subida de archivos
app.post('/upload', subirArchivos);
//agregar input ... *****

const formatearTimestamp = (fecha) => {

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    const milisegundos = String(fecha.getMilliseconds()).padStart(2, '0');


    return `${anio}-${mes}-${dia} ${horas}_${minutos}_${segundos}_${milisegundos}`;
}

//Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
