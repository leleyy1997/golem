# 多阶段构建 - 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建前端
RUN npm run build

# 构建后端
RUN npx tsc -p tsconfig.server.json

# 生产阶段
FROM node:20-alpine

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 仅安装生产依赖
RUN npm ci --only=production

# 从构建阶段复制构建好的前端文件
COPY --from=builder /app/dist ./dist

# 从构建阶段复制构建好的后端文件
COPY --from=builder /app/dist-server ./dist-server

# 创建数据目录
RUN mkdir -p /app/data

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3001
ENV DATA_DIR=/app/data

# 暴露端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 启动服务
CMD ["node", "dist-server/server/index.js"]