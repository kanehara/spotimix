# Startup script for lightsail
curl -o lightsail-compose.sh https://raw.githubusercontent.com/kanehara/mixceed/master/lightsail-compose.sh

chmod +x ./lightsail-compose.sh

# To be used by lightsail-compose on instance start
GITLAB_USER=kanehara
GITLAB_TOKEN=token-here

./lightsail-compose.sh $GITLAB_USER $GITLAB_TOKEN