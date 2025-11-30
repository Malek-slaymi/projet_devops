# Stage 1: Build the React application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# Installer les dépendances
RUN npm install
COPY . .
# Lancer la construction de l'application React
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:stable-alpine as production-stage
# Copier les fichiers statiques de l'étape de construction vers le répertoire NGINX
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
