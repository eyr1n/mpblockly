import { example } from './example';
import { block, category, categoryToolbox } from './utils';

export default categoryToolbox([
  category('大カテゴリ', [
    example,
    category('小カテゴリ', [
      block('controls_whileUntil'),
      block('controls_if'),
    ]),
  ]),
]);
