import { Card } from '../components/product-card/product-card';
import { watchData } from '../watch-data/watch-data';

describe('Check card class:', () => {
  let data = new Card(watchData[0]);

  beforeEach(() => {
    data = new Card(watchData[0]);
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
    expect(data.item).toBeInstanceOf(Object);
  });

  test('method should return a HTMLElement', () => {
    expect(data.renderCard()).toBeInstanceOf(HTMLElement);
  });
});
