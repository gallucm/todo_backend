const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.options('*', cors());

var app = express();

var cors = require('cors');

// Archivo de rutas

// Middleware
app.use(cors());

// Cabeceras y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization,  X-Requested-With, X-API-KEY, Origin, Accept, Access-Control-Allow-Request-Method');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.options('*', cors())

// Rutas

module.exports = app;