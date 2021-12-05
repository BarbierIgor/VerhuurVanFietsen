# FROM node:14-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

FROM node:16.9.1-alpine as build-container
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm ci
COPY server ./src
RUN npm run build

## Now, we create a secondary container, to be used in production
FROM node:16.9.1-alpine as production-container
WORKDIR /usr/app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
RUN npm install pm2 -g
COPY --from=build-container /usr/app/dist .
EXPOSE 80

CMD ["pm2-runtime","app.js"]