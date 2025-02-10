const User = require('../models/User');
const axiosService = require('../services/axiosService');  // Importamos el servicio de Axios

async function registerUser(req, res) {
  const { username, password, email } = req.body;
  
  console.log('Received data for registration:', { username, email });

  // Verificar si el usuario ya está registrado en el microservicio de login
  try {
    console.log('Checking if user exists in the login service...');
    const userExists = await axiosService.checkUserLogin(username);  // Llamamos al servicio de login para verificar

    if (userExists) {
      console.log('User already exists in login service');
      return res.status(400).json({ message: 'User already exists in login service' });
    }
  } catch (error) {
    console.error('Error communicating with login service:', error);
    return res.status(500).json({ message: 'Error communicating with login service' });
  }

  // Verificar si el correo ya está registrado
  console.log('Checking if email is already in use...');
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    console.log('Email already in use:', email);
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Verificar si el nombre de usuario ya está registrado
  console.log('Checking if username is already in use...');
  const existingUserByUsername = await User.findOne({ where: { username } });
  if (existingUserByUsername) {
    console.log('Username already exists:', username);
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Crear un nuevo usuario con el correo, nombre de usuario y contraseña
  console.log('Creating new user...');
  const newUser = await User.create({ username, password, email });

  console.log('New user created successfully:', newUser.username);

  return res.status(201).json({
    message: 'User created successfully',
    user: {
      username: newUser.username,
      email: newUser.email
    }
  });
}

module.exports = { registerUser };
