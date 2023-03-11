import { renderOrderForm } from '../components/order-submit/order-submit';

describe('Check order form:', () => {
  test('should be defined', () => {
    expect(renderOrderForm).toBeDefined();
  });

  test('should return a HTMLElement', () => {
    expect(renderOrderForm()).toBeInstanceOf(HTMLElement);
  });

  test('should return anything', () => {
    expect(renderOrderForm()).toBeTruthy();
  });

  test('should have class hide', () => {
    expect(renderOrderForm().classList.contains('hide')).toBe(true);
  });
});
