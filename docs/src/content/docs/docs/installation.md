---
title: Installation
description: Installation du projet
---

L'installation se fait en plusieurs étapes :

## Prérequis

- [Node.js](https://nodejs.org/en/) version 16 ou supérieure
- [Docker](https://www.docker.com/) version 20 ou supérieure

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/setsudan/hetic-messaging-app-2023-2024.git
```

### 2. Installer les dépendances

Dans le dossier parents de touts les dossiers du projet, exécuter la commande
suivante :

```bash
npm install
```

Puis pour installer les dépendances des différents dossiers du projet, exécuter

```bash
npm run init
```

Cette commande va installer les dépendances des dossiers serveur et mobile du
projet.

### 3. Configurer le projet

#### 3.1. Configurer le serveur

Dans le dossier `server`, créer un fichier `.env` et y ajouter les variables

Les valeurs des variables environnementales sont à récupérer dans le fichier
`docker-compose.yml`

```env
PORT=
API_VERSION=
JWT_SECRET=
DATABASE_URL=
```

#### 3.2. Configurer l'application mobile

Dans le dossier `mobile`, créer un fichier `.env` et y ajouter les variables

Pour récupérer la variables merci de vous référez à la documentation de
[websocket](/docs/connect-websocket)

```env
EXPO_PUBLIC_API_IP=
```

### 4. Lancer le projet

Pour lancer le projet exécuter la commande suivante :

```bash
npm run start
```

Cette commande va lancer les conteneurs docker du projet.

Il faut ensuite lancer l'application mobile avec la commande suivante :

```bash
npm run mobile:start
```
