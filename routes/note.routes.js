const express = require('express');
const { create, get, update, remove } = require('../controllers/note.controller');
const router = express.Router(); 

router.post('/', create);
router.get('/:id', get);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router