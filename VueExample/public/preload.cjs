const fs = require('fs')

window.focusanyApi = {
    fileExt: (filepath) => {
        return filepath.split('.').pop().toLowerCase()
    },
    read: async (filepath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    write: async (filepath, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, data, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}
