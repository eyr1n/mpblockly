import { example } from './example';
import { block, category, categoryToolbox } from './utils';

export default categoryToolbox([
  category({ name: '大カテゴリ' }, [
    example,
    category({ name: '小カテゴリ' }, [
      category({ name: '小カテゴリ' }, [
        block({ type: 'controls_whileUntil' }),
        block({ type: 'controls_if' }),
      ]),
      block({ type: 'controls_whileUntil' }),
      block({ type: 'controls_if' }),
    ]),
  ]),
]);
