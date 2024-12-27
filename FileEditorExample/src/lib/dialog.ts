import {Message, Modal} from "@arco-design/web-vue";

export const Dialog = {
    confirm(message: string, callback: Function) {
        Modal.info({
            title: '提示',
            width: 240,
            simple: false,
            titleAlign: 'start',
            content: message,
            hideCancel: false,
            cancelText: '取消',
            onCancel: () => {
            },
            onOk: () => {
                callback()
            }
        })
    },
    tipSuccess(message: string) {
        Message.success(message)
    },
    tipError(message: string) {
        Message.error(message)
    }
}
