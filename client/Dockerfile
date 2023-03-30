FROM node:8.9.3

# Args
ARG API_HOST

# Set working directory
RUN mkdir -p /app
WORKDIR /app

# Copy and build
COPY . /app
RUN npm install --legacy-peer-deps 
RUN npm run build

ENV API_HOST=$API_HOST
CMD PORT=$PORT npm run start:prod
