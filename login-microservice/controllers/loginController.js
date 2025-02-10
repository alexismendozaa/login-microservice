const User = require('../models/User');
const axiosService = require('../services/axiosService');

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Verificamos si el usuario está registrado en el microservicio de registro
    const userExists = await axiosService.checkUserRegistration(username);

    if (!userExists) {
      return res.status(400).json({ message: 'Usuario no registrado' });
    }

    // Lógica para verificar la contraseña, etc.
    if (password !== 'passwordSegura') {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al comunicarse con el microservicio de registro' });
  }
}

module.exports = { loginUser };


async function loginUser(req, res) {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Aquí iría la lógica para generar un token o devolver un mensaje de éxito
    return res.status(200).json({ message: 'Login successful' });
}

module.exports = { loginUser };
