# 服务器初始化脚本
# 在服务器上运行一次即可

#!/bin/bash
set -e

echo "Installing Docker..."
apt update && apt upgrade -y
apt install -y docker.io docker-compose

echo "Creating app directory..."
mkdir -p /opt/app
cd /opt/app

echo "Copy docker-compose.prod.yml to /opt/app/docker-compose.yml"
# 将项目中的 deploy/docker-compose.prod.yml 复制到 /opt/app/docker-compose.yml

echo "Docker installation completed!"
echo "Please run: cd /opt/app && docker login"
