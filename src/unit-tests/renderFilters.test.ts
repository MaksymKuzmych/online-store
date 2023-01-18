import { renderFilters } from '../components/main-filter/main-filter';

describe('Check filters element:', () => {
  test('should be defined', () => {
    expect(renderFilters).toBeDefined();
    expect(renderFilters).not.toBeUndefined();
  });

  test('should be function', () => {
    expect(renderFilters).toBeInstanceOf(Function);
  });
});
