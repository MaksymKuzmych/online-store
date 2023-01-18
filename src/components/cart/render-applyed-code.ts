import { IPromocode } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';
import { applyPromocodes } from './apply-promocodes';

export function renderAppliedCode(promocode: IPromocode, cart: HTMLDivElement): HTMLDivElement {
  const promoContainer = document.createElement('div');
  const promoName = document.createElement('span');
  const promoDropButton = document.createElement('button');

  promoContainer.classList.add('cart__total__promocode');
  promoName.classList.add('cart__total__promocode__name');
  promoDropButton.classList.add('cart__total__promocode__drop-btn');

  promoName.innerText = promocode.name;
  promoDropButton.innerText = 'DROP';
  promoDropButton.addEventListener('click', () => {
    const promoInput = cart.querySelector('.cart__total__promo-input') as HTMLInputElement;
    const local = getLocalData();
    promoInput.value = '';
    local.localPromo = local.localPromo.filter((localPromocode) => localPromocode.code !== promocode.code);
    setLocalData(local);
    applyPromocodes(cart);
  });

  promoContainer.appendChild(promoName);
  promoContainer.appendChild(promoDropButton);

  return promoContainer;
}
