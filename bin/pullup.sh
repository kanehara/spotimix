#!/bin/sh
set -e
cd /srv/docker
docker-compose pull && docker-compose up -d
