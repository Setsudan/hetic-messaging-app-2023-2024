FROM node:18-alpine

# Build the app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Run the app
CMD ["npm", "run", "start:prod"]
