import {ref, toRaw, watch} from "vue";

export const useHistory = (data: { filePath: any }) => {

    const {filePath} = data

    const fileHistories = ref<string[]>([])

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

    const historyInit = () => {
        const history = focusany.dbStorage.getItem('history')
        if (history) {
            fileHistories.value = history
        }
    }

    return {
        fileHistories,
        historyInit
    }
}
