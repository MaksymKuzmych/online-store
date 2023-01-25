import { getLocalData } from '../utils/get-local-data';

describe('Check local data getter:', () => {
  test('should be defined', () => {
    expect(getLocalData).toBeDefined();
    expect(getLocalData).not.toBeUndefined();
  });

  test('should not return null', () => {
    expect(getLocalData()).not.toBeNull();
  });

  test('should return an object', () => {
    expect(getLocalData()).toBeInstanceOf(Object);
  });

  test('should return an object with theese properties', () => {
    expect(getLocalData()).toHaveProperty('localAmount');
    expect(getLocalData()).toHaveProperty('localCart');
    expect(getLocalData()).toHaveProperty('localCounter');
    expect(getLocalData()).toHaveProperty('localLimit');
    expect(getLocalData()).toHaveProperty('localPage');
    expect(getLocalData()).toHaveProperty('localPromo');
    expect(getLocalData()).toHaveProperty('localFilters');
  });

  test('returned properties should be theese types', () => {
    expect(typeof getLocalData().localAmount).toBe('number');
    expect(typeof getLocalData().localCounter).toBe('number');
    expect(typeof getLocalData().localLimit).toBe('number');
    expect(typeof getLocalData().localPage).toBe('number');
  });

  test('number properties should not be negative', () => {
    expect(getLocalData().localAmount).toBeGreaterThanOrEqual(0);
    expect(getLocalData().localCounter).toBeGreaterThanOrEqual(0);
    expect(getLocalData().localLimit).toBeGreaterThanOrEqual(0);
    expect(getLocalData().localPage).toBeGreaterThanOrEqual(0);
  });

  test('localCart should be an array', () => {
    expect(getLocalData().localCart).toBeInstanceOf(Array);
  });

  test('localCart should be empty when first load', () => {
    expect(getLocalData().localCart).toHaveLength(0);
  });

  test('localPromo should be an array', () => {
    expect(getLocalData().localPromo).toBeInstanceOf(Array);
  });

  test('localFilters should be an object', () => {
    expect(getLocalData().localFilters).toBeInstanceOf(Object);
  });

  test('localFilters should contain theese properties', () => {
    expect(getLocalData().localFilters).toHaveProperty('search');
    expect(getLocalData().localFilters).toHaveProperty('sort');
    expect(getLocalData().localFilters).toHaveProperty('view');
    expect(getLocalData().localFilters).toHaveProperty('optionsPointer');
    expect(getLocalData().localFilters).toHaveProperty('optionsDigital');
    expect(getLocalData().localFilters).toHaveProperty('optionsStrap');
    expect(getLocalData().localFilters).toHaveProperty('optionsBracelet');
    expect(getLocalData().localFilters).toHaveProperty('brandCasio');
    expect(getLocalData().localFilters).toHaveProperty('brandCitizen');
    expect(getLocalData().localFilters).toHaveProperty('brandNorthEdge');
    expect(getLocalData().localFilters).toHaveProperty('brandTagHeuer');
    expect(getLocalData().localFilters).toHaveProperty('brandFossil');
    expect(getLocalData().localFilters).toHaveProperty('priceFrom');
    expect(getLocalData().localFilters).toHaveProperty('priceMin');
    expect(getLocalData().localFilters).toHaveProperty('priceTo');
    expect(getLocalData().localFilters).toHaveProperty('priceMax');
    expect(getLocalData().localFilters).toHaveProperty('stockFrom');
    expect(getLocalData().localFilters).toHaveProperty('stockMin');
    expect(getLocalData().localFilters).toHaveProperty('stockTo');
    expect(getLocalData().localFilters).toHaveProperty('stockMax');
  });

  test('localFilters properties should be theese types', () => {
    expect(typeof getLocalData().localFilters.search).toBe('string');
    expect(typeof getLocalData().localFilters.sort).toBe('string');
    expect(typeof getLocalData().localFilters.view).toBe('string');
    expect(typeof getLocalData().localFilters.optionsPointer).toBe('boolean');
    expect(typeof getLocalData().localFilters.optionsDigital).toBe('boolean');
    expect(typeof getLocalData().localFilters.optionsStrap).toBe('boolean');
    expect(typeof getLocalData().localFilters.optionsBracelet).toBe('boolean');
    expect(typeof getLocalData().localFilters.brandCasio).toBe('boolean');
    expect(typeof getLocalData().localFilters.brandCitizen).toBe('boolean');
    expect(typeof getLocalData().localFilters.brandNorthEdge).toBe('boolean');
    expect(typeof getLocalData().localFilters.brandTagHeuer).toBe('boolean');
    expect(typeof getLocalData().localFilters.brandFossil).toBe('boolean');
    expect(typeof getLocalData().localFilters.priceFrom).toBe('number');
    expect(typeof getLocalData().localFilters.priceMin).toBe('number');
    expect(typeof getLocalData().localFilters.priceTo).toBe('number');
    expect(typeof getLocalData().localFilters.priceMax).toBe('number');
    expect(typeof getLocalData().localFilters.stockFrom).toBe('number');
    expect(typeof getLocalData().localFilters.stockMin).toBe('number');
    expect(typeof getLocalData().localFilters.stockTo).toBe('number');
    expect(typeof getLocalData().localFilters.stockMax).toBe('number');
  });

  test('view should be big when first load', () => {
    expect(getLocalData().localFilters.view).toBe('big');
  });
});
