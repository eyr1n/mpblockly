import { resolve } from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';
import {
  beforeCloseDialog,
  closeWindow,
  flashToPico,
  openWorkspaceDialog,
  readWorkspace,
  saveWorkspaceDialog,
  writeWorkspace,
} from './handlers.js';
import { startViteServer } from './server.js';

async function createWindow() {
  const mainWindow = new BrowserWindow({
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
    mainWindow.webContents.send('before-close');
  });
}

app.whenReady().then(() => {
  ipcMain.handle('read-workspace', readWorkspace);
  ipcMain.handle('write-workspace', writeWorkspace);
  ipcMain.handle('open-workspace-dialog', openWorkspaceDialog);
  ipcMain.handle('save-workspace-dialog', saveWorkspaceDialog);
  ipcMain.handle('before-close-dialog', beforeCloseDialog);
  ipcMain.handle('close-window', closeWindow);
  ipcMain.handle('flash-to-pico', flashToPico);

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
