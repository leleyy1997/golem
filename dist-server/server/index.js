import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';
import { initialize } from './storage-new.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// API 路由
app.use('/api', routes);
// 生产环境服务静态文件
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../dist');
    // 静态文件服务
    app.use(express.static(distPath));
    // 处理 SPA 路由 - 捕获所有非静态文件的请求
    app.use((req, res, next) => {
        // 如果请求的是 API，跳过
        if (req.path.startsWith('/api')) {
            return next();
        }
        // 发送 index.html
        res.sendFile(path.join(distPath, 'index.html'));
    });
}
// 启动服务器
async function startServer() {
    try {
        // 初始化存储
        await initialize();
        console.log('✅ Storage initialized');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`📁 Data directory: ${process.env.DATA_DIR || './data'}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
