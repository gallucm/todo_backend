const app = require('./app');
// const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado correctamente en el puerto: " + process.env.PORT);
});