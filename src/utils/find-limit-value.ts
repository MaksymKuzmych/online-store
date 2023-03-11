import { IWatch } from '../interfaces';

export function findLimitValue(array: IWatch[], value: 'price' | 'stock', type: 'min' | 'max') {
  if (array.length) {
    return Math[type](...array.map((item) => item[value]));
  }
  return 0;
}
