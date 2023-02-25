# syntax=docker/dockerfile:1
FROM node:lts-alpine3.17 AS builder

WORKDIR /server



COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@9.5.0

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
