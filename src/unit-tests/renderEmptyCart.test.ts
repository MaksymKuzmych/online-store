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

  test('should have class empty', () => {
    expect(renderEmptyCart().classList.contains('empty-container')).toBe(true);
  });

  test('should have image', () => {
    expect(renderEmptyCart().querySelector('img')).toBeTruthy();
  });

  test('should return this innerHTML', () => {
    expect(renderEmptyCart().innerHTML).toEqual(`
  <h1 class="title-empty">Cart is Empty</h1>
  <img src="./assets/icons/empty-cart.jpg" alt="empty-cart">
  `);
  });
});
