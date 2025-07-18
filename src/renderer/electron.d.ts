export interface IElectronAPI {
  workspaceOpen: () => Promise<{
    path: string;
    workspace: unknown;
  } | null>;
  workspaceSave: (path: string, workspace: unknown) => Promise<void>;
  workspaceSaveAs: (workspace: unknown) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
