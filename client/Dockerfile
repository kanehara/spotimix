FROM node:8.9.3

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install
RUN yarn build

CMD PORT=$PORT yarn start:prod
