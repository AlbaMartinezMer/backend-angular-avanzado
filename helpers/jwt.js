const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {   //tambien podemos poner el nombre, rol y mas cosas
            uid, 
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {

            expiresIn: '12h'    // tiempo que dura el token

        }, ( err, token ) => {  //callback con error y token
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}


module.exports = {
    generarJWT,
}