import { renderOrderForm } from '../components/order-submit/order-submit';

describe('Check order form:', () => {
  test('should be defined', () => {
    expect(renderOrderForm).toBeDefined();
    expect(renderOrderForm).not.toBeUndefined();
  });

  test('should return anything', () => {
    expect(renderOrderForm()).toBeTruthy();
  });

  test('should return a HTMLElement', () => {
    expect(renderOrderForm()).toBeInstanceOf(HTMLElement);
  });

  test('should have class order-background and hide', () => {
    expect(renderOrderForm().classList.contains('order-background')).toBe(true);
    expect(renderOrderForm().classList.contains('hide')).toBe(true);
  });

  test('should have order form inside', () => {
    expect(renderOrderForm().querySelector('form')).toBeTruthy();
  });
});
