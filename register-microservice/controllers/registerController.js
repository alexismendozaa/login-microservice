const User = require('../models/User');  // Importa el modelo User

async function registerUser(req, res) {
  const { username, password, email } = req.body;

  console.log('Received data for registration:', { username, email });

  // Crear el nuevo usuario en la base de datos
  try {
    const newUser = await User.create({
      username,
      password,  // Asegúrate de que la contraseña esté cifrada si es necesario
      email
    });

    console.log('User successfully registered:', newUser);
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
}

module.exports = { registerUser };
