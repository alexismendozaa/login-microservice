const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
require('dotenv').config();  // Load environment variables from .env file
const sequelize = require('./db');
const User = require('./models/User');  // Ensure models are created

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Password Reset routes
app.use('/api', passwordResetRoutes);

// Synchronize the database
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
