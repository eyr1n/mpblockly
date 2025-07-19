import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  app,
  BrowserWindow,
  dialog,
  type IpcMainInvokeEvent,
  ipcMain,
  type MessageBoxReturnValue,
  type OpenDialogReturnValue,
  type SaveDialogReturnValue,
} from 'electron';
import { startViteServer } from './server.js';

function readTextFile(_: IpcMainInvokeEvent, file: string): Promise<string> {
  return readFile(file, { encoding: 'utf-8' });
}

function writeTextFile(
  _: IpcMainInvokeEvent,
  file: string,
  data: string,
): Promise<void> {
  return writeFile(file, data, { encoding: 'utf-8' });
}

function showOpenDialog(): Promise<OpenDialogReturnValue> {
  return dialog.showOpenDialog({
    filters: [
      {
        name: 'mpblockly workspace',
        extensions: ['mpblockly'],
      },
    ],
  });
}

function showSaveDialog(): Promise<SaveDialogReturnValue> {
  return dialog.showSaveDialog({
    filters: [
      {
        name: 'mpblockly workspace',
        extensions: ['mpblockly'],
      },
    ],
  });
}

function showConfirmDialog(): Promise<MessageBoxReturnValue> {
  return dialog.showMessageBox({
    type: 'warning',
    message: 'ワークスペースの変更を保存しますか?',
    buttons: ['保存しない', 'キャンセル', '保存'],
    cancelId: 1,
  });
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: resolve(import.meta.dirname, '../preload/index.cjs'),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  if (app.isPackaged) {
    mainWindow.loadFile(
      resolve(import.meta.dirname, '../../dist-vite/index.html'),
    );
  } else {
    mainWindow.loadURL(await startViteServer());
  }

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.webContents.send('window:before-close');
  });
}

app.whenReady().then(() => {
  ipcMain.handle('readTextFile', readTextFile);
  ipcMain.handle('writeTextFile', writeTextFile);
  ipcMain.handle('showOpenDialog', showOpenDialog);
  ipcMain.handle('showSaveDialog', showSaveDialog);
  ipcMain.handle('showConfirmDialog', showConfirmDialog);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
