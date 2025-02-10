const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerController');

// Route to register a new user
router.post('/register', registerUser);

// En el microservicio de registro
app.post('/users/check-username', async (req, res) => {
    const { username } = req.body;
    const existingUser = await User.findOne({ where: { username } });
  
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }
    return res.status(200).json({ message: 'Usuario disponible' });
  });
  

module.exports = router;
