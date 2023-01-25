import { renderFooter } from '../components/footer/footer';

describe('Check footer element:', () => {
  test('should be defined', () => {
    expect(renderFooter).toBeDefined();
    expect(renderFooter).not.toBeUndefined();
  });

  test('should return anything', () => {
    expect(renderFooter()).toBeTruthy();
  });

  test('should return HTMLElement', () => {
    expect(renderFooter()).toBeInstanceOf(HTMLElement);
  });

  test('should not have class hide', () => {
    expect(renderFooter().classList.contains('hide')).toBe(false);
  });

  test('should have class footer', () => {
    expect(renderFooter().classList.contains('footer')).toBe(true);
  });

  test('should have github container', () => {
    expect(renderFooter().querySelector('.footer__github')).toBeTruthy();
  });

  test('should have rsschool link', () => {
    expect(renderFooter().querySelector('a[href="https://rs.school/js/"]')).toBeTruthy();
  });
});
