const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        console.log('Init DB Config');
        await mongoose.connect(process.env.DB_CONNECT, {
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /* autoIndex: true,
            useCreateIndexes: true, */
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

module.exports = { dbConnection }