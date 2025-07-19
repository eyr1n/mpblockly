import {
  type MessageBoxReturnValue,
  type OpenDialogReturnValue,
  type SaveDialogReturnValue,
} from 'electron';

export interface IElectronAPI {
  readTextFile: (file: string) => Promise<string>;
  writeTextFile: (file: string, data: string) => Promise<void>;
  showOpenDialog: () => Promise<OpenDialogReturnValue>;
  showSaveDialog: () => Promise<SaveDialogReturnValue>;
  showConfirmDialog: () => Promise<MessageBoxReturnValue>;
  onBeforeClose: (listener: () => void) => () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
