const express = require('express');
const router = express.Router(); 

const { login, register, check} = require('../controllers/user.controller');

router.post('/auth', login);
router.post('/register', register);

module.exports = router