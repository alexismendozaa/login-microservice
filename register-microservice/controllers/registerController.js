const User = require('../models/User');
const axiosService = require('../services/axiosService');  // Importamos el servicio de Axios

async function registerUser(req, res) {
  const { username, password, email } = req.body;

  // Verificar si el usuario ya está registrado en el microservicio de login
  try {
    const userExists = await axiosService.checkUserLogin(username);  // Llamamos al servicio de login para verificar

    if (userExists) {
      return res.status(400).json({ message: 'User already exists in login service' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error communicating with login service' });
  }

  // Verificar si el correo ya está registrado
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Verificar si el nombre de usuario ya está registrado
  const existingUserByUsername = await User.findOne({ where: { username } });
  if (existingUserByUsername) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Crear un nuevo usuario con el correo, nombre de usuario y contraseña
  const newUser = await User.create({ username, password, email });

  return res.status(201).json({
    message: 'User created successfully',
    user: {
      username: newUser.username,
      email: newUser.email
    }
  });
}

module.exports = { registerUser };
