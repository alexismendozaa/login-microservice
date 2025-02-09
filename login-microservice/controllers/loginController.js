const axios = require('axios');
const User = require('../models/User');

async function loginUser(req, res) {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Llamada al microservicio de password-reset
    try {
        const response = await axios.post('http://54.234.224.71/password-reset', {
            email: user.email
        });
        console.log('Password reset requested:', response.data);
    } catch (error) {
        console.error('Error contacting password-reset microservice:', error);
    }

    return res.status(200).json({ message: 'Login successful' });
}

module.exports = { loginUser };
