# Use the official Node.js image as a parent image
#FROM node:18-alpine
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install Gatsby CLI globally inside the image
RUN npm install -g gatsby-cli

