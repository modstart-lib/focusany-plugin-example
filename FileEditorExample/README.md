# FileEditorExample - 文件编辑器示例

## 📖 概述

这是一个基于 Vue 3 + Vite + TailwindCSS 开发的文件编辑器插件示例，展示了如何在 FocusAny 插件中集成轻量级文件编辑功能。支持文件的新建、打开、保存等基本操作。

## 🏗️ 项目结构

```
FileEditorExample/
├── src/
│   ├── App.vue                 # 主应用组件
│   ├── main.ts                 # 应用入口
│   ├── style.less              # 样式文件
│   ├── vite-env.d.ts           # Vite 类型定义
│   ├── components/
│   │   └── ToolBar.vue         # 工具栏组件
│   └── lib/
│       ├── dialog.ts           # 对话框工具
│       ├── file.ts             # 文件操作逻辑
│       ├── frame.ts            # iframe 通信工具
│       └── history.ts          # 文件历史记录
├── public/
│   ├── config.json             # 插件配置
│   ├── logo.svg                # 插件图标
│   ├── preload.cjs             # 预加载脚本
│   └── editor/
│       └── index.html          # 编辑器页面
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
- **UI 组件**: Arco Design Vue
- **语言**: TypeScript
- **状态管理**: Vue 3 响应式系统

## 🚀 功能特性

### 文件操作
- ✅ 新建文件
- ✅ 打开现有文件
- ✅ 保存文件
- ✅ 文件历史记录
- ✅ 自动保存提示

### 编辑器功能
- ✅ 语法高亮
- ✅ 代码折叠
- ✅ 行号显示
- ✅ 查找替换
- ✅ 多光标编辑

### 用户界面
- ✅ 现代化 UI 设计
- ✅ 响应式布局
- ✅ 快捷键支持
- ✅ 工具栏操作

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

## 📚 核心模块说明

### 文件操作 (file.ts)
处理文件的新建、打开、保存等操作：

```typescript
const {
    filePath,
    doOpen,
    doOpenNew,
    doOpenFile,
    doSave,
    fileInit,
} = useFile({
    EDITOR_DEFAULT_FILE_NAME,
    EDITOR_FILE_TYPE,
    EDITOR_FILE_CONTENT,
    callIframe,
})
```

### iframe 通信 (frame.ts)
管理编辑器 iframe 的加载和通信：

```typescript
const {
    iframe,
    onIframeLoad,
    callIframe,
} = useFrame()
```

### 历史记录 (history.ts)
管理最近打开的文件历史：

```typescript
const {
    fileHistories,
    historyInit,
} = useHistory({
    filePath
})
```

## 🎯 开发指南

### 1. 插件配置
编辑 `public/config.json` 配置插件的基本信息和触发规则。

### 2. 自定义编辑器
修改 `public/editor/index.html` 来自定义编辑器界面和功能。

### 3. 添加新功能
在 `src/lib/` 目录下添加新的工具模块。

### 4. 样式定制
使用 TailwindCSS 类或修改 `src/style.less` 自定义样式。

## 🔗 插件集成

### 触发方式
- 通过快捷键触发
- 通过文件右键菜单触发
- 通过搜索 "editor" 触发

### 热键支持
- `Ctrl+S` / `Cmd+S`: 保存文件
- 其他编辑器原生快捷键

## 📖 学习要点

1. **Vue 3 Composition API**: 学习现代 Vue 开发模式
2. **Vite 构建**: 了解快速构建工具的使用
3. **TypeScript**: 类型安全开发实践
4. **iframe 通信**: 前端组件间通信机制
5. **文件系统 API**: FocusAny 文件操作接口
6. **状态管理**: Vue 3 响应式数据管理

## 📚 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 构建工具](https://vitejs.dev/)
- [TailwindCSS 样式框架](https://tailwindcss.com/)
- [Arco Design Vue 组件库](https://arco.design/vue/)
- [FocusAny 插件开发文档](https://focusany.com/doc)
