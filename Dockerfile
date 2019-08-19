FROM node:lts-slim

ARG NODE_ENV

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

ARG ROOT_URL
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
