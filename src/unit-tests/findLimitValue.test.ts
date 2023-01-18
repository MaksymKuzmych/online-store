import { findLimitValue } from '../utils/find-limit-value';
import { IWatch } from '../interfaces';

describe('Find limit value:', () => {
  const data: IWatch[] = [
    {
      id: 8,
      brand: 'Citizen',
      name: 'Citizen AT8234-85A',
      price: 934,
      stock: 47,
      clockFace: 'pointer',
      mount: 'bracelet',
      description:
        "Type - Man's; Movement - Quartz; Dial type - Pointer; Glass - Sapphire; Case shape - Round; Case material - Titanium; Water resistance - 100 m; Strap/bracelet material - Titanium; Housing dimensions (HxW) - 45.00x45.00 mm mm; Weight - 89.00 g;",
    },
    {
      id: 9,
      brand: 'Citizen',
      name: 'Citizen CB0260-81E',
      price: 712,
      stock: 44,
      clockFace: 'pointer',
      mount: 'bracelet',
      description:
        "Type - Man's; Movement - Quartz; Dial type - Pointer; Glass - Sapphire; Case shape - Round; Case material - Titanium; Water resistance - 100 m; Strap/bracelet material - Titanium; Case dimensions (HxW) - 40.00x40.00 mm mm;",
    },
    {
      id: 10,
      brand: 'Citizen',
      name: 'Citizen AS2053-11A',
      price: 573,
      stock: 55,
      clockFace: 'pointer',
      mount: 'strap',
      description:
        "Type - Man's; Movement - Quartz; Dial type - Pointer; Glass - Sapphire; Case shape - Round; Case material - Stainless steel with PVD coating; Water resistance - 100 m; Strap/bracelet material - Genuine leather; Housing dimensions (HxW) - 39.00x39.00 mm mm; Warranty - 12 months;",
    },
  ];

  test('should be defined', () => {
    expect(findLimitValue).toBeDefined();
    expect(findLimitValue).not.toBeUndefined();
  });

  test('should not return NaN', () => {
    expect(findLimitValue(data, 'price', 'max')).not.toBeNaN();
    expect(findLimitValue(data, 'price', 'min')).not.toBeNaN();
    expect(findLimitValue(data, 'stock', 'max')).not.toBeNaN();
    expect(findLimitValue(data, 'stock', 'min')).not.toBeNaN();
  });

  test('should be higher than value', () => {
    expect(findLimitValue(data, 'price', 'min')).toBeGreaterThan(500);
    expect(findLimitValue(data, 'stock', 'min')).toBeGreaterThan(40);
  });

  test('should be lower than value', () => {
    expect(findLimitValue(data, 'price', 'min')).toBeLessThan(1000);
    expect(findLimitValue(data, 'stock', 'min')).toBeLessThan(100);
  });

  test('should find min and max price in array of watches', () => {
    expect(findLimitValue(data, 'price', 'min')).toBe(573);
    expect(findLimitValue(data, 'price', 'max')).toBe(934);
  });

  test('should find min and max stock in array of watches', () => {
    expect(findLimitValue(data, 'stock', 'min')).toBe(44);
    expect(findLimitValue(data, 'stock', 'max')).toBe(55);
  });
});
