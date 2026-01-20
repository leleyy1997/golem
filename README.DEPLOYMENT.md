# golem - 数据持久化说明

## 本地开发

### 启动开发服务器
```bash
npm run dev
```
这会同时启动：
- 前端开发服务器：http://localhost:3000
- 后端 API 服务器：http://localhost:3001

### 数据存储位置
- 开发环境：`./data/filaments.json`
- 生产环境 (Docker)：Docker volume `filament_data`

## Docker 部署

### 构建并启动
```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

### 停止服务
```bash
docker-compose down
```

### 数据备份
```bash
# 备份数据卷
docker run --rm -v filament_data:/data -v $(pwd):/backup alpine tar czf /backup/filament-data-backup.tar.gz /data

# 恢复数据
docker run --rm -v filament_data:/data -v $(pwd):/backup alpine tar xzf /backup/filament-data-backup.tar.gz -C /
```

## API 接口

### 获取所有耗材
```
GET /api/filaments
```

### 获取单个耗材
```
GET /api/filaments/:id
```

### 创建耗材
```
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
  "imageUrl": "..."
}
```

### 更新耗材
```
PUT /api/filaments/:id
Content-Type: application/json

{
  "weightRemaining": 700
}
```

### 删除耗材
```
DELETE /api/filaments/:id
```

## 环境变量

- `PORT`: API 服务端口 (默认: 3001)
- `DATA_DIR`: 数据存储目录 (默认: ./data)
- `NODE_ENV`: 运行环境 (development/production)

## 数据结构

```json
{
  "filaments": [
    {
      "id": "1234567890",
      "brand": "Prusament",
      "name": "PLA Orange",
      "material": "PLA",
      "colorName": "Orange",
      "colorHex": "#ff6600",
      "weightTotal": 1000,
      "weightRemaining": 850,
      "imageUrl": "...",
      "status": "Adequate"
    }
  ],
  "lastUpdated": "2025-01-19T10:30:00.000Z"
}
```
