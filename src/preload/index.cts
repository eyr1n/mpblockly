const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readTextFile: (file: string) => ipcRenderer.invoke('readTextFile', file),
  writeTextFile: (file: string, data: string) =>
    ipcRenderer.invoke('writeTextFile', file, data),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
  showSaveDialog: () => ipcRenderer.invoke('showSaveDialog'),
  showConfirmDialog: () => ipcRenderer.invoke('showConfirmDialog'),
  onBeforeClose: (listener: () => void) => {
    ipcRenderer.on('window:before-close', listener);
    return () => {
      ipcRenderer.off('window:before-close', listener);
    };
  },
});
