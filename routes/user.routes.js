const express = require('express');
const router = express.Router(); 

const { login, register} = require('../controllers/user.controller');

router.post('/auth', login);
router.post('/register', register);

module.exports = router