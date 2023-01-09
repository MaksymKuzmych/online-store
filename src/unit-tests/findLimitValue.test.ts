import { findLimitValue } from '../components/main-filter/multirange';
import { watchData } from '../watch-data/watch-data';

describe('Find limit value:', () => {
  let data = [...watchData];

  beforeEach(() => {
    data = [...watchData];
  });

  test('should not return NaN', () => {
    expect(findLimitValue(data, 'price', 'max')).not.toBeNaN();
    expect(findLimitValue(data, 'price', 'min')).not.toBeNaN();
    expect(findLimitValue(data, 'stock', 'max')).not.toBeNaN();
    expect(findLimitValue(data, 'stock', 'min')).not.toBeNaN();
  });

  test('should find max price in array of watches', () => {
    expect(findLimitValue(data, 'price', 'max')).toBe(9293);
  });

  test('should find min stock in array of watches', () => {
    expect(findLimitValue(data, 'stock', 'min')).toBe(8);
  });

  test('should be higher than value', () => {
    expect(findLimitValue(data, 'price', 'min')).toBeGreaterThan(10);
  });
});
