import { renderFooter } from '../components/footer/footer';

describe('Check footer element:', () => {
  test('should be defined', () => {
    expect(renderFooter).toBeDefined();
  });

  test('should return anything', () => {
    expect(renderFooter()).toBeTruthy();
    expect(renderFooter()).not.toBeUndefined();
  });

  test('should return HTMLElement', () => {
    expect(renderFooter()).toBeInstanceOf(HTMLElement);
  });

  test('should not have class hide', () => {
    expect(renderFooter().classList.contains('hide')).toBe(false);
  });

  test('should contain class footer', () => {
    expect(renderFooter().classList.contains('footer')).toBe(true);
  });
});
