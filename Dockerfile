FROM node:latest

WORKDIR /usr/src/app

ENV INLINE_RUNTIME_CHUNK false

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run server