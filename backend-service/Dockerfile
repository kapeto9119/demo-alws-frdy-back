# Usa una imagen base de Node.js
FROM node:16-alpine

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install --only=production

# Copiar todo el código fuente
COPY . .

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que el backend se ejecutará
EXPOSE 5000

# Comando para iniciar la app
CMD ["npm", "start"]