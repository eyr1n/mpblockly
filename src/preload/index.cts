const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  workspaceOpen: () => ipcRenderer.invoke('workspaceOpen'),
  workspaceSave: (path: string, workspace: unknown) =>
    ipcRenderer.invoke('workspaceSave', path, workspace),
  workspaceSaveAs: (workspace: unknown) =>
    ipcRenderer.invoke('workspaceSaveAs', workspace),
});
