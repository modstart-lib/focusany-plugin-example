import {ref} from "vue";
import {debounce} from "lodash-es";
import {Message} from "@arco-design/web-vue";


export const useFile = (data: {
    EDITOR_DEFAULT_FILE_NAME: string,
    EDITOR_FILE_TYPE: string,
    callIframe: any,
}) => {

    const {
        EDITOR_DEFAULT_FILE_NAME,
        EDITOR_FILE_TYPE,
        callIframe,
    } = data

    const filePath = ref('')
    const saveDebounce = debounce(async (content) => {
        if (filePath.value) {
            await focusany.fada.write(EDITOR_FILE_TYPE, filePath.value, {
                content
            })
        }
    }, 1000)

    const doOpen = async () => {
        const paths = focusany.showOpenDialog({
            defaultPath: EDITOR_DEFAULT_FILE_NAME
        })
        if (!paths) {
            return
        }
        if (paths.length > 1) {
            Message.info('最多一次只能打开一个文件')
            return
        }
        await doOpenFile(paths[0])
    };

    const doOpenNew = async () => {
        const path = focusany.showSaveDialog({
            defaultPath: EDITOR_DEFAULT_FILE_NAME
        })
        if (!path) {
            return
        }
        await callIframe('editorSetContent', '')
        filePath.value = path
    };

    const doSave = async (isNew: boolean = false) => {
        if (isNew || !filePath.value) {
            filePath.value = focusany.showSaveDialog({
                defaultPath: EDITOR_DEFAULT_FILE_NAME
            }) as string
        }
        if (!filePath.value) {
            return
        }
        const content = await callIframe('editorGetContent')
        await focusany.fada.write(EDITOR_FILE_TYPE, filePath.value, {
            content
        })
        Message.success('保存成功')
    };

    const doOpenFile = async (file: string) => {
        let data
        try {
            data = await focusany.fada.read(EDITOR_FILE_TYPE, file)
        } catch (e: any) {
            Message.error(e.toString())
            return
        }
        await callIframe('editorSetContent', data['content'])
        filePath.value = file
        Message.success('已经打开')
    }

    const fileInit = async () => {
        await callIframe('editorInit')
        window.addEventListener('message', (event) => {
            const {type, data} = event.data
            if ('ContentChange' === type) {
                saveDebounce(data)
            }
        })
    }

    return {
        filePath,
        doOpen,
        doOpenNew,
        doSave,
        doOpenFile,
        fileInit,
    }
}
