const mongoose = require('mongoose');


const dbConnection = async () => { // crea una promesa

    try {
        await mongoose.connect(process.env.DB_CNN, { //objetos
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        //useCreateIndex: true    -> si lo dejo sin comentar no fufa
        });
        console.log('DB Online');
    
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD');
    }
}

module.exports = {
    dbConnection
}


