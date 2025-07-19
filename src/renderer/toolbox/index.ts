import { example } from './example';
import { block, category, categoryToolbox, separator } from './utils';

export default categoryToolbox([
  category({ name: '大カテゴリ' }, [
    example,
    separator(),
    category({ name: '小カテゴリ' }, [
      block({ type: 'controls_whileUntil' }),
      block({ type: 'controls_if' }),
    ]),
  ]),
]);
