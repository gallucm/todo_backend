const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.options('*', cors());

module.exports = app;