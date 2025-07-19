import type {
  MessageBoxReturnValue,
  OpenDialogReturnValue,
  SaveDialogReturnValue,
} from 'electron';

export interface ElectronAPI {
  readWorkspace: (file: string) => Promise<string>;
  writeWorkspace: (file: string, data: string) => Promise<void>;
  openWorkspaceDialog: () => Promise<OpenDialogReturnValue>;
  saveWorkspaceDialog: () => Promise<SaveDialogReturnValue>;
  beforeCloseDialog: () => Promise<MessageBoxReturnValue>;
  closeWindow: () => Promise<void>;
  flashToPico: () => Promise<void>;
  onBeforeClose: (listener: () => void) => () => void;
}
