# --- STAGE 1: The Builder (LOURDE) ---
# Utilise l'image Node complète pour compiler et installer les dépendances de développement.
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de manifestes pour installer les dépendances
COPY package*.json ./

# Installer toutes les dépendances (y compris de dev)
RUN npm install

# Copier le reste du code source
COPY . .

# Exécuter la commande de build (si nécessaire, ex: pour TypeScript ou React)
# Si c'est une simple application Express/Flask sans build, vous pouvez sauter cette ligne.
# RUN npm run build

# --- STAGE 2: The Final/Runtime (LÉGÈRE) ---
# Utilise une image Node plus petite (slim) pour l'exécution.
FROM node:20-slim

# Définir les variables d'environnement
ENV NODE_ENV production
WORKDIR /app

# Copier uniquement les dépendances de production et le code depuis le stage 'builder'
# On copie les node_modules de production (le builder les a installés)
COPY --from=builder /app/node_modules /app/node_modules 
# Si vous avez une étape de build, copiez le répertoire de build (ex: 'dist')
# COPY --from=builder /app/dist /app/dist 
# Si vous copiez juste le code source (sans build)
COPY --from=builder /app/index.js /app/index.js 

# Exposer le port de l'application
EXPOSE 8080

# Commande de démarrage de l'application
CMD ["node", "index.js"]