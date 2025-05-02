FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:dev

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf