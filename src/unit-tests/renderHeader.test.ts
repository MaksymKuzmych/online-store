import { renderHeader } from '../components/header/header';

describe('Check header element:', () => {
  test('should be defined', () => {
    expect(renderHeader).toBeDefined();
    expect(renderHeader).not.toBeUndefined();
  });

  test('should not be null', () => {
    expect(renderHeader()).not.toBeNull();
  });

  test('should return anything', () => {
    expect(renderHeader()).toBeTruthy();
  });

  test('should return HTMLElement', () => {
    expect(renderHeader()).toBeInstanceOf(HTMLElement);
  });

  test('should have class header', () => {
    expect(renderHeader().classList.contains('header')).toBe(true);
  });

  test('should not have class hide', () => {
    expect(renderHeader().classList.contains('hide')).toBe(false);
  });

  test('should have back button', () => {
    expect(renderHeader().querySelector('.header__back')).toBeTruthy();
  });

  test('should have amount of purchases', () => {
    expect(renderHeader().querySelector('.purchases__amount')).toBeTruthy();
  });

  test('should have button for redirect to cart', () => {
    expect(renderHeader().querySelector('.purchases__btn')).toBeTruthy();
  });

  test('should have counter of goods', () => {
    expect(renderHeader().querySelector('.purchases__counter')).toBeTruthy();
  });
});
