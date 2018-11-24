#!/bin/sh

# any future command that fails will exit the script
set -e

apk update && apk add openssh

# Lets write the public key of our aws instance
eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

mkdir -p ~/.ssh
touch ~/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config

scp docker-compose.yml ubuntu@${SERVER_IP}:/srv/docker
ssh ubuntu@${SERVER_IP} 'bash' < ./bin/pullup.sh
