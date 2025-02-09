# Usa la imagen más reciente de Node.js
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expón el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
