import * as Blockly from 'blockly/core';
import { useEffect, useRef, useState } from 'react';
import { ReactBlockly } from './blockly/ReactBlockly';
import { block, category, categoryToolbox } from './blockly/toolbox';
import { unchi } from './blocks';
import { Button } from './components/Button';
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

  const [currentState, _setCurrentState] = useState('{}');

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
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      <div className="m-2 flex gap-2">
        <Button
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
        </Button>
        <Button
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
        </Button>
        <Button
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
        </Button>
        <Button onClick={() => {}}>Pico に書き込み</Button>
      </div>

      <div className="grow">
        <ReactBlockly ref={workspace} toolbox={toolbox} />
      </div>
    </div>
  );
}
