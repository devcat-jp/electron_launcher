const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    dropEvent: (data) => ipcRenderer.invoke('dropEvent', data),
})