const app = require('./app');
const port = process.env.PORT || 3000;

const db = require('./config/db.config');

app.listen(port, () => {
    console.log("Server running at port: " + port);

    db.once('open', () => {
        console.log('Database connected.');
    });
    db.on('error', (err) => {
        console.log('error', err);
    });
    
});