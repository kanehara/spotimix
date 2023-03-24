FROM node:19

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
RUN npm install

CMD PORT=$PORT npm start:prod
