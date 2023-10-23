---
title: La route par défaut
description: la route par défaut de notre API
---

# Route `/api/v1` || `/`

Cette route ne sert a rien appart vérifier que l'api est en ligne. Elle ne donne qu'une seule réponse:

```json
{
    "code":200,
    "message":"Default router is working!",
    "data":["Hello World !"],
    "requestTime":"2023-10-23T07:39:33.890Z", // Date de la requête
    "apiVersion":"v0.0.1" // Version de l'api
}
```

La strucure de cette réponse correspond à la structure de toutes les réponses de l'API.

- `code` : Le code de la réponse, il est toujours égal à `200` pour cette route mais d'autres code peuvent être renvoyé pour d'autres routes.
- `message` : Dans le cas d'une erreur ce message sera un raccourci du message d'erreur
- `data` : Dans le cas d'une erreur ce sera un rendu complet de l'erreur sinon ce sera les données demandées
- `requestTime` : La date de la requête
- `apiVersion` : La version de l'api