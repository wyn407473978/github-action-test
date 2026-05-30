#!/bin/bash
set -e

echo "Logging into Aliyun Container Registry..."
echo "$ALIYUN_ACCESS_KEY_SECRET" | docker login -u "$ALIYUN_ACCESS_KEY_ID" --password-stdin "$ALIYUN_REGISTRY_URL"

echo "Pulling latest images..."
docker compose pull

echo "Stopping old containers..."
docker compose down

echo "Starting new containers..."
docker compose up -d

echo "Cleaning up old images..."
docker image prune -f

echo "Deployment completed!"
