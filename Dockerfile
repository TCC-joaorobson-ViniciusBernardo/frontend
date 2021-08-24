FROM node:alpine

WORKDIR /app/frontend

COPY package*.json ./
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "start"]
