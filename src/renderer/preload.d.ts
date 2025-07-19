import type { ElectronAPI } from '../preload/index.cjs';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
