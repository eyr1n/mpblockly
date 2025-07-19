import { Order } from 'blockly/python';
import { block, category } from './utils';

export const example = category({ name: 'サンプル' }, [
  block({ type: 'text' }),
  block(
    { type: 'string_length' },
    {
      message0: 'length of %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE',
          check: 'String',
        },
      ],
      output: 'Number',
      colour: 160,
      tooltip: 'Returns number of letters in the provided text.',
      helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
      generator: (block, generator) => {
        const argument0 =
          generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || "''";
        return [`len(${argument0})`, Order.MEMBER];
      },
    },
  ),
]);
