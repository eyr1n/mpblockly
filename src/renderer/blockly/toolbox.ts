import 'blockly/blocks';
import * as Blockly from 'blockly/core';
import { type PythonGenerator, pythonGenerator } from 'blockly/python';

export interface CategoryToolbox {
  kind: 'categoryToolbox';
  contents: Category[];
}

export interface Category {
  kind: 'category';
  name: string;
  contents: (Category | Block)[];
}

export interface Block {
  kind: 'block';
  type: string;
}

export interface BlockDefinition {
  generator(
    block: Blockly.Block,
    generator: PythonGenerator,
  ): [string, number] | string | null;
  [key: string]: unknown;
}

export function categoryToolbox(contents: Category[]): CategoryToolbox {
  return {
    kind: 'categoryToolbox',
    contents,
  };
}

export function category(
  name: string,
  contents: (Category | Block)[],
): Category {
  return {
    kind: 'category',
    name,
    contents,
  };
}

export function block(type: string, blockDefinition?: BlockDefinition): Block {
  if (blockDefinition != null) {
    if (type in Blockly.Blocks || type in pythonGenerator.forBlock) {
      throw new Error(`"${type}" has already been declared`);
    }
    const { generator, ...definition } = blockDefinition;
    Blockly.common.defineBlocksWithJsonArray([{ ...definition, type }]);
    pythonGenerator.forBlock[type] = generator;
  }
  return {
    kind: 'block',
    type,
  };
}
