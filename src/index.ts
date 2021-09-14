const mongoose = require('mongoose');
const application = require('./app');

application.listen('3000', () => {
    console.log('Servidor conectado');
    mongoose.connect('mongodb://localhost:27017/test')
        .then(() => {
            console.log('Base de datos conectada');
        })
        .catch((err: any) => {
            console.log(err);
        });
})