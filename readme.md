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

```bash
cd hetic-mess && npm run start
```

## Troubleshooting

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
