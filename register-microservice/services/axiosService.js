const axios = require('axios');

// Instanciamos Axios con la URL base del microservicio de login
const axiosInstance = axios.create({
  baseURL: process.env.EC2_HOST_LOGIN, // URL del microservicio de login desde el secreto de GitHub
  timeout: 5000,
});

// Función para verificar si el usuario existe en el microservicio de login
async function checkUserLogin(username) {
  try {
    const response = await axiosInstance.post('/login', { username });
    return response.data;  // Retorna los datos del microservicio de login
  } catch (error) {
    console.error('Error al verificar el login:', error.message);
    throw error;
  }
}

module.exports = {
  checkUserLogin,
};
