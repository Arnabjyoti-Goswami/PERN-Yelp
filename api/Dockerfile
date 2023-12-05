FROM node:15
WORKDIR /app
COPY package*.json ./
RUN npm install
# Since the first argument is . and not ./api/, you need to cd into the api folder of this project before running the docker-compose up command.
COPY . .
CMD [ "npm", "run", "dev" ]