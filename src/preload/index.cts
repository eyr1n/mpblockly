import type {
  MessageBoxReturnValue,
  OpenDialogReturnValue,
  SaveDialogReturnValue,
} from 'electron';

const { contextBridge, ipcRenderer } =
  require('electron') as typeof import('electron');

const electronAPI = {
  readWorkspace: (file: string): Promise<string> =>
    ipcRenderer.invoke('read-workspace', file),
  writeWorkspace: (file: string, data: string): Promise<void> =>
    ipcRenderer.invoke('write-workspace', file, data),
  openWorkspaceDialog: (): Promise<OpenDialogReturnValue> =>
    ipcRenderer.invoke('open-workspace-dialog'),
  saveWorkspaceDialog: (): Promise<SaveDialogReturnValue> =>
    ipcRenderer.invoke('save-workspace-dialog'),
  beforeCloseDialog: (): Promise<MessageBoxReturnValue> =>
    ipcRenderer.invoke('before-close-dialog'),
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
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export type ElectronAPI = typeof electronAPI;
