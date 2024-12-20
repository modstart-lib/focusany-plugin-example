const {shell} = require('electron')

console.log('plugin-example.preload.js');

window.exports = {
    "code": {
        "plugin-example-code": async (data) => {
            console.log('plugin-example-code', data);
            console.log('window.focusany', window.focusany);
            console.log("focusany.db.get('test')", focusany.db.get('test'))
            shell.openExternal('https://www.focusany.com').then()
            return 'return-value'
        }
    }
}

