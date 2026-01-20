<div align="center">
  <h1>📦 Golem</h1>
  <p>3D耗材管理后台</p>
</div>

## 📋 目录

- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
  - [方式一：使用 Docker Compose（推荐）](#方式一使用-docker-compose推荐)
  - [方式二：本地开发](#方式二本地开发)
- [环境变量](#环境变量)
- [项目结构](#项目结构)
- [常见问题](#常见问题)

## ✨ 功能特性

- 🚀 基于 React 19 和 Express 5 的现代化全栈应用
- 🐳 开箱即用的 Docker 支持
- 💾 数据持久化存储
- 🔐 环境变量配置支持
- 🔄 热重载开发体验

## 📸 预览

![预览图](https://github.com/leleyy1997/golem/blob/main/images/20260120161831.jpg?raw=true)
![预览图](https://github.com/leleyy1997/golem/blob/main/images/20260120161857.jpg?raw=true)
![预览图](https://github.com/leleyy1997/golem/blob/main/images/20260120161903.jpg?raw=true)

## 🛠 技术栈

- **前端**: React 19, Vite 6, Tailwind CSS
- **后端**: Node.js 20, Express 5
- **容器化**: Docker, Docker Compose
- **开发工具**: TypeScript, Concurrency

## 🚀 快速开始

### 方式一：使用 Docker Compose（推荐）

这是最简单快捷的方式，无需手动安装 Node.js 和依赖包。

#### 前置要求

- Docker Engine 20.10+
- Docker Compose 2.0+

#### 启动步骤

1. **创建工作目录并下载配置文件**

   ```bash
   mkdir golem && cd golem
   curl -o docker-compose.yml https://raw.githubusercontent.com/leleyy1997/golem/main/docker-compose.yml
   ```

2. **配置环境变量（可选）**

   创建 `.env` 文件设置应用密码：
   ```bash
   echo "APP_PASSWORD=your_secure_password" > .env
   ```

   如果不设置，默认密码为 `golem`

3. **启动服务**
   ```bash
   docker-compose up -d
   ```

3. **查看服务状态**
   ```bash
   docker-compose ps
   ```

4. **访问应用**

   应用将在 http://localhost:3001 启动

5. **查看日志**
   ```bash
   # 查看所有日志
   docker-compose logs -f

   # 查看最近 100 行日志
   docker-compose logs --tail=100 -f
   ```

#### 常用 Docker Compose 命令

```bash
# 停止服务
docker-compose stop

# 启动服务
docker-compose start

# 重启服务
docker-compose restart

# 停止并删除容器
docker-compose down

# 停止并删除容器及数据卷（⚠️ 会删除所有数据）
docker-compose down -v

# 重新构建并启动
docker-compose up -d --build
```

#### 数据持久化

数据会自动持久化到项目根目录的 `./data` 文件夹中，即使删除容器，数据也不会丢失。

### 方式二：本地开发

适用于需要修改源代码或进行调试的场景。

#### 前置要求

- Node.js 20+
- npm 或 pnpm

#### 启动步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

   这将同时启动前端（Vite）和后端（Express）服务。

43 **访问应用**

   前端: http://localhost:3000
   后端 API: http://localhost:3001
   默认密码  golem

#### 可用命令

```bash
# 开发模式（前后端同时启动）
npm run dev

# 仅启动前端
npm run dev:client

# 仅启动后端
npm run dev:server

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🔧 环境变量

| 变量名 | 说明 | 默认值 | 必需 |
|--------|------|--------|------|
| `APP_PASSWORD` | 应用访问密码 | `golem` | 否 |
| `PORT` | 应用端口 | `3001` | 否 |
| `NODE_ENV` | 运行环境 | `production` | 否 |
| `DATA_DIR` | 数据存储目录 | `/app/data` | 否 |

## 📁 项目结构

```
filamenttracker/
├── components/          # React 组件
├── pages/              # 页面组件
├── server/             # Express 服务器代码
├── public/             # 静态资源
├── lib/                # 工具库
├── data/               # 数据持久化目录（运行时生成）
├── Dockerfile          # Docker 镜像构建文件
├── docker-compose.yml  # Docker Compose 配置
├── package.json        # 项目依赖配置
├── vite.config.ts      # Vite 构建配置
└── tsconfig.json       # TypeScript 配置
```

## ❓ 常见问题

### Q: 修改代码后如何重新构建 Docker 镜像？

```bash
docker-compose up -d --build
```

### Q: 如何重置应用数据？

```bash
# 停止服务
docker-compose down

# 删除数据目录
rm -rf ./data

# 重新启动服务
docker-compose up -d
```

### Q: 端口 3001 被占用怎么办？

编辑 [docker-compose.yml](docker-compose.yml)，修改端口映射：
```yaml
ports:
  - "8080:3001"  # 将宿主机端口改为 8080
```

### Q: 如何在生产环境部署？

1. 修改 `docker-compose.yml` 中的环境变量
2. 配置反向代理（如 Nginx）
3. 设置 `restart: always` 确保服务自动重启
4. 配置 SSL/TLS 证书

## 📝 开发路线图

### 短期计划
- [x] 优化 UI/UX 设计
- [ ] 添加用户反馈机制
- [ ] 完善错误处理和日志记录
- [ ] 增加单元测试和集成测试

### 中期计划
- [ ] 支持多种数据存储方案
  - [ ] MySQL 集成
  - [ ] PostgreSQL 集成
  - [ ] Redis 缓存层
- [ ] 数据库迁移和版本管理
- [ ] 数据导入/导出功能
- [ ] 备份和恢复机制

### 长期计划
- [ ] 多用户和权限管理
- [ ] RESTful API 完善
- [ ] 数据分析和报表功能
- [ ] 移动端适配
- [ ] 插件系统
- [ ] 容器编排支持 (Kubernetes)

### 社区贡献
欢迎大家对功能提出建议和贡献代码！如果您有其他想法，请随时 [提 Issue](https://github.com/leleyy1997/golem/issues)。

## 📄 许可证

Apache License 2.0

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
