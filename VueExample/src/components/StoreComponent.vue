<template>
  <div>
    <h2 class="text-lg font-medium text-gray-900 mb-4">Store 演示</h2>

    <!-- Store 统计信息 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h3 class="text-md font-medium text-gray-700 mb-4">Records 统计</h3>
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold text-blue-600">{{ recordsStore.getters.recordCount.value }}</div>
          <div class="text-gray-600">记录数量</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-green-600">{{ recordsStore.getters.totalValue.value }}</div>
          <div class="text-gray-600">总值</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-orange-600">{{ recordsStore.getters.averageValue.value.toFixed(1) }}</div>
          <div class="text-gray-600">平均值</div>
        </div>
      </div>
    </div>

    <!-- 添加记录表单 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h3 class="text-md font-medium text-gray-700 mb-4">添加记录</h3>
      <div class="space-y-4">
        <a-input v-model="newRecordName" placeholder="记录名称" />
        <a-input-number v-model="newRecordValue" placeholder="数值" style="width: 100%" />
        <div class="flex space-x-2">
          <a-button type="primary" @click="addRecord">
            添加记录
          </a-button>
          <a-button @click="createSampleData">
            创建示例数据
          </a-button>
          <a-button status="danger" @click="clearAllRecords">
            清空所有
          </a-button>
        </div>
      </div>
    </div>

    <!-- 记录列表 -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-md font-medium text-gray-700 mb-4">记录列表</h3>

      <div v-if="recordsStore.state.loading" class="text-center py-4">
        <a-spin />
        <div class="mt-2 text-gray-500">加载中...</div>
      </div>

      <div v-else-if="recordsStore.state.error" class="text-center py-4 text-red-500">
        错误: {{ recordsStore.state.error }}
      </div>

      <div v-else-if="recordsStore.state.records.length === 0" class="text-center py-8 text-gray-500">
        <div class="text-4xl mb-2">📝</div>
        <p>暂无记录</p>
      </div>

      <div v-else class="space-y-3">
        <div v-for="record in recordsStore.state.records" :key="record.id"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div>
            <h4 class="font-medium text-gray-900">{{ record.name }}</h4>
            <p class="text-sm text-gray-500">
              值: {{ record.value }} | 创建时间: {{ new Date(record.createdAt).toLocaleString() }}
            </p>
          </div>
          <a-button size="small" status="danger" @click="deleteRecord(record.id)">
            删除
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { recordsStore } from '../store/recordsStore'

const newRecordName = ref('')
const newRecordValue = ref(0)

// 添加记录
const addRecord = async () => {
  if (newRecordName.value.trim()) {
    await recordsStore.actions.addRecord(newRecordName.value, newRecordValue.value)
    newRecordName.value = ''
    newRecordValue.value = 0
  }
}

// 删除记录
const deleteRecord = async (id: string) => {
  await recordsStore.actions.deleteRecord(id)
}

// 清空所有记录
const clearAllRecords = async () => {
  await recordsStore.actions.clearRecords()
}

// 创建示例数据
const createSampleData = async () => {
  await recordsStore.actions.createSampleRecords()
}
</script>
