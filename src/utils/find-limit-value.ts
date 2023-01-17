import { IWatch } from '../interfaces';

export function findLimitValue(array: IWatch[], value: 'price' | 'stock', type: 'min' | 'max') {
  if (array.length) {
    return Math[type](...array.map((watch) => watch[value]));
  }
  return 0;
}
