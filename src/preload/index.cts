import type { ElectronAPI } from '../types/preload';

const { contextBridge, ipcRenderer } =
  require('electron') as typeof import('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readWorkspace: (file: string) => ipcRenderer.invoke('read-workspace', file),
  writeWorkspace: (file: string, data: string) =>
    ipcRenderer.invoke('write-workspace', file, data),
  openWorkspaceDialog: () => ipcRenderer.invoke('open-workspace-dialog'),
  saveWorkspaceDialog: () => ipcRenderer.invoke('save-workspace-dialog'),
  beforeCloseDialog: () => ipcRenderer.invoke('before-close-dialog'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  onBeforeClose: (listener: () => void) => {
    const wrapper = () => {
      listener();
    };
    ipcRenderer.on('before-close', wrapper);
    return () => {
      ipcRenderer.off('before-close', wrapper);
    };
  },
} satisfies ElectronAPI);
