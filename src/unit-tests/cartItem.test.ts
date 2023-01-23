import { CartItem } from '../components/cart/cart-item';

describe('Check cart item class:', () => {
  let data = new CartItem(
    {
      id: 1,
      brand: 'Casio',
      name: 'CASIO MTG-B2000D-1AER',
      price: 1678,
      stock: 11,
      clockFace: 'pointer',
      mount: 'bracelet',
      description:
        'Case color - silvery; Case shape - round; Dial color - black; Indication type - pointer; Glass - sapphire; Assembly factory - Japan; Movement type - quartz; Material - steel; Bracelet / Strap - bracelet; Thickness - 15.9; Style - Sport; Water protection - 200 WR;',
    },
    25,
    2,
  );

  beforeEach(() => {
    data = new CartItem(
      {
        id: 1,
        brand: 'Casio',
        name: 'CASIO MTG-B2000D-1AER',
        price: 1678,
        stock: 11,
        clockFace: 'pointer',
        mount: 'bracelet',
        description:
          'Case color - silvery; Case shape - round; Dial color - black; Indication type - pointer; Glass - sapphire; Assembly factory - Japan; Movement type - quartz; Material - steel; Bracelet / Strap - bracelet; Thickness - 15.9; Style - Sport; Water protection - 200 WR;',
      },
      25,
      2,
    );
  });

  test('should not be null', () => {
    expect(CartItem).not.toBeNull();
  });

  test('should be a class', () => {
    expect(CartItem).toBeInstanceOf(Function);
  });

  test('first argument should be an object', () => {
    expect(data.watch).toBeInstanceOf(Object);
  });
});
