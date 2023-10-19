# Application de messagerie HETIC (2023-2024)

Ce répo concerne le projet de l'application de messagerie HETIC, qui est divisé en différentes versions et composants. Ci-dessous, vous trouverez un aperçu de la structure du projet et de la progression des versions.

## Versions et leur signification

- `0.0.x` - **Configuration initiale :** Configuration initiale et configuration du projet.
- `1.0.x` - **"Prêt à être développé" :** Structure de base du projet et prêt pour le développement.
- `2.0.x` - **"Backend prêt" :** Développement du backend terminé et prêt pour l'intégration.
- `3.0.x` - **"Première version de l'application mobile" :** La première version de l'application mobile avec des fonctionnalités de base.
- `4.0.x` - **"Prêt à être publié" :** Le projet est prêt à être publié.

## Serveur : ExpressJS

### Structure

La partie serveur de ce projet est construite en utilisant ExpressJS, un framework Node.js populaire. Voici un aperçu de la structure du répertoire du serveur :

```
|- app
|   |- routes         // Toutes les routes possibles
|       |- *
|           |- index.ts   // Combine toutes les routes de demandes HTTP en un routeur
|           |- get.ts     // Gère les demandes GET
|           |- post.ts    // Gère les demandes POST
|           |- update.ts  // Gère les demandes PATCH
|           |- delete.ts  // Gère les demandes DELETE
|   |- router.ts       // Gère tous les routeurs */index.ts pour les exporter en un seul
|- index.ts            // Point d'entrée de l'application
|- swagger.ts          // Générateur de documentation
```

## mobile : React Native

### Structure

La partie mobile de ce projet utilise React Native pour le développement de l'application mobile. Voici un aperçu de la structure du répertoire du mobile :

```
|- assets            // Contient des ressources telles que des images et des polices
|- app
|   |- components    // Composants réutilisables
|   |- pages         // Pages/écrans individuels de l'application
|   |- func          // Fonctions communes utilisées dans toute l'application
|   |- index.tsx     // Point de départ par défaut de l'application
```

## Base de données : PostgreSQL

La base de données est entièrement dans Docker. Pour démarrer la base de données, exécutez la commande suivante :

```bash
docker-compose up -d
```

Pour arrêter la base de données, exécutez la commande suivante :

```bash
docker-compose down
```

## Documentation (serveur) : Swagger

La documentation est générée à l'aide de Swagger. Elle est disponible à l'URL suivante :

```bash
http://localhost:8080/api/v1/docs
```

## Documentation (mobile) : Storybook

La documentation est générée à l'aide de Storybook. Pour l'ouvrir sur l'émulateur Android/IOS, exécutez la commande suivante :

```bash
yarn storybook:<android|ios>
```