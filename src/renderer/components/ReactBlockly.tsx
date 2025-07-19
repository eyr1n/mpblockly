import * as Blockly from 'blockly/core';
import { type RefObject, useEffect, useRef } from 'react';

interface BlocklyProps {
  ref: RefObject<Blockly.Workspace | null>;
  options: Blockly.BlocklyOptions;
}

export function ReactBlockly({ ref, options }: BlocklyProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const workspace = Blockly.inject(container.current, options);
    ref.current = workspace;

    return () => {
      ref.current = null;
      workspace.dispose();
    };
  }, [ref, options]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute h-full w-full" ref={container} />
    </div>
  );
}
