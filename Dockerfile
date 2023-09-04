# Use the official Node.js 14 image as the base
FROM node:14 AS base

WORKDIR /app

COPY package*.json ./

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --legacy-peer-deps

# Copy the .env file from local to the working directory in the container
COPY .env ./

COPY . .

RUN npm run build


# Use a lightweight Node.js image for the final image
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built application code from the previous stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules

# Copy the .env file from the previous stage
COPY --from=base /app/.env ./

# Set the container port
EXPOSE 80

# Define the command to start the applicatiwon
CMD ["node", "dist/index.js"]
