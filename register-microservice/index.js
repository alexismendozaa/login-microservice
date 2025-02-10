const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/registerRoutes');
require('dotenv').config();  // Load environment variables from .env file
const sequelize = require('./db');
const User = require('./models/User');  // Ensure models are created

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/', registerRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
