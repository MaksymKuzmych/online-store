import { setLocalData } from '../utils/set-local-data';

describe('Check local data setter:', () => {
  test('should be defined', () => {
    expect(setLocalData).toBeDefined();
    expect(setLocalData).not.toBeUndefined();
  });

  test('should be function', () => {
    expect(setLocalData).toBeInstanceOf(Function);
  });
});
