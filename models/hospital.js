const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {      //usuario que crea el hospital
        required: true,
        type: Schema.Types.ObjectId, //relacion entre este esquema de hospital con el esquema de usuario
        ref: 'Usuario'
    }
}, {  collection: 'hospitales' }); //cambio de nombre en mongo


HospitalSchema.method('toJSON', function() {    //opcional
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Hospital', HospitalSchema );
