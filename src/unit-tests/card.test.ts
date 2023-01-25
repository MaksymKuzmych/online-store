import { Card } from '../components/product-card/product-card';
import { IWatch } from '../interfaces';

describe('Check card class:', () => {
  const mockObj: IWatch = {
    id: 27,
    brand: 'Fossil',
    name: 'Fossil Collider HR',
    price: 433,
    stock: 66,
    clockFace: 'pointer',
    mount: 'bracelet',
    description:
      "Case dimensions - diameter 42 mm; Type - Man's; Movement - Quartz; Fastening type - Bracelet; Glass - Mineral; Case material - Steel; Water resistance - 100 m; Strap/bracelet material - Steel;",
  };

  let data = new Card(mockObj);

  beforeEach(() => {
    data = new Card(mockObj);
  });

  test('should be defined', () => {
    expect(Card).toBeDefined();
    expect(Card).not.toBeUndefined();
  });

  test('should not be null', () => {
    expect(Card).not.toBeNull();
  });

  test('should be a class', () => {
    expect(Card).toBeInstanceOf(Function);
  });

  test('argument should be an object', () => {
    expect(data.watch).toBeInstanceOf(Object);
  });

  test('argument should have theese properties', () => {
    expect(data.watch).toHaveProperty('id');
    expect(data.watch).toHaveProperty('brand');
    expect(data.watch).toHaveProperty('name');
    expect(data.watch).toHaveProperty('price');
    expect(data.watch).toHaveProperty('stock');
    expect(data.watch).toHaveProperty('clockFace');
    expect(data.watch).toHaveProperty('mount');
    expect(data.watch).toHaveProperty('description');
  });

  test('id, price and stock should not be negative', () => {
    expect(data.watch.id).toBeGreaterThanOrEqual(0);
    expect(data.watch.price).toBeGreaterThanOrEqual(0);
    expect(data.watch.stock).toBeGreaterThanOrEqual(0);
  });

  test('clockFace should be pointer or digital', () => {
    expect(data.watch.clockFace).toBe('pointer');
  });

  test('mount should be strap or bracelet', () => {
    expect(data.watch.mount).toBe('bracelet');
  });

  test('description should contain more than 20 letters', () => {
    const descriptionLength = data.watch.description.length;
    expect(descriptionLength).toBeGreaterThan(20);
  });

  test('method should return a HTMLElement', () => {
    expect(data.renderCard()).toBeInstanceOf(HTMLElement);
  });
});
