import { renderEmptyCart } from '../components/cart/cart';

describe('Check empty cart:', () => {
  test('should be defined', () => {
    expect(renderEmptyCart).toBeDefined();
  });

  test('should not be null', () => {
    expect(renderEmptyCart()).not.toBeNull();
  });

  test('should return HTMLElement', () => {
    expect(renderEmptyCart()).toBeInstanceOf(HTMLElement);
  });

  test('should contain class title-empty', () => {
    expect(renderEmptyCart().classList.contains('title-empty')).toBe(true);
  });
});
