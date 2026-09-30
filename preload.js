const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ddWin', {
  min: () => ipcRenderer.send('dd-win', 'min'),
  max: () => ipcRenderer.send('dd-win', 'max'),
  close: () => ipcRenderer.send('dd-win', 'close')
});
