const path = require('path'); //para construir path completo
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // -- Procesar la imagen --
    const file = req.files.imagen; //tengo acceso a los files gracias al middleware: expressFileUpload

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg --> solo nos interesa el .jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ]; //en la ultima posicion=jpg/png..
    
    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`; //uuidv4 genera ids=nombre

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos -> en /helpers
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}


const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto; //imagen.jpg

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` ); //unimos la ubicacion de la app desplegada 
                                                                        //+ path de la imagen de mi proyecto, donde se encuentra la imagen de fs
    // imagen por defecto si no existe el path
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}