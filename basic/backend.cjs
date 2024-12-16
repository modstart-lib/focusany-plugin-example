module.exports = {
    "hook": {
        "installed": async (focusany) => {
            focusany.showToast('插件已安装')
        },
        "beforeUninstall": async (focusany) => {
            focusany.showToast('插件即将卸载')
        },
    },
    "event": {
        "testEvent": async (focusany, data) => {
            console.log('testEvent.focusany', focusany);
            console.log('testEvent.data', data);
            focusany.showToast('事件已触发');
            return "data from backend : " + JSON.stringify(data)
        }
    },
    "action": {
        "plugin-example-backend": async (focusany, data) => {
            console.log('plugin-example-backend.focusany', focusany);
            console.log('plugin-example-backend.data', data);
            // console.log('test', await focusany.showSaveDialog());
            focusany.showToast('后台进程已执行');
            return 'ok'
        }
    }
}

