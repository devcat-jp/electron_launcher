const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    dropEvent: (data) => ipcRenderer.invoke('dropEvent', data),
    showContextMenu: () => ipcRenderer.invoke('showContextMenu'),
    //showContextMenu: () => ipcRenderer.send('showContextMenu'),
})