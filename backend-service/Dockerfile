# Usa una imagen base de Node.js
FROM node:16-alpine

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que el backend se ejecutará
EXPOSE 5000

# Comando para iniciar la app
CMD ["npm", "start"]