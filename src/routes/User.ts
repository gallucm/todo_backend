'use strict'

var UserController = require('../controllers/user');

const exp = require('express');
const router = exp.Router();

// METODOS GET
router.get('/', UserController.test);

module.exports = router;