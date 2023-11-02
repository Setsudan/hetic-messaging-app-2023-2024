---
title: Connecter Websocket
description: Comment connecter l'api et l'application mobile en websocket ?
---

# Connecter Websocket

## Step 1: Utiliser Ngrok

Dans le dossier parent vous avez un nouveau fichier `ngrok.exe`.

Pour lancer ngrok écriver la commande suivante : `ngrok http 8080`

ça ouvrira votre port 8080 au web à une adresse web donnée après la commande
ci-dessus

## Step 2 : Lancer l'API

Pour lancer l'API, il faut ouvrir un terminal dans le projet et taper la
commande suivante :

```bash
npm run start:server
```

## Step 3 : Renseigner les variables environnementales côté Mobile

Pour connecter l'application mobile à l'API, il faut renseigner la variable
environnementale `EXPO_PUBLIC_API_IP` dans le fichier `mobile/.env`. Il faut
mettre l'adresse donnée par ngrok dans l'étape 1.

## Step 4 : Lancer l'application mobile

Si tout marche bien vous aurez dans la console de commande de l'api un message
qui vous indique que l'application mobile est connectée à l'API voir exemple ci
dessous :

```bash
2023-10-23 20:32:30 Client connected
2023-10-23 20:32:30 Message received: Hello, server!
2023-10-23 20:33:48 Client disconnected
```
