import { getLocalData } from '../../utils/get-local-data';
import { applyPromocodes } from './apply-promocodes';
import { showPromocode } from './show-promocode';

export function addPromo(cart: HTMLDivElement): void {
  const promoInput = cart.querySelector('.cart__total__promo-input') as HTMLInputElement;
  const { localPromo } = getLocalData();

  if (localPromo.length) {
    applyPromocodes(cart);
  }

  promoInput.addEventListener('input', () => showPromocode(promoInput, cart));
}
