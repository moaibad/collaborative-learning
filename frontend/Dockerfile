# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files
COPY . .

# # Build the React app
RUN npm run build

RUN npm install -g serve
# Expose the default port for Nginx
EXPOSE 3000

# # Command to start Nginx when the container runs
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "deploy"]