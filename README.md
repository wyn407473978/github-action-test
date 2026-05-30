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

| Name | Description | 示例 |
|------|-------------|------|
| `ALIYUN_REGISTRY_URL` | 阿里云镜像仓库地址 | `registry.cn-hangzhou.aliyuncs.com` |
| `ALIYUN_REGISTRY_NAMESPACE` | 阿里云命名空间 | `my-namespace` |
| `ALIYUN_REGISTRY_USERNAME` | 镜像仓库用户名 | `your_username` |
| `ALIYUN_REGISTRY_PASSWORD` | 镜像仓库密码 | `your_password` |
| `SERVER_HOST` | 服务器 IP 地址 | `123.45.67.89` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SSH_PRIVATE_KEY` | SSH 私钥（带 PEM 头） | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

### 阿里云容器镜像服务配置

1. 登录 [阿里云容器镜像服务](https://cr.console.aliyun.com)
2. 创建命名空间（如 `my-namespace`）
3. 创建一个镜像仓库：
   - `react-gin`（使用 `:frontend` 和 `:backend` tag 区分前后端）
4. 设置仓库密码：
   - 进入镜像仓库 → 访问凭证 → 设置独立密码

## 服务器初始化

在目标服务器上执行：

```bash
# 安装 Docker
apt update && apt upgrade -y
apt install -y docker.io docker-compose

# 创建目录
mkdir -p /opt/app
cd /opt/app

# 将 deploy/docker-compose.prod.yml 复制到 /opt/app/docker-compose.yml
```

## 部署流程

1. 代码推送到 `main` 分支触发 CI/CD
2. GitHub Actions 自动构建 Docker 镜像
3. 镜像推送到阿里云容器镜像仓库
4. SSH 到服务器拉取并启动新容器

## 验证部署

- 前端: http://服务器IP/
- 后端 API: http://服务器IP:8080/api/hello
