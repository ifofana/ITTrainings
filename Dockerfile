# stage 1
FROM node:latest as front-end
WORKDIR /ITTrainings
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=front-end /ITTrainings/dist/ITTrainings /usr/share/nginx/html