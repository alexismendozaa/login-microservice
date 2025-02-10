const User = require('../models/User');
const axiosService = require('../services/axiosService');  // Importamos el servicio de Axios

async function registerUser(req, res) {
    const { username, password } = req.body;

    // Verificar si el usuario ya está registrado en el microservicio de login
    try {
        const userExists = await axiosService.checkUserLogin(username); // Llamamos al servicio de login para verificar

        if (userExists) {
            return res.status(400).json({ message: 'User already exists in login service' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error communicating with login service' });
    }

    // Si el usuario no existe, lo registramos en el microservicio de registro
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({ username, password });

    return res.status(201).json({ message: 'User created successfully', user: newUser });
}

module.exports = { registerUser };
