# Use the official Node.js image as a base image
FROM node:latest 

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Command to run the React app in development mode
CMD ["npm", "run", "dev"]
