# FilamentTracker 部署完成指南

## ✅ 已完成的工作

### 1. 后端服务器实现
- ✅ 创建 Node.js + Express 后端服务器
- ✅ 实现基于 JSON 文件的数据持久化
- ✅ 提供 RESTful API 接口（CRUD 操作）

### 2. 前端集成
- ✅ 创建 API 调用工具 `lib/api.ts`
- ✅ 更新 DashboardPage 和 InventoryPage 连接后端 API
- ✅ 配置 Vite 代理转发 API 请求

### 3. Docker 支持
- ✅ 创建 Dockerfile（多阶段构建）
- ✅ 创建 docker-compose.yml
- ✅ 配置数据卷挂载实现数据持久化

---

## 🚀 如何使用

### 本地开发

启动开发服务器（前端 + 后端）：
```bash
npm run dev
```

访问：
- 前端：http://localhost:3000
- 后端 API：http://localhost:3001

数据存储在：`./data/filaments.json`

---

### Docker 部署

#### 1. 构建并启动服务
```bash
docker-compose up -d
```

#### 2. 查看日志
```bash
docker-compose logs -f
```

#### 3. 停止服务
```bash
docker-compose down
```

#### 4. 数据备份与恢复
```bash
# 备份
docker run --rm -v filament_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/filament-data-backup-$(date +%Y%m%d).tar.gz /data

# 恢复
docker run --rm -v filament_data:/data -v $(pwd):/backup alpine \
  tar xzf /backup/filament-data-backup-20250119.tar.gz -C /
```

---

## 📁 项目结构

```
filamenttracker/
├── server/                 # 后端代码
│   ├── index.ts           # 服务器入口
│   ├── routes.ts          # API 路由
│   └── storage.ts         # 文件存储逻辑
├── lib/
│   └── api.ts             # 前端 API 调用工具
├── pages/                 # 前端页面（已更新）
│   ├── DashboardPage.tsx  # ✅ 已连接 API
│   └── InventoryPage.tsx  # ✅ 已连接 API
├── data/                  # 数据存储目录
│   └── filaments.json     # JSON 数据文件
├── Dockerfile             # Docker 配置
├── docker-compose.yml     # Docker Compose 配置
└── README.DEPLOYMENT.md   # 详细部署文档
```

---

## 🔌 API 接口

### 获取所有耗材
```http
GET /api/filaments
```

### 获取单个耗材
```http
GET /api/filaments/:id
```

### 创建耗材
```http
POST /api/filaments
Content-Type: application/json

{
  "brand": "Prusament",
  "name": "PLA Orange",
  "material": "PLA",
  "colorName": "Orange",
  "colorHex": "#ff6600",
  "weightTotal": 1000,
  "weightRemaining": 850,
  "imageUrl": "https://..."
}
```

### 更新耗材
```http
PUT /api/filaments/:id
Content-Type: application/json

{
  "weightRemaining": 700
}
```

### 删除耗材
```http
DELETE /api/filaments/:id
```

---

## 🐳 Docker 部署说明

### Docker 数据卷

Docker Compose 创建了一个名为 `filament_data` 的数据卷来持久化数据：

```yaml
volumes:
  filament_data:
    driver: local
```

### 数据目录挂载

```yaml
volumes:
  - filament_data:/app/data
```

这样即使容器被删除，数据也会保留在 Docker 卷中。

### 端口映射

```yaml
ports:
  - "3000:3000"  # 前端
  - "3001:3001"  # 后端 API
```

---

## 🔧 环境变量

可通过环境变量配置：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 3001 | 后端 API 端口 |
| `DATA_DIR` | ./data | 数据存储目录 |
| `NODE_ENV` | development | 运行环境 |

---

## 📊 数据格式

`data/filaments.json` 文件格式：

```json
{
  "filaments": [
    {
      "id": "1737271487123",
      "brand": "Prusament",
      "name": "PLA Orange",
      "material": "PLA",
      "colorName": "Orange",
      "colorHex": "#ff6600",
      "weightTotal": 1000,
      "weightRemaining": 850,
      "imageUrl": "https://...",
      "status": "Adequate"
    }
  ],
  "lastUpdated": "2025-01-19T11:04:46.150Z"
}
```

---

## 🎯 下一步可以做的改进

1. **添加用户认证**
   - JWT token 验证
   - 用户注册/登录

2. **数据验证**
   - 使用 Zod 或 Joi 验证 API 输入
   - 前端表单验证

3. **搜索和过滤**
   - 实现搜索 API
   - 按品牌、材料筛选

4. **数据导入/导出**
   - JSON 导出
   - CSV 导入/导出

5. **升级到数据库**
   - SQLite（本地文件数据库）
   - PostgreSQL（生产环境）

---

## ❓ 常见问题

**Q: 如何在服务器上部署？**
A: 使用 `docker-compose up -d` 启动服务即可，确保服务器已安装 Docker 和 Docker Compose。

**Q: 数据会丢失吗？**
A: 不会，数据存储在 Docker 卷 `filament_data` 中，即使容器删除也不会丢失。

**Q: 如何迁移到另一台服务器？**
A: 备份数据卷，在新服务器上恢复即可。

**Q: 可以使用 SQLite 吗？**
A: 可以，只需修改 `storage.ts` 使用 `better-sqlite3` 包即可。

---

## 📝 技术栈

- **前端:** React 19 + Vite 6 + TypeScript
- **后端:** Node.js + Express 5
- **存储:** JSON 文件
- **容器化:** Docker + Docker Compose
- **开发工具:** tsx (TypeScript executor)

---

## 🎉 完成！

现在你可以：
1. 本地开发：`npm run dev`
2. Docker 部署：`docker-compose up -d`
3. 访问应用：http://localhost:3000

所有数据都会持久化到本地文件或 Docker 卷中！
