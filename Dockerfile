FROM node:latest

WORKDIR /usr/src/app

ENV INLINE_RUNTIME_CHUNK false

ENV API_URL http://localhost:3000/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run server