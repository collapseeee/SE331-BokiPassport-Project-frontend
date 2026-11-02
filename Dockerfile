# build stage
FROM node:24-alpine AS build-stage
WORKDIR /app

# Get args from guthib action and inject env during building dockerfile
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# prod stage
FROM nginx:stable-alpine AS prod-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx-vue-app.conf /etc/nginx/conf.d/default.conf
EXPOSE 80