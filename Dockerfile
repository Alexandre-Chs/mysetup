# Utiliser une image de Node.js légère basée sur Alpine
FROM node:20-alpine

# Définir le dossier de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste de l'application dans le container
COPY . .

# Builder l'application pour la production
# RUN npm run build

# # Variable d'environnement pour Next.js en mode production
# ENV NODE_ENV=production

# Exposer le port 3000
EXPOSE 3000

# Commande pour lancer l'application en production
CMD npm run dev