const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor iniciado 222 correctamente en el puerto: " + port);
});