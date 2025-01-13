FROM node:23.3.0

WORKDIR /app

COPY package*.json .

RUN npm install || { cat $(ls -t /root/.npm/_logs/*-debug-0.log | head -n 1); exit 1; }

COPY . .
