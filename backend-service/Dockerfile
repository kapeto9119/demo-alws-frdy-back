# Usa una imagen base de Node.js
FROM node:16-alpine

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluyendo las de desarrollo)
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Asegurar que todos los archivos tienen permisos adecuados
RUN chmod -R 755 /app

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que el backend se ejecutará
EXPOSE 5000

# Comando para iniciar la app
CMD ["npm", "start"]