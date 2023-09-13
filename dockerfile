#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=node /app/dist/itreport-front /usr/share/nginx/html

# docker buildx build -t ricsos98/it-report-ui --platform=linux/amd64,linux/arm64 --push .