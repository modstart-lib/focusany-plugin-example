<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import {Message} from '@arco-design/web-vue';
import {onMounted} from 'vue'
import {useFrame} from "./lib/frame.ts";
import {useFile} from "./lib/file.ts";
import {useHistory} from "./lib/history.ts";

const EDITOR_IFRAME_URL = './editor/index.html'
const EDITOR_DEFAULT_FILE_NAME = 'NewFile.example.fad'
const EDITOR_FILE_TYPE = 'FileEditorExample'
const EDITOR_FILE_CONTENT = '默认内容'

const {
    iframe,
    onIframeLoad,
    callIframe,
} = useFrame()
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
const {
    fileHistories,
    historyInit,
} = useHistory({
    filePath
})
onMounted(async () => {
    await fileInit()
    await historyInit()
})
focusany.onPluginReady((data) => {
    if (data.actionMatch?.name === 'editor') {
        if (data.actionMatchFiles && data.actionMatchFiles.length > 0) {
            doOpenFile(data.actionMatchFiles[0].path).then()
        }
    }
})
focusany.registerHotkey('save', () => {
    doSave()
})

const doExport = async (type: string) => {
    if (!['png', 'svg'].includes(type)) {
        Message.warning(`不支持导出${type}格式`)
        return;
    }
    const defaultMap = {
        'png': 'image.png',
        'svg': 'image.svg',
    }
    if ('png' === type) {
        const data = await callIframe('editorGetImage')
        focusany.util.save(defaultMap[type], data as any, {isBase64: true})
        Message.success('导出PNG成功')
        return;
    }
    if ('svg' === type) {
        const data = await callIframe('editorGetSvg')
        focusany.util.save(defaultMap[type], data as any, {isBase64: false})
        Message.success('导出SVG成功')
        return;
    }
}
</script>

<template>
    <div class="flex border-t border-solid border-gray-300" style="height:100vh;">
        <div class="border-r border-solid border-gray-300 w-12 flex-shrink-0">
            <ToolBar
                :file-path="filePath"
                :file-histories="fileHistories"
                @open="doOpen"
                @openNew="doOpenNew"
                @save="doSave"
                @saveAs="doSave(true)"
                @open-file="doOpenFile"
                @export="doExport"
            />
        </div>
        <div class="flex-grow">
            <iframe
                ref="iframe"
                @load="onIframeLoad"
                style="width:100%;height:100%;border:none;"
                :src="EDITOR_IFRAME_URL"></iframe>
        </div>
    </div>
</template>
