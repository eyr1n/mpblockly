import * as Blockly from 'blockly/core';
import { useEffect, useRef } from 'react';
import { ReactBlockly } from './blockly/ReactBlockly';
import { block, category, categoryToolbox } from './blockly/toolbox';
import { unchi } from './blocks';

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

export function App() {
  const workspace = useRef<Blockly.Workspace>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (workspace.current) {
        const state = Blockly.serialization.workspaces.save(workspace.current);
        console.log(state);
        //Blockly.serialization.workspaces.load(state, workspace);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div style={{ width: '100dvw', height: '50dvh' }}>
      <ReactBlockly ref={workspace} toolbox={toolbox} />
    </div>
  );
}
