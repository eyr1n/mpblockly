import { readFile, writeFile } from 'node:fs/promises';
import {
  BrowserWindow,
  dialog,
  type IpcMainInvokeEvent,
  type MessageBoxReturnValue,
  type OpenDialogReturnValue,
  type SaveDialogReturnValue,
} from 'electron';

export function readTextFile(
  _: IpcMainInvokeEvent,
  file: string,
): Promise<string> {
  return readFile(file, { encoding: 'utf-8' });
}

export function writeTextFile(
  _: IpcMainInvokeEvent,
  file: string,
  data: string,
): Promise<void> {
  return writeFile(file, data, { encoding: 'utf-8' });
}

export function showOpenDialog(
  event: IpcMainInvokeEvent,
): Promise<OpenDialogReturnValue> {
  return dialog.showOpenDialog(getWindowFromEvent(event), {
    filters: [
      {
        name: 'mpblockly workspace',
        extensions: ['mpblockly'],
      },
    ],
  });
}

export function showSaveDialog(
  event: IpcMainInvokeEvent,
): Promise<SaveDialogReturnValue> {
  return dialog.showSaveDialog(getWindowFromEvent(event), {
    filters: [
      {
        name: 'mpblockly workspace',
        extensions: ['mpblockly'],
      },
    ],
  });
}

export function showConfirmDialog(
  event: IpcMainInvokeEvent,
): Promise<MessageBoxReturnValue> {
  return dialog.showMessageBox(getWindowFromEvent(event), {
    type: 'warning',
    message: 'ワークスペースの変更を保存しますか?',
    buttons: ['保存しない', 'キャンセル', '保存'],
    cancelId: 1,
  });
}

function getWindowFromEvent(event: IpcMainInvokeEvent): BrowserWindow {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) {
    throw new Error('window is null');
  }
  return window;
}
