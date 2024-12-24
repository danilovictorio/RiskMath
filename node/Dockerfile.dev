FROM node:14

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias primero
COPY package*.json ./

RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 3102

CMD ["node", "index.js"]