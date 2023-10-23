---
title: Users
description: La route users de notre API
---

# Route `/api/v1/users/**`

## Requêtes GET

### `/api/v1/users/getAll`

Cette route permet de récupérer tous les utilisateurs de la base de données.
Elle sera à retirer plus tard mais pour le moment elle nous permet de savoir si
la connection avec le backend est en ligne.

Cette route ne prend pas de param et renvoie cette réponse avec les utilisateur
dans `data`.

Voici un exemple de résultat de la requête :

```json
{
  "code": 200,
  "requestTime": "2023-10-23T07:49:26.825Z",
  "message": "Success",
  "apiVersion": "v0.0.1",
  "data": [
    {
      "profile_picture": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      "display_name": "John Doe",
      "username": "john_doe",
      "phone_number": null,
      "email": "johndoe@gmail.com",
      "about": "Hello World"
    }
  ]
}
```
