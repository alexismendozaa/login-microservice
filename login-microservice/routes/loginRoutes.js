const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// Ruta para login de usuarios
router.post('/login', loginUser);

module.exports = router;
