const axios = require('axios');
const User = require('../models/User');

async function registerUser(req, res) {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe en el microservicio de login
    try {
        const loginResponse = await axios.post('http://login-microservice-url/login', { username, password });
        if (loginResponse.status === 200) {
            return res.status(400).json({ message: 'User already exists' });
        }
    } catch (error) {
        console.error('Error contacting login microservice:', error);
    }

    // Crear nuevo usuario
    const newUser = await User.create({ username, password });
    return res.status(201).json({ message: 'User created successfully', user: newUser });
}

module.exports = { registerUser };
