const express = require('express');
const { create, get, update, remove, getAllByUser } = require('../controllers/note.controller');
const router = express.Router(); 

router.get('/:id', get);
router.get('/all/:id', getAllByUser);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router