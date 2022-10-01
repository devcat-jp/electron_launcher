const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    dropEvent: (data) => ipcRenderer.invoke('dropEvent', data),
    showContextMenu: () => ipcRenderer.invoke('showContextMenu'),
    buttonClick: (data) => ipcRenderer.invoke('buttonClick',data),
})