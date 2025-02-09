const User = require('../models/User');

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
