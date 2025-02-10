const User = require('../models/User');

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos RDS
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña proporcionada es correcta
    if (password !== user.password) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Aquí iría la lógica para generar un token o devolver un mensaje de éxito
    return res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
  }
}

module.exports = { loginUser };
