const express = require('express');
const { create } = require('../controllers/note.controller');
const router = express.Router(); 

router.post('/', create);

module.exports = router