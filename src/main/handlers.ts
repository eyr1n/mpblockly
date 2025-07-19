import { readFile, writeFile } from 'node:fs/promises';
import {
  BrowserWindow,
  dialog,
  type IpcMainInvokeEvent,
  type MessageBoxReturnValue,
  type OpenDialogReturnValue,
  type SaveDialogReturnValue,
} from 'electron';

function getWindowFromEvent(event: IpcMainInvokeEvent): BrowserWindow {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) {
    throw new Error('window is null');
  }
  return window;
}

export function readWorkspace(
  _: IpcMainInvokeEvent,
  file: string,
): Promise<string> {
  return readFile(file, { encoding: 'utf-8' });
}

export function writeWorkspace(
  _: IpcMainInvokeEvent,
  file: string,
  data: string,
): Promise<void> {
  return writeFile(file, data, { encoding: 'utf-8' });
}

export function openWorkspaceDialog(
  event: IpcMainInvokeEvent,
): Promise<OpenDialogReturnValue> {
  return dialog.showOpenDialog(getWindowFromEvent(event), {
    filters: [
      {
        name: 'mpblockly ワークスペース',
        extensions: ['mpblockly'],
      },
    ],
  });
}

export function saveWorkspaceDialog(
  event: IpcMainInvokeEvent,
): Promise<SaveDialogReturnValue> {
  return dialog.showSaveDialog(getWindowFromEvent(event), {
    filters: [
      {
        name: 'mpblockly ワークスペース',
        extensions: ['mpblockly'],
      },
    ],
  });
}

export function beforeCloseDialog(
  event: IpcMainInvokeEvent,
): Promise<MessageBoxReturnValue> {
  return dialog.showMessageBox(getWindowFromEvent(event), {
    type: 'warning',
    message: '保存されていない変更を保存しますか?',
    buttons: ['保存しない', 'キャンセル', '保存'],
    cancelId: 1,
  });
}

export function closeWindow(event: IpcMainInvokeEvent) {
  getWindowFromEvent(event).destroy();
}

export function flashToPico() {
  // TODO
}
