# VueExample - Vue 插件示例

## 📖 概述

这是一个基于 Vue 3 + Vite + TypeScript + TailwindCSS 开发的 FocusAny 插件示例，展示了现代前端技术栈在插件开发中的应用。包含组件化开发、状态管理、数据持久化等完整功能。

## 🏗️ 项目结构

```
VueExample/
├── src/
│   ├── App.vue                 # 主应用组件
│   ├── main.ts                 # 应用入口
│   ├── style.less              # 全局样式
│   ├── vite-env.d.ts           # Vite 类型定义
│   ├── components/
│   │   ├── DemoComponent.vue   # 演示组件
│   │   ├── StoreComponent.vue  # 状态管理组件
│   │   └── index.ts            # 组件导出
│   └── store/
│       ├── index.ts            # 状态管理入口
│       └── recordsStore.ts     # 记录数据存储
├── public/
│   ├── config.json             # 插件配置
│   ├── logo.svg                # 插件图标
│   └── preload.cjs             # 预加载脚本
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
- **状态管理**: Pinia (自定义实现)
- **语言**: TypeScript
- **样式预处理**: Less

## 🚀 功能特性

### 组件化开发
- ✅ Vue 3 Composition API
- ✅ TypeScript 类型支持
- ✅ 组件通信和状态传递
- ✅ 响应式数据绑定

### 状态管理
- ✅ 自定义状态管理 store
- ✅ 数据持久化
- ✅ 异步数据操作
- ✅ 状态同步

### 用户界面
- ✅ 现代化响应式设计
- ✅ TailwindCSS 样式系统
- ✅ Arco Design 组件库
- ✅ 优雅的动画效果

### 数据功能
- ✅ 示例数据自动生成
- ✅ 数据 CRUD 操作
- ✅ 本地存储集成
- ✅ 数据状态管理

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

### 主应用 (App.vue)
应用的主入口组件，包含：
- 页面布局和导航
- 组件初始化
- 插件就绪事件处理

### 状态管理 (store/)
自定义的状态管理实现：

#### recordsStore.ts
```typescript
// 数据记录的状态管理
export const recordsStore = {
    state: {
        records: [] as Record[],
        loading: false
    },
    actions: {
        async initialize() {
            // 初始化数据
        },
        async createSampleRecords() {
            // 创建示例数据
        }
    }
}
```

### 组件系统 (components/)
- **DemoComponent**: 基础功能演示组件
- **StoreComponent**: 状态管理演示组件

## 🎯 开发指南

### 1. 添加新组件
```bash
# 在 components/ 目录下创建新组件
touch src/components/NewComponent.vue
```

### 2. 扩展状态管理
```typescript
// 在 store/ 目录下添加新的 store
export const newStore = {
    state: { /* 状态 */ },
    actions: { /* 操作 */ }
}
```

### 3. 自定义样式
使用 TailwindCSS 类或修改 `src/style.less`。

### 4. 类型定义
在 TypeScript 文件中定义接口和类型。

## 🔗 插件集成

### 配置说明
编辑 `public/config.json` 配置：
- 插件基本信息
- 触发规则
- 权限设置

### 生命周期
```typescript
// 插件就绪事件
focusany.onPluginReady((data) => {
    console.log('Plugin ready:', data)
})
```

## 📖 学习要点

1. **Vue 3 Composition API**: 现代 Vue 开发模式
2. **TypeScript 集成**: 类型安全开发
3. **组件化架构**: 可复用组件设计
4. **状态管理模式**: 自定义 store 实现
5. **响应式设计**: TailwindCSS 样式系统
6. **构建优化**: Vite 开发体验
7. **插件开发**: FocusAny API 集成

## 📚 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 构建工具](https://vitejs.dev/)
- [TailwindCSS 样式框架](https://tailwindcss.com/)
- [Arco Design Vue 组件库](https://arco.design/vue/)
- [TypeScript 语言](https://typescriptlang.org/)
- [FocusAny 插件开发文档](https://focusany.com/doc)
