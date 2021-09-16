const express = require('express');
const { create, get, update } = require('../controllers/note.controller');
const router = express.Router(); 

router.post('/', create);
router.get('/:id', get);
router.put('/:id', update);

module.exports = router