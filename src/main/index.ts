import { resolve } from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';
import {
  readTextFile,
  showConfirmDialog,
  showOpenDialog,
  showSaveDialog,
  writeTextFile,
} from './handlers.js';
import { startViteServer } from './server.js';

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
