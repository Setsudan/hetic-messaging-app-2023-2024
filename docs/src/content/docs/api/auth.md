---
title: Auth
description: La route auth de notre API
---

# Route `/api/v1/auth/**`

## Requêtes POST

### `/api/v1/auth/login`

Cette requête permet de se connecter à l'application.

Cette une requête post qui requiert un body json avec les champs suivants :

- `identity` : Peut être soit un email soit un username
- `password` : Le mot de passe de l'utilisateur

Les réponses possibles sont :

#### Success

```json
{
    "code": 200,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Success",
    "apiVersion": "v0.0.1",
    "data": ["token-JWT"],
};
```

#### Errors

```json
{
"code": 404,
"requestTime": "2023-10-23T07:49:26.825Z",
"message": "User not found",
"apiVersion": "v0.0.1",
"data": [],
};
```

```json
{
    "code": 401,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Invalid password",
    "apiVersion": "v0.0.1",
    "data": [],
};
```

#### Server error

```json
{
    "code": 500,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Server error",
    "apiVersion": "v0.0.1",
    "data": ["err"],
};
```

### `/api/v1/auth/signUp`

#### Success

```json
{
    "code": 200,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Success",
    "apiVersion": "v0.0.1",
    "data": [
				"uuid",
				"display_name",
				"username",
				"email",
				"profile_picture",
			]
};
```

#### Errors

```json
{
"code": 400,
"requestTime": "2023-10-23T07:49:26.825Z",
"message": "User is empty",
"apiVersion": "v0.0.1",
"data": [],
};
```

```json
{
    "code": 400,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Email is not valid",
    "apiVersion": "v0.0.1",
    "data": [],
};
```

```json
{
    "code": 400,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Password is not valid",
    "apiVersion": "v0.0.1",
    "data": [],
};
```

#### Server error

```json
{
    "code": 500,
    "requestTime": "2023-10-23T07:49:26.825Z",
    "message": "Server error",
    "apiVersion": "v0.0.1",
    "data": ["err"],
};
```
