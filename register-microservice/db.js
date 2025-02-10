const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar las variables de entorno

// Configurar la conexión a la base de datos en RDS
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,  // Deshabilitar el log para mayor rendimiento
});

module.exports = sequelize;
