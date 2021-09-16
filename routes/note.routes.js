const express = require('express');
const { create, getNote } = require('../controllers/note.controller');
const router = express.Router(); 

router.post('/', create);
router.get('/:id', getNote);

module.exports = router