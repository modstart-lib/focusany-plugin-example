# 组件和状态管理使用示例

本项目包含了两个简单的示例组件和一个状态管理模块，展示了如何在 Vue 3 + FocusAny 插件中使用基础的组件开发和状态管理。

## 组件示例

### 1. DemoComponent 组件

简单的计数器组件，展示基本的 Vue 3 组件开发。

**功能特性：**
- 数字显示和三个操作按钮
- 增加、减少、重置操作
- 简洁的卡片式UI设计
- 悬停动画效果

**使用方法：**
```vue
<template>
  <DemoComponent />
</template>

<script setup>
import DemoComponent from './components/DemoComponent.vue'
</script>
```

### 2. StoreComponent 组件

Store 演示组件，展示状态管理的各种操作。

**功能特性：**
- 统计信息实时显示
- 记录的增删操作界面
- 加载状态和错误处理
- 数据列表展示

**使用方法：**
```vue
<template>
  <StoreComponent />
</template>

<script setup>
import StoreComponent from './components/StoreComponent.vue'
</script>
```

## 状态管理示例

### recordsStore - 记录状态管理

管理简单记录数据的状态和操作。

**功能特性：**
- 记录的增删改查操作
- 统计计算（总数、总值、平均值）
- 数据持久化（使用 FocusAny dbStorage）
- 加载状态和错误处理
- 示例数据创建

**数据结构：**
```typescript
interface Record {
  id: string
  name: string
  value: number
  createdAt: string
}
```

**使用方法：**
```javascript
import { recordsStore } from './store/recordsStore'

// 初始化数据
await recordsStore.actions.initialize()

// 添加记录
await recordsStore.actions.addRecord('记录名称', 100)

// 获取统计信息
const recordCount = recordsStore.getters.recordCount.value
const totalValue = recordsStore.getters.totalValue.value
const averageValue = recordsStore.getters.averageValue.value

// 删除记录
await recordsStore.actions.deleteRecord('recordId')

// 清空所有记录
await recordsStore.actions.clearRecords()
```

## App.vue 演示

主应用组件展示了如何同时使用多个组件：

**布局结构：**
1. **左侧** - DemoComponent 组件展示
2. **右侧** - StoreComponent 组件展示

**组件职责分离：**
- `App.vue` 负责整体布局和初始化
- `DemoComponent` 专注于简单的计数器功能
- `StoreComponent` 专注于状态管理演示

## FocusAny SDK 集成

### 数据存储
```javascript
// 存储数据
await focusany.dbStorage.setItem('records', data)

// 读取数据
const data = await focusany.dbStorage.getItem('records')
```

### 通知显示
```javascript
// 显示通知
focusany.showNotification('操作成功')
```

### 插件生命周期
```javascript
// 插件准备完成回调
focusany.onPluginReady((data) => {
  console.log('插件已准备就绪', data)
})
```

## 项目结构

```
src/
├── components/
│   ├── DemoComponent.vue     # 简单计数器组件
│   ├── StoreComponent.vue    # Store 演示组件
│   └── index.ts              # 组件导出文件
├── store/
│   ├── recordsStore.ts       # 记录状态管理
│   └── index.ts              # 状态管理导出文件
└── App.vue                   # 主应用组件（布局和初始化）
```

## 技术栈

- **Vue 3** - 响应式前端框架
- **TypeScript** - 类型安全
- **Arco Design Vue** - UI 组件库
- **TailwindCSS** - 样式框架
- **FocusAny SDK** - 插件开发工具包

## 最佳实践

1. **组件设计**：保持组件简单和专注，单一职责原则
2. **组件分离**：将复杂的功能拆分到独立的组件中
3. **状态管理**：使用 Composition API 创建响应式状态，支持计算属性和异步操作
4. **类型安全**：完整的 TypeScript 类型定义
5. **数据持久化**：使用 FocusAny SDK 的 dbStorage 进行数据存储
6. **错误处理**：在异步操作中包含适当的错误处理
7. **用户体验**：集成加载状态、错误提示和成功通知

这个示例展示了在 FocusAny 插件开发中构建模块化 Vue 3 应用的核心要素，通过组件分离实现了更好的代码组织和维护性。
