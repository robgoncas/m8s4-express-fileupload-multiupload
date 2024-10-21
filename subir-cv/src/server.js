const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

//Crear la app de Express
const app = express();

//Middleware para el manejo de la subida de archivos
app.use(fileUpload());
app.use(express.json());

//Configuración para servir archivos estáticos (opcional)
app.use(express.static('public'));

//Ruta principal para cargar el formulario de subida de archivos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Ruta para procesar la subida de archivos
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            error: true,
            codigo: 400,
            mensaje: 'Debe incluir a lo menos un archivo!',
        });
    }

    //El archivo se encuentra en req.files.<nombre>
    let archivo = req.files.archivo;


    //Validar si la carpeta no existe .. para crearla
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }

    //Mover el archivo a la carpeta de destino
    archivo.mv(`./uploads/${archivo.name}`, err => {
        if (err) {
            return res.status(500).send({
                error: true,
                codigo: 500,
                mensaje: err
            });
        }
        res.send({
            error: false,
            codigo: 200,
            mensaje: 'Archivo subido correctamente',
            archivo: archivo.name,
            size: (archivo.size/(1024*1024))+" MB.",
            type: archivo.mimetype
        });
    });
});

//Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
