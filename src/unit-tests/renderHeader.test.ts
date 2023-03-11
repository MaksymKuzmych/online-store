import { renderHeader } from '../components/header/header';

describe('Check header element:', () => {
  test('should be defined', () => {
    expect(renderHeader).toBeDefined();
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

  test('should not have class hide', () => {
    expect(renderHeader().classList.contains('hide')).toBe(false);
  });
});
