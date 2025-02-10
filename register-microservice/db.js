// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,  // Requiere SSL
      rejectUnauthorized: false,  // Puede ser necesario para evitar problemas con certificados auto-firmados
    },
  },
});

// Verificar la conexión y sincronizar las tablas
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    sequelize.sync({ force: false });  // 'force: false' para no borrar las tablas existentes
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
