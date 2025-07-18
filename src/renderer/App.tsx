import {
  Box,
  Button,
  ButtonGroup,
  ScopedCssBaseline,
  Stack,
} from '@mui/material';
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
    <Stack sx={{ width: '100dvw', height: '100dvh', overflow: 'hidden' }}>
      <ScopedCssBaseline>
        <ButtonGroup
          sx={{ margin: 1 }}
          variant="outlined"
          aria-label="Basic button group"
        >
          <Button>新規</Button>
          <Button
            onClick={async () => {
              const state = await window.electronAPI.workspaceOpen();
              if (state) {
                Blockly.serialization.workspaces.load(
                  state.workspace,
                  workspace.current,
                );
              }
            }}
          >
            開く
          </Button>
          <Button
            onClick={async () => {
              const state = Blockly.serialization.workspaces.save(
                workspace.current,
              );
              await window.electronAPI.workspaceSaveAs(state);
            }}
          >
            上書き保存
          </Button>
          <Button>別名保存</Button>
          <Button>Picoに書き込み</Button>
        </ButtonGroup>
      </ScopedCssBaseline>

      <Box sx={{ flex: 1 }}>
        <ReactBlockly ref={workspace} toolbox={toolbox} />
      </Box>
    </Stack>
  );
}
