<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import {Message} from '@arco-design/web-vue';
import {onMounted, ref, toRaw, watch} from 'vue'
import {debounce} from "lodash-es";

// 不同的编辑器需要不同的实现开始
const editorIframeUrl = './editor/index.html'
const editorDefaultFileName = 'NewFile.example.fadata'
const editorFileType = 'FileEditorExample'
const editorReadFile = async (file: string) => {
    // @ts-ignore
    const buffer = await window.focusanyApi.read(file)
    const data = buffer.toString('utf-8')
    const dataJson = JSON.parse(data)
    if (dataJson['type'] !== editorFileType) {
        throw '不支持的文件类型'
    }
    return dataJson['data']['content']
}
const editorWriteFile = async (file: string, content: any) => {
    const data = {
        type: editorFileType,
        data: {
            content
        }
    }
    // @ts-ignore
    await window.focusanyApi.write(file, JSON.stringify(data))
}
// 不同的编辑器需要不同的实现结束

const filePath = ref('')
const fileHistories = ref<string[]>([])

const iframe = ref<HTMLIFrameElement | null>(null);
const iframeReady = ref(false)

const addHistory = (file: string) => {
    fileHistories.value = fileHistories.value.filter(f => f !== file)
    fileHistories.value.unshift(file)
    if (fileHistories.value.length > 10) {
        fileHistories.value = fileHistories.value.slice(0, 10)
    }
    focusany.dbStorage.setItem('history', toRaw(fileHistories.value))
}

watch(filePath, (file) => {
    if (file) {
        addHistory(file)
    }
})

const onIframeLoad = () => {
    iframeReady.value = true
}
const callIframe = (method: string, ...args: any[]) => {
    return new Promise((resolve, reject) => {
        const callIt = () => {
            if (!iframeReady.value) {
                setTimeout(callIt, 100)
                return
            }
            // @ts-ignore
            iframe.value?.contentWindow[method](resolve, reject, ...args)
        }
        callIt()
    })
}

const saveDebounce = debounce(async (content) => {
    if (filePath.value) {
        await editorWriteFile(filePath.value, content)
    }
}, 1000)

const doOpen = async () => {
    const paths = focusany.showOpenDialog({
        defaultPath: editorDefaultFileName
    })
    if (!paths) {
        return
    }
    if (paths.length > 1) {
        Message.info('最多一次只能打开一个文件')
        return
    }
    let content
    try {
        content = await editorReadFile(paths[0])
    } catch (e: any) {
        Message.error(e.toString())
        return
    }
    await callIframe('editorSetContent', content)
    filePath.value = paths[0]
};
const doOpenNew = async () => {
    const path = focusany.showSaveDialog({
        defaultPath: editorDefaultFileName
    })
    if (!path) {
        return
    }
    await callIframe('editorSetContent', null)
    filePath.value = path
};
const doSave = async () => {
    if (!filePath.value) {
        filePath.value = focusany.showSaveDialog({
            defaultPath: editorDefaultFileName
        }) as string
    }
    if (!filePath.value) {
        return
    }
    const content = await callIframe('editorGetContent')
    await editorWriteFile(filePath.value, content)
    Message.success('保存成功')
};
const doSaveAs = async () => {
    const path = focusany.showSaveDialog({
        defaultPath: editorDefaultFileName
    })
    if (!path) {
        return
    }
    filePath.value = path
    const content = await callIframe('editorGetContent')
    await editorWriteFile(filePath.value, content)
    Message.success('保存成功')
}
const doOpenFile = async (file: string) => {
    let content
    try {
        content = await editorReadFile(file)
    } catch (e: any) {
        Message.error(e.toString())
        return
    }
    await callIframe('editorSetContent', content)
    filePath.value = file
    Message.success('已经打开')
}
const doExport = async (type: string) => {
    Message.warning(`导出${type}格式，待实现`)
}
onMounted(async () => {
    await callIframe('editorInit')
    window.addEventListener('message', (event) => {
        const {type, data} = event.data
        if ('ContentChange' === type) {
            saveDebounce(data)
        }
    })
    if (window.focusany) {
        const history = focusany.dbStorage.getItem('history')
        if (history) {
            fileHistories.value = history
        }
    }
})

if (window.focusany) {
    focusany.onPluginReady((data) => {
        if (data.actionMatch?.name === 'editor') {
            if (data.actionMatchFiles && data.actionMatchFiles.length > 0) {
                doOpenFile(data.actionMatchFiles[0].path).then()
            }
        }
    })
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
                @saveAs="doSaveAs"
                @open-file="doOpenFile"
                @export="doExport"
            />
        </div>
        <div class="flex-grow">
            <iframe
                ref="iframe"
                @load="onIframeLoad"
                style="width:100%;height:100%;border:none;"
                :src="editorIframeUrl"></iframe>
        </div>
    </div>
</template>
