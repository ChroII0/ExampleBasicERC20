# syntax=docker/dockerfile:1
FROM node:lts-alpine3.17 AS builder

ENV REACT_APP_ADDRESS_MYTOKEN_CONTRACT=<----Address-MyToken-Contract---->
ENV REACT_APP_ADDRESS_TOKENSALE_CONTRACT=<----Address-TokenSale-Contract---->

WORKDIR /client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@9.5.0

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
