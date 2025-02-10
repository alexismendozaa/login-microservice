const axios = require('axios');

// Instanciamos Axios con la URL base del microservicio de registro
const axiosInstance = axios.create({
  baseURL: process.env.EC2_HOST_REGISTER, // URL del microservicio de registro desde el secreto de GitHub
  timeout: 5000,
});

// Función para verificar si un usuario está registrado
async function checkUserRegistration(username) {
  try {
    const response = await axiosInstance.post('/register', { username });
    return response.data;  // Retorna los datos del microservicio de registro
  } catch (error) {
    console.error('Error al verificar el registro:', error.message);
    throw error;  // Lanza el error para que sea manejado en el controlador
  }
}

// Función para iniciar el proceso de restablecimiento de contraseña
async function initiatePasswordReset(email) {
  try {
    const response = await axiosInstance.post('/password-reset', { email });
    return response.data;  // Retorna los datos del microservicio de restablecimiento de contraseña
  } catch (error) {
    console.error('Error al iniciar el restablecimiento de contraseña:', error.message);
    throw error;
  }
}

module.exports = {
  checkUserRegistration,
  initiatePasswordReset,
};
