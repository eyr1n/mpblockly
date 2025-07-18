import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  app,
  BrowserWindow,
  dialog,
  type IpcMainInvokeEvent,
  ipcMain,
} from 'electron';
import { startViteServer } from './server.js';

async function workspaceOpen(): Promise<{
  path: string;
  workspace: unknown;
} | null> {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [
      {
        name: '.mpblockly',
        extensions: ['mpblockly'],
      },
    ],
  });
  if (canceled) {
    return null;
  }
  const path = filePaths[0];
  const workspace = await readFile(path, { encoding: 'utf-8' }).then((text) =>
    JSON.parse(text),
  );
  return { path, workspace };
}

async function workspaceSave(
  _: IpcMainInvokeEvent,
  path: string,
  workspace: unknown,
): Promise<void> {
  await writeFile(path, JSON.stringify(workspace));
}

async function workspaceSaveAs(
  _: IpcMainInvokeEvent,
  workspace: unknown,
): Promise<boolean> {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [
      {
        name: '.mpblockly',
        extensions: ['mpblockly'],
      },
    ],
  });
  if (canceled) {
    return false;
  }
  await writeFile(filePath, JSON.stringify(workspace));
  return true;
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
}

app.whenReady().then(() => {
  ipcMain.handle('workspaceOpen', workspaceOpen);
  ipcMain.handle('workspaceSave', workspaceSave);
  ipcMain.handle('workspaceSaveAs', workspaceSaveAs);

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
