const User = require('../models/User');

async function registerUser(req, res) {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({ username, password });

    return res.status(201).json({ message: 'User created successfully', user: newUser });
}

module.exports = { registerUser };
