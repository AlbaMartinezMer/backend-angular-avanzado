const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});


UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject(); //extraigo de la instancia del objeto para que no se vea: v, id y passw
    object.uid = _id; //le ponemos de nombre uid y ahora si se vera esa
    return object;
})



module.exports = model( 'Usuario', UsuarioSchema );
