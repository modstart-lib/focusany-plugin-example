<template>
    <div class="demo-component bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Demo Component</h2>

        <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-4">{{ count }}</div>

            <div class="space-x-2">
                <a-button type="primary" @click="increment">
                    增加
                </a-button>
                <a-button @click="decrement">
                    减少
                </a-button>
                <a-button status="danger" @click="reset">
                    重置
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
    count.value++
}

const decrement = () => {
    count.value--
}

const reset = () => {
    count.value = 0
}
</script>

<style scoped>
.demo-component {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.demo-component:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>
