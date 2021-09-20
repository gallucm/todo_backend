const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRouter = require('./routes/user.routes');
const noteRouter = require('./routes/note.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization,  X-Requested-With, X-API-KEY, Origin, Accept, Access-Control-Allow-Request-Method');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.options('*', cors())

app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);

module.exports = app;