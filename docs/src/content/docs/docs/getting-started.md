---
title: Commencer
description: Le projet en plus de détails
---

## Le projet

Le projet est répartie en plusieurs parties :

- **docs** : la documentation du projet
- **mobile** : l'application mobile
- **server** : le backend/api

En soit, en tant que dev. On utilisera que **mobile** et **server**. Le reste on
y touche pas trop (sauf **docs** qui est pour ce site).

## Les technologies

### Mobile

- React Native
- Expo
- React Navigation

### Server

- NodeJS
- Express

### Database

- Planetscale
- MySQL

## Les outils

- Docker
- Git
- Github
- Github Actions
- Github Packages
- Prisma
- Postman

# Les conventions

## Git

- Nominations des branches : `type/feature` eg pour l'update de la doc :
  `docs/update`, pour l'ajout d'une route d'api :
  `api/add-route-<nom-de-la-route>`
- Nominations des commits : Utilisation de gitmoji (https://gitmoji.dev/) pour
  les commits
- Nominations des PR : Réutilisation du nom de la branche, dans la description,
  on met le nom de la feature et on met les issues liées à la PR si il y en a; A
  savoir que vous ne pouvez pas push sur les branches versions seulement Merge
  après qu'une merge request est été validée et qu'elle est passé les tests

## Code

### Structure du code

- Utilisation de ESLint pour la vérification et la correction du code

### Nommage des variables et fonctions

##### Variables

##### Fonctions

- Nominations des fonctions en camelCase;

```ts
function maFonction() {
  // ...
}
```

- Si une function est utilisé dans un seul fichier, on la met en
  `export default` sinon on la met en `export function`

- **(API)** Si une fonction communique avec la base de données elle est
  forcément dans le dossier `handlers` et doit être nommées selon ce qu'elle
  fait, par exemple toute communication avec la db concernant l'utilisateur sera
  dans le fichier `user.ts`

- **(API)** Si une fonction est une route d'api, elle doit être dans le dossier
  `routes/chemin-de-la-route`; D'abord un fichier `index.ts` qui exporte un
  router express tel que `export {router as defaultRouter};` pour la route par
  défaut et `export {router as <nom-de-la-route>Router};` pour les autres
  routes; Ensuite dans le dossier qui porte le nom de votre route vous créer un
  fichier selon la requête que vous voulez faire, par exemple `get.ts` pour une
  requête GET, `post.ts` pour une requête POST, etc...; Enfin dans ce fichier
  vous exportez une fonction `export {router as <type>Router};` et vous
  l'importer dans le fichier `index.ts` de votre route.
  [Exemple ici](/reference/api-example-router)

Je sais que suivre des règles c'est chiant mais au moins c'est propre et c'est
plus facile à comprendre pour tout le monde.
