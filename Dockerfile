# build stage
FROM node:24-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# prod stage
FROM nginx:stable-alpine AS prod-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx-vue-app.conf /etc/nginx/conf.d/default.conf
EXPOSE 80