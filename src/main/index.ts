import { resolve } from 'node:path';
import { app, BrowserWindow } from 'electron';
import { startViteServer } from './server.js';

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: resolve(import.meta.dirname, '../preload/index.cjs'),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(
      resolve(import.meta.dirname, '../../dist-vite/index.html'),
    );
  } else {
    mainWindow.loadURL(await startViteServer());
  }
}

app.whenReady().then(() => {
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
