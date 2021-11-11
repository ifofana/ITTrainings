# stage 1 - Lets build the "deployable package"
FROM node:latest as front-end
WORKDIR /ITTrainings

# Step 1 - Download all package dependencies first.
# We will redownload dependencies only when packages change.
COPY package.json package-lock.json ./
RUN npm install

# Step 2 - Copy all source and run build
COPY . ./
RUN npm run build --prod

# stage 2 - Let's build a minimal image with the "deployable package"
FROM nginx:alpine
COPY --from=front-end /ITTrainings/dist/ITTrainings /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]