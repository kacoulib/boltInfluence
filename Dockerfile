FROM node:lts-slim

ARG NODE_ENV

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
