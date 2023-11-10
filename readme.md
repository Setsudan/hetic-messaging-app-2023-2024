# Comment faire fonctionner l'app

## installation

```bash
cd hetic-mess
```

```bash
npm install
```

## Lancer le projet

Il faut d'abord lancer l'api

```bash
npm run start:db
```

Puis lancer ngrok dans un autre terminal

```bash
npm run start:ngrok
```

Cette commande donnera un lien, dans la console de commande à la ligne
"Forwarding", copier le lien et aller dans `hetic-mess/db/pocket.js` et
remplacer le lien dans la variable `url` par celui que vous venez de copier.
