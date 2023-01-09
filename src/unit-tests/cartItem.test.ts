import { CartItem } from '../components/cart/cart-item';

describe('Check cart item class:', () => {
  let data = new CartItem({ id: 1, quantity: 25 }, 0);

  beforeEach(() => {
    data = new CartItem({ id: 1, quantity: 25 }, 0);
  });

  test('should not be null', () => {
    expect(CartItem).not.toBeNull();
  });

  test('should be a class', () => {
    expect(CartItem).toBeInstanceOf(Function);
  });

  test('first argument should be an object', () => {
    expect(data.item).toBeInstanceOf(Object);
  });
});
