import * as Blockly from 'blockly/core';
import { useEffect, useRef, useState } from 'react';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';
import * as Ja from 'blockly/msg/ja';

export function App() {
  const blocklyRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState('');
  console.log(code);

  useEffect(() => {
    if (!blocklyRef.current) {
      return;
    }

    Blockly.setLocale(Ja.default ?? Ja);

    const toolbox = {
      // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
      kind: 'flyoutToolbox',
      // The contents is the blocks and other items that exist in your toolbox.
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
        // You can add more blocks to this array.
      ],
    };

    const supportedEvents = new Set<string>([
      Blockly.Events.BLOCK_CHANGE,
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_MOVE,
    ]);

    function updateCode(event: Blockly.Events.Abstract) {
      if (workspace.isDragging()) return; // Don't update while changes are happening.
      if (!supportedEvents.has(event.type)) return;

      const code = pythonGenerator.workspaceToCode(workspace);
      setCode(code);
    }

    const workspace = Blockly.inject(blocklyRef.current, { toolbox: toolbox });
    workspace.addChangeListener(updateCode);

    return () => {
      workspace.dispose();
    };
  }, []);

  return (
    <div
      ref={blocklyRef}
      style={{
        width: '100dvw',
        height: '100dvh',
      }}
    />
  );
}
