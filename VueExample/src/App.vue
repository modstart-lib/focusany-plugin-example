<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DemoComponent from './components/DemoComponent.vue'
import StoreComponent from './components/StoreComponent.vue'
import { recordsStore } from './store/recordsStore'

const count = ref(0)

// 组件挂载时初始化
onMounted(async () => {
    // 初始化records store
    await recordsStore.actions.initialize()

    // 如果没有数据，创建示例数据
    if (recordsStore.state.records.length === 0) {
        await recordsStore.actions.createSampleRecords()
    }
})

focusany.onPluginReady((data) => {
    console.log('onPluginReady', data)
})
</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <!-- 头部导航 -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <h1 class="text-xl font-semibold text-gray-900">FocusAny Plugin Example</h1>
                        <span class="ml-2 text-sm text-gray-500">Vue3 + Vite + TypeScript + TailwindCSS + Arco</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a-button @click="count++">
                            计数器: {{ count }}
                        </a-button>
                    </div>
                </div>
            </div>
        </header>

        <!-- 主要内容区域 -->
        <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <!-- 左侧：Demo组件 -->
                <div>
                    <h2 class="text-lg font-medium text-gray-900 mb-4">组件示例</h2>
                    <DemoComponent />
                </div>

                <!-- 右侧：Store演示 -->
                <div>
                    <StoreComponent />
                </div>
            </div>
        </main>

    </div>
</template>
