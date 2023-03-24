# [spotimix](http://www.spotimix.com)

A webapp to query against Spotify's recommendation endpoint. You can feed a combination of songs,
artists, genres, and song features to generate a playlist. Check it out [here](http://www.spotimix.com)

Stack:

- GraphQL
- Vue.js
- Express/Node.js

# Deploying

1. Merge into `master` -> triggers GitLab CI / CD to push new docker images
2. Reboot lightsail instance -> https://lightsail.aws.amazon.com/ls/webapp/home/instances
