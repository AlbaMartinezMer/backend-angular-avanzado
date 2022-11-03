const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next ) => { //next: continuar con el siguiente middleware

    const errores = validationResult( req ); //los errores generados en la ruta con check -> si esta vacio algun campo

    if ( !errores.isEmpty() ) { //si no esta vacio = hay errores
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next(); //si no hay errores llamamos a la funcion next
}

module.exports = {
    validarCampos
}
