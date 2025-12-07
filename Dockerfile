FROM node:lts
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

ENTRYPOINT [ "npm", "start" ]
