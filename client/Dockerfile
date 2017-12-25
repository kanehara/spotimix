FROM node:8.9.3

# Args
ARG API_HOST

# Set working directory
RUN mkdir -p /app
WORKDIR /app

# Copy and build
COPY . /app
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install
RUN yarn build

ENV API_HOST=$API_HOST
CMD PORT=$PORT yarn start:prod
