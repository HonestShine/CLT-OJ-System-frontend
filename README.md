# OJ系统前端项目

## 项目介绍
这是一个基于Vue3开发的在线判题系统（OJ）前端项目，实现了用户认证、题目浏览、代码提交、排行榜等功能。

## 技术栈
- Vue 3
- Vue Router
- Pinia (状态管理)
- Axios (HTTP请求)
- Vite (构建工具)

## 功能特性
- 用户登录/注册/忘记密码
- 题目列表浏览（支持搜索和分页）
- 题目详情查看
- 代码提交和评测
- 提交记录查看
- 用户排行榜
- 个人主页（支持编辑个人信息和上传头像）

## 项目结构
```
front_end/
├── src/
│   ├── api/           # API接口封装
│   ├── components/    # 公共组件
│   ├── router/        # 路由配置
│   ├── store/         # 状态管理
│   ├── utils/         # 工具函数
│   ├── views/         # 页面组件
│   ├── App.vue        # 根组件
│   ├── main.js        # 入口文件
│   └── style.css      # 全局样式
├── index.html         # HTML模板
├── package.json       # 项目依赖
└── vite.config.js     # Vite配置
```

## 安装和运行

### 1. 安装依赖
```bash
cd front_end
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

项目将在 http://localhost:3000 启动

### 3. 构建生产版本
```bash
npm run build
```

## API配置
项目默认配置后端API地址为 `http://localhost:8080`，如需修改请编辑 `vite.config.js` 文件中的proxy配置。

## 页面说明

### 主页 (/)
- 显示用户统计信息（解题数、提交数、通过率）
- 题目列表（支持搜索和分页）
- 排行榜（前20名）

### 登录页 (/login)
- 用户名和密码登录
- 表单验证

### 注册页 (/register)
- 新用户注册
- 密码确认验证

### 忘记密码 (/forgot-password)
- 通过旧密码修改新密码

### 题目详情 (/problem/:id)
- 查看题目详细信息
- 提交代码（需要登录）
- 查看提交记录（需要登录）

### 个人主页 (/profile 或 /profile/:id)
- 查看用户信息
- 编辑个人信息（自己的主页）
- 上传头像（自己的主页）
- 删除账户（自己的主页）

### 排行榜 (/rank)
- 查看所有用户排名
- 点击用户可查看个人主页

## 注意事项
1. 确保后端服务已启动并运行在 http://localhost:8080
2. 首次运行需要安装依赖
3. 所有需要认证的接口都会自动在请求头中携带token
4. token失效后会自动跳转到登录页面
