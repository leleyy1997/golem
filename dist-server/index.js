import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API 路由
app.use('/api', routes);
// 生产环境服务静态文件
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../dist');
    app.use(express.static(distPath));
    // 处理 SPA 路由
    app.get('*', (req, res) => {
        // 如果请求的是 API，不要返回 HTML
        if (req.path.startsWith('/api')) {
            return res.status(404).json({ success: false, error: 'Not Found' });
        }
        res.sendFile(path.join(distPath, 'index.html'));
    });
}
// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Data directory: ${process.env.DATA_DIR || './data'}`);
});
