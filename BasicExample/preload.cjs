const {shell} = require('electron')

console.log('plugin-example.preload.js');

window.exports = {
    "code": {
        "code": async (data) => {
            console.log('plugin-example-code', data);
            console.log('window.focusany', window.focusany);
            console.log("focusany.db.get('test')", focusany.db.get('test'))
            shell.openExternal('https://www.focusany.com').then()
            return 'return-value'
        },
        "code-command": {
            setting: {
                type: "list",
                placeholder: '支持在这里搜索',
            },
            execute: async (item, keywords, data) => {
                console.log('plugin-example-code-command', item, keywords, data);
                const items = [];
                items.push({
                    id: 'none',
                    title: '误操作',
                    description: '点击后不会执行任何操作',
                    icon: 'logo.svg',
                })
                items.push({
                    id: 'error',
                    title: '错误',
                    description: '点击后执行错误',
                    icon: 'logo.svg',
                })
                items.push({
                    id: 'close',
                    title: '关闭',
                    description: '点击后关闭',
                    icon: 'logo.svg',
                })
                items.push({
                    id: 'clear',
                    title: '清空',
                    description: '点击后清空',
                    icon: 'logo.svg',
                })
                items.push({
                    id: 'noLoading',
                    title: '点击不带Loading',
                    description: '点击后下一步不带Loading',
                    icon: 'logo.svg',
                    loading: false,
                })
                items.push({
                    id: 'changePlaceholder',
                    title: '修改Placeholder',
                    description: '点击后修改Placeholder',
                    icon: 'logo.svg',
                })
                if (!item) {
                    return {
                        command: "data",
                        items: items
                    }
                }
                switch (item.id) {
                    case 'none':
                        return {
                            command: 'none',
                        };
                    case 'error':
                        return {
                            command: 'error',
                            error: '这是一个错误示例',
                        };
                    case 'close':
                        return {
                            command: 'close',
                        };
                    case 'clear':
                        return {
                            command: 'clear',
                        };
                    case 'noLoading':
                        return {
                            command: "data",
                            items: items
                        }
                    case 'changePlaceholder':
                        return {
                            command: 'none',
                            placeholder: '新的Placeholder',
                        }
                }
            },
        },
    }
}

