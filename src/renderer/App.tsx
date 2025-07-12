import * as Blockly from 'blockly/core';
import { useEffect, useRef } from 'react';
import 'blockly/blocks';
import 'blockly/javascript';
import * as Ja from 'blockly/msg/ja';

export function App() {
  const blocklyRef = useRef<HTMLDivElement>(null);

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

    const workspace = Blockly.inject(blocklyRef.current, { toolbox: toolbox });

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
