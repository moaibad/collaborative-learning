# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install
RUN npm install -g prisma

# Copy the rest of the application code to the working directory
COPY . .
RUN ["npx", "prisma", "migrate", "dev", "--name", "init"]