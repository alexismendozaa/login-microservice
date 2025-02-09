const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/loginRoutes');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const sequelize = require('./db');
const User = require('./models/User');  // Asegura que los modelos sean creados

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas de login
app.use('/api', loginRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        // Sincronizar tablas con la base de datos
        await sequelize.sync({ force: false });
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});
