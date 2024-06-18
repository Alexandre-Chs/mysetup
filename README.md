# My setup

Un site qui permet facilement de retrouver pleins d’idées de setup autant gaming que bureautique. A la pinterest, une sorte de fil d’image, ou chaque user peut avoir sa propre page custom pour mettre en avant son setup avec toutes les infos autour. Cela permet surtout d’avoir une plateforme pour avoir des idées et où acheter ensuite.

## Commandes disponibles

Lancer le server de developpement :
```bash
npm install
npm run dev
```

Base de donnée :

```bash
# lancer drizzle studio
npm run db:ui
# DEV
npm run db:push # Envoi en DB tout les changements entre la db et les schemas

# PROD
# crée les fichiers de migrations liés aux schéma et les migres sur la base de donnée 
npm run db:migrate 
```
