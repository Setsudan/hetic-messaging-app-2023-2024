# hetic-messaging-app-2023-2024

## Server: ExpressJS

### Structure

```
|-app
|   |-routes // All routes possible
|       |-*
|           |-index.ts // file to combine all the http request route into one router
|           |-get.ts // file for GET request
|           |-post.ts // file for POST request
|           |-update.ts // file for PATCH request
|           |-delete.ts // file for DELETE request
|   |-router.ts // manage all the */index.ts router to export it into one
|-index.ts // App entry
|-swagger.ts // Documentation generator
```

## Client: React Native

```
|-assets // ... Assets
|-app
|   |-components // components
|   |-pages // pages
|   |-func // common functions
|   |-index.tsx // default page for the app
```