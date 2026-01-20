# 登录功能使用说明

## 功能概述

已为 Golem 应用实现完整的登录认证功能：

- ✅ 密码登录（用户名固定为 golem）
- ✅ 登录状态持久化（刷新页面不掉登录态）
- ✅ 路由保护（未登录自动跳转登录页）
- ✅ 退出登录（左下角退出按钮）
- ✅ 环境变量支持（生产环境密码配置）

## 开发环境使用

### 启动应用
```bash
npm run dev
```

### 登录信息
- **用户名**: golem（固定，不可修改）
- **密码**: golem（默认密码）
- **登录页面**: http://localhost:3000/#/login

### 测试流程
1. 访问任意页面会自动跳转到登录页
2. 输入密码 `golem` 登录
3. 登录成功后跳转到首页
4. 刷新页面，登录状态保持
5. 点击左下角"退出登录"按钮可退出

## 生产环境部署

### 方式一：使用环境变量
```bash
# 设置自定义密码
export APP_PASSWORD=your_secure_password

# 启动 Docker
docker-compose up -d
```

### 方式二：使用 .env 文件
```bash
# 创建 .env 文件
echo "APP_PASSWORD=your_secure_password" > .env

# 启动 Docker
docker-compose up -d
```

### 方式三：命令行传递
```bash
APP_PASSWORD=your_secure_password docker-compose up -d
```

## 技术实现细节

### 后端 (server/routes.ts)
- 添加了 `/api/login` 登录接口
- 实现了 `authMiddleware` 认证中间件
- 所有 API 路由都受认证保护
- 密码通过 `APP_PASSWORD` 环境变量配置，默认为 `golem`

### 前端
- **LoginPage.tsx**: 登录页面组件
- **lib/api.ts**: 添加了 `login()`, `logout()`, `isAuthenticated()` 函数
- **App.tsx**: 实现了 `ProtectedRoute` 路由保护组件
- **Sidebar.tsx**: 退出登录功能

### 认证流程
1. 用户输入密码
2. 调用 `/api/login` 接口验证
3. 验证成功后，将 token（密码）存储到 localStorage
4. 后续所有 API 请求在 Header 中携带 `Authorization: Bearer {token}`
5. 后端验证 token 是否与配置的密码一致

## 安全建议

### 生产环境
1. **必须修改默认密码**: 不要使用默认的 `golem` 密码
2. **使用强密码**: 建议使用至少 16 位的随机字符串
3. **HTTPS**: 生产环境必须使用 HTTPS 加密传输
4. **定期更换密码**: 建议定期更换密码

### 生成强密码示例
```bash
# Linux/Mac
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 多语言支持

退出登录按钮支持以下语言：
- 🇬🇧 英文: "Log Out"
- 🇨🇳 中文: "退出登录"
- 🇪🇸 西班牙语: "Cerrar sesión"
- 🇩🇪 德语: "Abmelden"

## 故障排查

### 问题：刷新页面后掉登录态
**原因**: localStorage 被清除或浏览器隐私模式
**解决**: 检查浏览器设置，确保允许 localStorage

### 问题：登录后 API 返回 401
**原因**: token 未正确传递或密码不匹配
**解决**:
1. 检查浏览器控制台 Network 标签，确认请求头包含 `Authorization`
2. 检查后端环境变量 `APP_PASSWORD` 是否正确设置

### 问题：Docker 环境密码不生效
**原因**: 环境变量未正确传递到容器
**解决**:
```bash
# 检查容器环境变量
docker exec golem env | grep APP_PASSWORD

# 重新启动容器
docker-compose down
APP_PASSWORD=your_password docker-compose up -d
```

## 文件修改清单

### 新增文件
- `pages/LoginPage.tsx` - 登录页面

### 修改文件
- `server/routes.ts` - 添加登录接口和认证中间件
- `lib/api.ts` - 添加认证相关函数和请求头
- `App.tsx` - 添加路由保护
- `components/Sidebar.tsx` - 添加退出登录功能
- `docker-compose.yml` - 添加环境变量配置

## 后续优化建议

如需更高级的安全功能，可以考虑：
1. 使用 JWT token 替代密码作为 token
2. 添加 token 过期时间
3. 实现刷新 token 机制
4. 添加登录失败次数限制
5. 记录登录日志
6. 支持多用户系统
