'use strict'

var UserController = require('../controllers/user');

var exp = require('express');
var router = exp.Router();

// METODOS GET
router.get('/', UserController.test);

module.exports = router;