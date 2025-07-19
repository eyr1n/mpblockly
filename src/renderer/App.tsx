import * as Blockly from 'blockly/core';
import { useEffect, useRef, useState } from 'react';
import { ReactBlockly } from './blockly/ReactBlockly';
import { block, category, categoryToolbox } from './blockly/toolbox';
import { unchi } from './blocks';
import { FileManager } from './file';

const toolbox = categoryToolbox([
  category('ほげ', [
    unchi,
    block('text'),
    category('ほげ1', [
      unchi,
      block('controls_whileUntil'),
      block('controls_if'),
    ]),
    block('controls_if'),
  ]),
]);

const fileManager = new FileManager();

export function App() {
  const workspace = useRef<Blockly.Workspace>(null);

  const [currentState, setCurrentState] = useState('{}');

  useEffect(() => {
    const dispose = window.electronAPI.onBeforeClose(() => {
      if (!workspace.current) {
        return;
      }
      const state = JSON.stringify(
        Blockly.serialization.workspaces.save(workspace.current),
      );
      if (currentState !== state) {
        fileManager.setDirty();
        fileManager.promptToSaveOnQuit(state);
      }
    });

    return () => {
      dispose();
    };
  }, [currentState]);

  return (
    <div className="w-dvw h-dvh overflow-hidden flex flex-col">
      <div className="flex m-2 gap-2">
        <button
          type="button"
          onClick={async () => {
            if (!workspace.current) {
              return;
            }
            const data = await fileManager.open();
            if (data) {
              const state = JSON.parse(data);
              Blockly.serialization.workspaces.load(state, workspace.current);
            }
          }}
        >
          開く
        </button>
        <button
          type="button"
          onClick={async () => {
            if (!workspace.current) {
              return;
            }
            const state = Blockly.serialization.workspaces.save(
              workspace.current,
            );
            await fileManager.save(JSON.stringify(state));
          }}
        >
          上書き保存
        </button>
        <button
          type="button"
          onClick={async () => {
            if (!workspace.current) {
              return;
            }
            const state = Blockly.serialization.workspaces.save(
              workspace.current,
            );
            await fileManager.saveAs(JSON.stringify(state));
          }}
        >
          別名保存
        </button>
        <button type="button">Picoに書き込み</button>
      </div>

      <div className="grow">
        <ReactBlockly ref={workspace} toolbox={toolbox} />
      </div>
    </div>
  );
}
