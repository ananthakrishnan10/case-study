FROM node:22.11.0-slim

RUN corepack enable && corepack prepare yarn@4.6.0 --activate

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]