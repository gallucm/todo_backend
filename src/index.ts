const mongoose = require('mongoose');
const application = require('./app');
const config = require('../config');

application.listen(config.PORT, config.HOST, () => {
    console.log('Servidor conectado en el puerto: ' + config.PORT);
    mongoose.connect(config.DB_URL)
        .then(() => {
            console.log('Base de datos conectada');
        })
        .catch((err: any) => {
            console.log(err);
        });
});