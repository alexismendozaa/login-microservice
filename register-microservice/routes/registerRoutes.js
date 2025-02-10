const express = require('express');
const router = express.Router();  // Usamos router, no app
const { registerUser } = require('../controllers/registerController');
const { User } = require('../models/User');  // Asegúrate de importar el modelo User

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para verificar si el nombre de usuario ya está registrado
router.post('/users/check-username', async (req, res) => {
  const { username } = req.body;
  try {
    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    return res.status(200).json({ message: 'Usuario disponible' });
  } catch (error) {
    console.error('Error al verificar el usuario:', error);
    return res.status(500).json({ message: 'Error al verificar el usuario' });
  }
});

module.exports = router;
