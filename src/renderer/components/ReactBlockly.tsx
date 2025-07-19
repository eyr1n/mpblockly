import * as Blockly from 'blockly/core';
import { type RefObject, useEffect, useRef } from 'react';
import type { CategoryToolbox } from '../blockly/toolbox';

interface BlocklyProps {
  ref: RefObject<Blockly.Workspace | null>;
  toolbox: CategoryToolbox;
}

export function ReactBlockly({ ref, toolbox }: BlocklyProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const workspace = Blockly.inject(container.current, { toolbox });
    ref.current = workspace;

    return () => {
      ref.current = null;
      workspace.dispose();
    };
  }, [ref, toolbox]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute h-full w-full" ref={container} />
    </div>
  );
}
