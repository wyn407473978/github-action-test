# React + Gin 项目部署指南

## 项目结构
```
.
├── frontend/           # React 前端
│   ├── Dockerfile
│   └── nginx.conf
├── backend/            # Go Gin 后端
│   ├── Dockerfile
│   └── main.go
├── deploy/             # 部署脚本
│   ├── deploy.sh
│   └── docker-compose.prod.yml
├── docker-compose.yml  # 本地开发用
└── .github/workflows/deploy.yml
```

## GitHub Secrets 配置

在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

| Name | Description |
|------|-------------|
| `DOCKER_USERNAME` | Docker Hub 用户名 |
| `DOCKER_PASSWORD` | Docker Hub 密码或 Access Token |
| `SERVER_HOST` | 服务器 IP 地址 |
| `SERVER_USER` | SSH 用户名 |
| `SSH_PRIVATE_KEY` | SSH 私钥（带 PEM 头） |

## 服务器初始化

在目标服务器上执行：

```bash
# 安装 Docker
apt update && apt upgrade -y
apt install -y docker.io docker-compose

# 创建目录
mkdir -p /opt/app
cd /opt/app

# 将 docker-compose.prod.yml 复制到 /opt/app/docker-compose.yml
```

## 部署流程

1. 代码推送到 `main` 分支触发 CI/CD
2. GitHub Actions 自动构建 Docker 镜像
3. 镜像推送到 Docker Hub
4. SSH 到服务器拉取并启动新容器

## 手动部署（备选）

```bash
# 在项目根目录
docker compose -f deploy/docker-compose.prod.yml build
docker compose -f deploy/docker-compose.prod.yml up -d
```

## 验证部署

- 前端: http://服务器IP/
- 后端 API: http://服务器IP:8080/api/hello
