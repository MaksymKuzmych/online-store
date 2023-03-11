import { getLocalData } from '../utils/get-local-data';

describe('Check local data getter:', () => {
  test('should not return null', () => {
    expect(getLocalData()).not.toBeNull();
  });

  test('should return an object', () => {
    expect(getLocalData()).toBeInstanceOf(Object);
  });

  test('should return an object with theese properties', () => {
    expect(getLocalData()).toHaveProperty('localAmount');
    expect(getLocalData()).toHaveProperty('localFilters');
  });

  test('localFilters should be an object', () => {
    expect(getLocalData().localFilters).toBeInstanceOf(Object);
  });

  test('localCart should be an array', () => {
    expect(getLocalData().localCart).toBeInstanceOf(Array);
  });
});
