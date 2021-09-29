const express = require('express');
const router = express.Router(); 

const { login, register, update, updatePassword} = require('../controllers/user.controller');

router.post('/auth', login);
router.post('/register', register);
router.put('/:id', update);
router.put('/password/:id', updatePassword);

module.exports = router