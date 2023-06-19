FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json to working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy all files to working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Run npm start
CMD ["npm", "run","dev"]