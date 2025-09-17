# WebRemoteExample - 离线网页缓存插件示例

## 📖 概述

这是一个将远程网页快速转换为本地离线缓存的 FocusAny 插件示例。展示了如何在插件中集成网页缓存、脚本注入、样式注入等功能，实现网页的离线浏览体验。

## 🏗️ 项目结构

```
WebRemoteExample/
├── src/
│   ├── App.vue                 # 主应用组件
│   ├── main.ts                 # 应用入口
│   ├── style.less              # 全局样式
│   ├── vite-env.d.ts           # Vite 类型定义
│   └── lib/
│       └── dialog.ts           # 对话框工具
├── public/
│   ├── config.json             # 插件配置
│   ├── logo.svg                # 插件图标
│   ├── preload.cjs             # 预加载脚本
│   ├── inject.css              # 注入样式
│   ├── inject.js               # 注入脚本
│   └── RemoteWebCache/
│       ├── page.html           # 缓存的网页
│       └── page.html.meta.json # 网页元数据
├── package.json                # 项目依赖
├── vite.config.ts              # Vite 配置
├── tailwind.config.js          # Tailwind 配置
├── postcss.config.js           # PostCSS 配置
├── tsconfig.json               # TypeScript 配置
└── Makefile                    # 构建脚本
```

## ⚙️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式框架**: TailwindCSS
- **语言**: TypeScript
- **网页缓存**: FocusAny Remote Web Cache API

## 🚀 功能特性

### 网页缓存
- ✅ 远程网页本地缓存
- ✅ 离线浏览支持
- ✅ 缓存文件管理
- ✅ 自动缓存更新

### 内容注入
- ✅ JavaScript 脚本注入
- ✅ CSS 样式注入
- ✅ 动态内容修改
- ✅ 用户代理设置

### 调试功能
- ✅ 开发者工具集成
- ✅ 调试菜单支持
- ✅ 实时日志输出
- ✅ 错误处理

### 用户体验
- ✅ 现代化界面设计
- ✅ 响应式布局
- ✅ 加载状态指示
- ✅ 错误提示

## 🔧 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 预览构建结果
```bash
npm run preview
```

## 📚 核心功能说明

### 网页缓存配置
```typescript
focusany.setRemoteWebRuntime({
    userAgent: '访问使用的浏览器标识',
    urlMap: {
        'https://example.com/': 'page.html'
    }
})
```

### DOM 就绪事件处理
```typescript
web.value.addEventListener('dom-ready', () => {
    // 注入脚本和样式
    if (webScript.value) {
        fetch(webScript.value)
            .then(response => response.text())
            .then(script => {
                web.value.executeJavaScript(script);
            });
    }
});
```

### 调试菜单集成
```typescript
focusany.onMoreMenuClick(data => {
    switch (data.name) {
        case 'debug':
            web.value.openDevTools({
                mode: 'detach',
                activate: true
            });
            break;
    }
});
```

## 🎯 开发指南

### 1. 配置缓存规则
编辑 `public/config.json` 中的 `remoteWebCacheEnable` 设置。

### 2. 自定义注入内容
修改 `public/inject.js` 和 `public/inject.css` 来自定义注入的脚本和样式。

### 3. 添加缓存页面
在 `public/RemoteWebCache/` 目录下添加新的缓存页面文件。

### 4. 扩展调试功能
在 `focusany.onMoreMenuClick` 中添加新的调试菜单项。

## 🔗 插件配置

### 基本配置
```json
{
    "remoteWebCacheEnable": true,
    "width": "90%",
    "height": "90%",
    "autoDetach": true,
    "moreMenu": [
        {
            "name": "debug",
            "title": "Debug网页"
        }
    ]
}
```

### 缓存设置
- **remoteWebCacheEnable**: 启用远程网页缓存
- **autoDetach**: 自动分离窗口
- **moreMenu**: 扩展菜单项

## 📖 学习要点

1. **网页缓存机制**: 了解远程网页本地化存储
2. **内容注入技术**: 掌握脚本和样式动态注入
3. **DOM 事件处理**: 学习网页加载生命周期
4. **调试工具集成**: 开发者工具在插件中的应用
5. **用户代理设置**: 自定义浏览器标识
6. **离线浏览**: 本地缓存网页的实现

## 🔧 高级功能

### 自定义用户代理
```typescript
userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...'
```

### URL 映射
```typescript
urlMap: {
    'https://original-site.com/': 'cached-page.html'
}
```

### 脚本执行
```typescript
web.value.executeJavaScript(`
    // 自定义 JavaScript 代码
    console.log('页面已加载');
`);
```

### 样式注入
```typescript
web.value.insertCSS(`
    /* 自定义 CSS 样式 */
    body { background-color: #f0f0f0; }
`);
```

## 📚 相关资源

- [FocusAny Remote Web API](https://focusany.com/doc/remote-web)
- [Electron Webview 文档](https://electronjs.org/docs/api/webview)
- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 构建工具](https://vitejs.dev/)
- [TailwindCSS 样式框架](https://tailwindcss.com/)
