import 'blockly/blocks';
import * as Blockly from 'blockly/core';
import * as Ja from 'blockly/msg/ja';
import { type RefObject, useEffect, useRef } from 'react';
import type { CategoryToolbox } from './toolbox';

export interface BlocklyProps {
  ref: RefObject<Blockly.Workspace | null>;
  toolbox: CategoryToolbox;
}

export function ReactBlockly({ ref, toolbox }: BlocklyProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    Blockly.setLocale(Ja.default ?? Ja);
    const workspace = Blockly.inject(container.current, { toolbox });
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
        ref={container}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
