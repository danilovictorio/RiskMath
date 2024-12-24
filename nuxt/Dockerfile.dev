FROM node:18-bullseye

WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar la caché
COPY ./nuxt/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY ./nuxt ./

EXPOSE 3000

CMD ["npm", "run", "dev"]