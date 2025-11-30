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
# Copier une configuration NGINX par défaut pour React/routing si nécessaire
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Exposer le port par défaut pour le web
EXPOSE 80
# Commande par défaut pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
