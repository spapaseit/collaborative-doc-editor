FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (without copying local node_modules)
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild SQLite3 for the correct environment after copying the code
RUN npm rebuild sqlite3

# Ensure the versionHistory.db file is created with appropriate permissions
##RUN mkdir -p /usr/src/app/data && touch /usr/src/app/data/versionHistory.db

# Expose the ports the app runs on
EXPOSE 4000
EXPOSE 5000

# Command to run both the websocket server and the db server
CMD ["npm", "start"]