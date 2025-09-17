<script setup lang="ts">
const props = defineProps({
    filePath: String,
    fileHistories: Array,
    exportTypes: {
        type: Array,
        default: () => ['png', 'svg'],
    },
});
const emit = defineEmits([
    'open',
    'openNew',
    'save',
    'saveAs',
    'openFile',
    'export',
]);
</script>

<template>
    <div class="py-2 w-12 text-center">
        <a-popover position="right">
            <a-button class="mb-2" type="text"
                      @click="emit('open')">
                <template #icon>
                    <icon-folder/>
                </template>
            </a-button>
            <template #content>
                <div class="min-w-20 -m-2">
                    <a-button class="w-full mb-2 text-left" type="text" size="small"
                              @click="emit('open')">
                        打开
                    </a-button>
                    <a-button class="w-full mb-1 text-left" type="text" size="small"
                              @click="emit('openNew')"
                    >
                        新建
                    </a-button>
                </div>
            </template>
        </a-popover>
        <a-popover position="right">
            <a-button class="mb-2" type="text" @click="emit('save')">
                <template #icon>
                    <icon-save/>
                </template>
            </a-button>
            <template #content>
                <div class="min-w-20 -m-2">
                    <a-button class="w-full mb-2 text-left" type="text" size="small"
                              @click="emit('save')">
                        保存
                    </a-button>
                    <a-button class="w-full mb-1 text-left" type="text" size="small"
                              @click="emit('saveAs')">
                        另存为
                    </a-button>
                </div>
            </template>
        </a-popover>
        <a-popover position="right">
            <a-button class="mb-2" type="text" @click="emit('export','png')">
                <template #icon>
                    <icon-download/>
                </template>
            </a-button>
            <template #content>
                <div class="min-w-20 -m-2">
                    <slot name="export">
                        <a-button class="w-full mb-2 text-left" type="text" size="small"
                                  v-if="exportTypes.includes('png')"
                                  @click="emit('export','png')">
                            导出为PNG
                        </a-button>
                        <a-button class="w-full mb-1 text-left" type="text" size="small"
                                  v-if="exportTypes.includes('svg')"
                                  @click="emit('export','svg')">
                            导出为SVG
                        </a-button>
                    </slot>
                </div>
            </template>
        </a-popover>
        <a-popover position="right">
            <a-button class="mb-2" type="text">
                <template #icon>
                    <icon-history/>
                </template>
            </a-button>
            <template #content>
                <div class="-m-2">
                    <div>最近打开的文件</div>
                    <div v-if="!props.fileHistories?.length" class="text-gray-300">暂无历史文件</div>
                    <div v-else>
                        <div v-for="history in props.fileHistories"
                             class="cursor-pointer hover:bg-gray-100 p-1"
                             @click="emit('openFile', history)">
                            <icon-file/>
                            {{ history }}
                        </div>
                    </div>
                </div>
            </template>
        </a-popover>
        <a-popover position="right">
            <a-button class="mb-2" type="text">
                <template #icon>
                    <icon-info-circle
                        :style="{color: props.filePath ? 'inherit' : 'red'}"/>
                </template>
            </a-button>
            <template #content>
                <div class="-m-2 leading-8">
                    <div>
                        <icon-info-circle/>
                        文件信息
                    </div>
                    <div v-if="props.filePath">路径：{{ props.filePath }}</div>
                    <div v-else class="text-red-500">文件未保存，请点击保存</div>
                </div>
            </template>
        </a-popover>
    </div>
</template>

<style lang="less" scoped>
.arco-btn.arco-btn-text {
    color: #333;
    text-align: left;
}
</style>
