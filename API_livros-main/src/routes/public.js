const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const livrosController = require('../controllers/livrosController');
const User = require('../models/user');


router.post('/login', authController.login);
router.post('/cadastro', authController.cadastro);


router.get('/livros/all', livrosController.read);
router.get('/livros/:categoria', livrosController.CategoryFilterRead);




module.exports = router;