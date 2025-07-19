export class FileManager {
  #path: string | null = null;
  #dirty = false;

  setDirty() {
    this.#dirty = true;
  }

  async open() {
    const { canceled, filePaths } = await window.electronAPI.showOpenDialog();
    if (canceled) {
      return;
    }
    const data = await window.electronAPI.readTextFile(filePaths[0]);
    this.#path = filePaths[0];
    this.#dirty = false;
    return data;
  }

  async save(data: string) {
    if (this.#path == null) {
      return this.saveAs(data);
    }
    await window.electronAPI.writeTextFile(this.#path, data);
    this.#dirty = false;
  }

  async saveAs(data: string) {
    const { canceled, filePath } = await window.electronAPI.showSaveDialog();
    if (canceled) {
      return;
    }
    await window.electronAPI.writeTextFile(filePath, data);
    this.#path = filePath;
    this.#dirty = false;
  }

  async promptToSaveOnQuit(data: string) {
    if (!this.#dirty) {
      return true;
    }
    const { response } = await window.electronAPI.showConfirmDialog();
    switch (response) {
      case 0:
        return true;
      case 2:
        await this.save(data);
        return true;
      default:
        return true;
    }
  }
}
