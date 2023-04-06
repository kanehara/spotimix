#!/bin/sh
set -e
cd /srv/docker
docker image prune -f
docker-compose pull && docker-compose up -d
