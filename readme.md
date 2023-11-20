# Comment lancer l'application

## Installation

```bash
cd hetic-mess
```

```bash
npm install
```
ou
```bash
yarn install
```

## Lancer le projet

D'abord, il faut lancer la BDD:

```bash
npm run start:db
```

Ensuite, il faut utiliser ngrok pour pouvoir accéder à la BDD depuis l'application:

```bash
npm run start:ngrok
```

Cette commande donnera un lien "Forwarding" line. Copiez le lien et allez dans le fichier `hetic-mess/db/pocket.ts`.
Remplacez la valeur de la variable `url` par le lien copié.

Une fois que cela est fait, vous pouvez lancer l'application:

```bash
cd hetic-mess && npm run start
```

## Troubleshooting

## `npm run start:ngrok` ne fonctionne pas

Si c'est le cas, il est fort probable que ce soit un problème de compte ngrok. Il est normalement configuré pour utiliser l'un des nôtres, mais si ce n'est pas le cas,
vous pouvez créer un compte ngrok et utiliser votre propre token [ici](https://ngrok.com/download)

Si vous suivez les instructions données sur le site, il n'y aura normalement pas de problèmes.

## `npm run start:db` ne fonctionne pas

Allez dans le dossier db et lancez le .exe de PocketBase. La documentation de pocketbase est disponible [ici](https://pocketbase.io/docs/)

Il se peut que le problème vienne du fait que vous êtes sur Mac ou Linux.
Dans ce cas, vous pouvez:
- installer [wine](https://www.winehq.org/) et lancer le .exe avec wine.
- Installer la version pocketbase correspondante à votre OS [ici](https://pocketbase.io/docs/)

## `npm run start` ne fonctionne pas

Si vous avez une erreur du type `Error: Cannot find module 'expo-cli'`, il faut installer expo-cli:

```bash
npm install -g expo-cli
```

Si vous avez une erreur du type `Error: Cannot find module 'expo'`, il faut installer expo:

```bash
npm install -g expo
```

Si vous avez d'autres erreurs, refaites une installation des modules:

```bash
cd hetic-mess && npm install
```

## `npm run start` fonctionne mais l'application ne se lance pas

Si vous utilisez un émulateur directement sur votre ordinateur, il faut d'abord lancer l'émulateur, puis lancer l'application.
Une fois que l'app est lancée, il faut appuyer sur `a` dans le terminal qui a lancé l'application ou `i` si vous êtes sur Mac.

Si vous utilisez un téléphone, il faut installer l'application expo sur votre téléphone et scanner le QR code qui s'affiche dans le terminal qui a lancé l'application.
