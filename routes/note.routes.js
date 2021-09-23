const express = require('express');
const { create, get, update, remove, getAllByUser } = require('../controllers/note.controller');
const auth = require("../middlewares/auth");
const router = express.Router(); 

router.get('/:id', auth, get);
router.get('/all/:id', auth, getAllByUser);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router