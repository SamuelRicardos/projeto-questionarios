FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY ../. .

RUN npm install

RUN npm install -g nodemon

EXPOSE 3001

CMD ["npm", "run", "dev"]
