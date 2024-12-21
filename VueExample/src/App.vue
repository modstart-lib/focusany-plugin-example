<script setup lang="ts">
import {ref} from 'vue'

const count = ref(0)
window.focusany && focusany.onPluginReady((data) => {
    conosle.log('onPluginReady', data)
})
</script>

<template>
    <div class="flex border-t border-solid border-gray-300" style="height:100vh;">
        <div class="m-auto text-center">
            <div class="text-2xl">
                FocusAny Plugin Example
            </div>
            <div class="text-lg pt-10">
                Vue3 + Vite + TypeScript + TailwindCSS + Arco
            </div>
            <div class="pt-10">
                <a-button @click="count++">
                    ArcoButton
                    (count:{{ count }})
                </a-button>
            </div>
        </div>
    </div>
</template>
