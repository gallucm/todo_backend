const express = require('express');
const router = express.Router(); 

const { login, register, update} = require('../controllers/user.controller');

router.post('/auth', login);
router.post('/register', register);
router.put('/:id', update);

module.exports = router