import { IWatch } from '../interfaces';

export function findLimitValue(array: IWatch[], value: 'price' | 'stock', type: 'min' | 'max') {
  return Math[type](...array.map((item) => item[value]));
}
