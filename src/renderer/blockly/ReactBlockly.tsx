import 'blockly/blocks';
import * as Blockly from 'blockly/core';
import * as Ja from 'blockly/msg/ja';
import { type RefObject, useEffect, useRef } from 'react';
import type { CategoryToolbox } from './toolbox';

Blockly.setLocale(Ja.default ?? Ja);

interface BlocklyProps {
  ref: RefObject<Blockly.Workspace | null>;
  toolbox: CategoryToolbox;
}

export function ReactBlockly({ ref, toolbox }: BlocklyProps) {
  const blocklyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blocklyRef.current) {
      return;
    }

    const workspace = Blockly.inject(blocklyRef.current, { toolbox });
    ref.current = workspace;

    return () => {
      ref.current = null;
      workspace.dispose();
    };
  }, [ref, toolbox]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={blocklyRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
