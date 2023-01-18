import { CartItem } from '../components/cart/cart-item';

describe('Check cart item class:', () => {
  const mockData = { id: 1, quantity: 25 };
  const mockIndex = 1;
  let data = new CartItem(mockData, mockIndex);

  beforeEach(() => {
    data = new CartItem({ id: 1, quantity: 25 }, 0);
  });

  test('should be defined', () => {
    expect(data).toBeDefined();
    expect(data).not.toBeUndefined();
  });

  test('should not be null', () => {
    expect(CartItem).not.toBeNull();
  });

  test('should be a class', () => {
    expect(CartItem).toBeInstanceOf(Function);
  });

  test('first argument should be an object', () => {
    expect(data.cartItem).toBeInstanceOf(Object);
  });

  test('data item should have theese properties', () => {
    expect(data.cartItem).toHaveProperty('id');
    expect(data.cartItem).toHaveProperty('quantity');
  });

  test('data itemproperties should be theese types', () => {
    expect(typeof data.cartItem.id).toBe('number');
    expect(typeof data.cartItem.id).toBe('number');
  });

  test('data item should not have theese properties', () => {
    expect(data.cartItem).not.toHaveProperty('name');
    expect(data.cartItem).not.toHaveProperty('brand');
    expect(data.cartItem).not.toHaveProperty('description');
  });

  test('id and quantity should not be negative', () => {
    expect(data.cartItem.id).toBeGreaterThanOrEqual(0);
    expect(data.cartItem.quantity).toBeGreaterThanOrEqual(0);
  });
});
