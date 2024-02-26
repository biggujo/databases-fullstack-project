FROM node:21.6.2-slim

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5173

CMD ["yarn", "run", "vite"]
