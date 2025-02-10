const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Garantiza que el nombre de usuario sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Garantiza que el correo electrónico sea único
    validate: {
      isEmail: {
        msg: "Debe ser un correo electrónico válido"
      },
    }
  },
}, {
  timestamps: true, // Esto automáticamente agrega createdAt y updatedAt
});

module.exports = User;
