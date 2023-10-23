---
title: Connecter Websocket
description: Comment connecter l'api et l'application mobile en websocket ?
---

# Connecter Websocket

## Step 1 : Récupérer son adresse IP

Pour connecter l'application mobile à l'API, il faut récupérer l'adresse IP de
l'ordinateur sur lequel l'API est lancée. Pour cela, il faut ouvrir un terminal
et taper la commande suivante :

```bash
ipconfig
```

L'adresse IP est affichée dans la ligne `Adresse IPv4`.

Malheureusement, cette adresse IP n'est pas fixe. Elle peut changer à chaque
fois que l'ordinateur est redémarré. Il faut donc la récupérer à chaque fois que
l'on veut connecter l'application mobile à l'API. **Ne fonctionne pas à HETIC.**

## Step 2 : Lancer l'API

Pour lancer l'API, il faut ouvrir un terminal dans le projet et taper la
commande suivante :

```bash
npm run docker:build # si c'est la première fois
# ou
npm run docker:start # Si vous aviez déjà lancer le container au moins une fois
```

## Step 3 : Renseigner les variables environnementales côté Mobile

Pour connecter l'application mobile à l'API, il faut renseigner la variable
environnementale `EXPO_PUBLIC_API_IP` dans le fichier `mobile/.env`. Il faut
mettre l'adresse IP récupérée à l'étape 1.

## Step 4 : Lancer l'application mobile

Si tout marche bien vous aurez dans la console de commande de l'api un message
qui vous indique que l'application mobile est connectée à l'API voir exemple ci
dessous :

```bash
2023-10-23 20:32:30 Client connected
2023-10-23 20:32:30 Message received: Hello, server!
2023-10-23 20:33:48 Client disconnected
```
