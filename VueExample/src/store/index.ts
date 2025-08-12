// 导出所有状态管理模块
export { recordsStore } from './recordsStore'

// Store 相关的类型定义
export type { Record } from './recordsStore'

// 创建一个组合的根store（如果需要的话）
import { recordsStore } from './recordsStore'

export const rootStore = {
  records: recordsStore,

  // 初始化所有store
  async initialize() {
    await recordsStore.actions.initialize()
  },

  // 重置所有store
  async reset() {
    await recordsStore.actions.clearRecords()
  }
}
