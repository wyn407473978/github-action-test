#!/bin/bash
set -e

echo "Logging into Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "Pulling latest images..."
docker compose pull

echo "Stopping old containers..."
docker compose down

echo "Starting new containers..."
docker compose up -d --build

echo "Cleaning up old images..."
docker image prune -f

echo "Deployment completed!"
