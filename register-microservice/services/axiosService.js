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
    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de error
      console.error('Error en la respuesta del servidor:', error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error('No hubo respuesta del servidor:', error.request);
    } else {
      // Algo ocurrió al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
}

async function checkUserRegistration(username) {
  try {
    // Cambiar la ruta de /register a /users/check-username
    const response = await axiosInstance.post('/users/check-username', { username });
    return response.data;
  } catch (error) {
    console.error('Error al verificar el registro:', error.message);
    throw error;  // Lanza el error para que sea manejado en el controlador
  }
}


module.exports = {
  checkUserLogin,
  checkUserRegistration,
};
