FROM node:8.9.3

# Args
ARG GITLAB_USER
ARG CI_TOKEN

# Set working directory
RUN mkdir -p /app
WORKDIR /app

# Get env config
RUN git clone https://$GITLAB_USER:$CI_TOKEN@gitlab.com/kanehara/spotimix-env.git
RUN cp spotimix-env/server/prod/.env .env
RUN rm -rf spotimix-env

# Copy and build
COPY . /app
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install

CMD PORT=$PORT yarn start:prod
