# pull the container
FROM node:alpine

# Create a working dir
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@8.12.1

# Install dependencies
RUN npm install

# Copy source
COPY . /app

# port number to expose
EXPOSE 3000

# run app
CMD npm start