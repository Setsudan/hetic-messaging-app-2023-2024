# HETIC Messaging App (2023-2024)

This repository is for the HETIC Messaging App project, which is divided into different versions and components. Below, you can find an overview of the project's structure and version progression.

## Versions and Their Significance

- `0.0.x` - **Setup and Configuration:** Initial setup and project configuration.
- `1.0.x` - **"Ready to Develop":** Basic project structure and ready for development.
- `2.0.x` - **"Backend Ready":** Backend development completed and ready for integration.
- `3.0.x` - **"First Version of the Mobile App":** The first version of the mobile app with basic functionality.
- `4.0.x` - **"Release Ready":** The project is ready for release.

## Server: ExpressJS

### Structure

The server-side of this project is built using ExpressJS, a popular Node.js framework. Here's an overview of the server's directory structure:

```
|- app
|   |- routes         // All possible routes
|       |- *
|           |- index.ts   // Combines all HTTP request routes into one router
|           |- get.ts     // Handles GET requests
|           |- post.ts    // Handles POST requests
|           |- update.ts  // Handles PATCH requests
|           |- delete.ts  // Handles DELETE requests
|   |- router.ts       // Manages all the */index.ts routers to export them as one
|- index.ts            // App entry point
|- swagger.ts          // Documentation generator
```

## Client: React Native

### Structure

The client-side of this project utilizes React Native for mobile app development. Here's an overview of the client's directory structure:

```
|- assets            // Contains assets such as images and fonts
|- app
|   |- components    // Reusable components
|   |- pages         // Individual app pages/screens
|   |- func          // Common functions used throughout the app
|   |- index.tsx     // The default starting point of the app
```

## Database: PostgreSQL

The database is entirely on docker. To start the database, run the following command:

```bash
docker-compose up -d
```

To stop the database, run the following command:

```bash
docker-compose down
```

## Documentation(server): Swagger

The documentation is generated using Swagger. It is availiable at the following URL:

```bash
http://localhost:8080/api/v1/docs
```

## Documentation(client): Storybook

The documentation is generated using Storybook. To open it on the android/IOS emulator, run the following command:

```bash
yarn storybook:<android|ios>
```