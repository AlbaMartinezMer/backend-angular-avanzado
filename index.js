// Para leer las variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Inicializa la app de express
const app = express();

// Configurar cors
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.get( '/', (req, res) => { //cuando alguien haga solicitud a la raiz de la app - callback con request y response

    res.json({
        ok: true,
        msg: 'Hola Mundo!'
    })

}); 

// mongodb+srv://mean_user:bbLeiaDC4rqQfXyq@cluster0.7p23ub9.mongodb.net/hospitaldb


// Para levantar la app - puerto y callback que se ejecuta cuando se levanta
app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
});