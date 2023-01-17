import { IPromocode } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';
import { applyPromocodes } from './apply-promocodes';

export function showPromocode(input: HTMLInputElement, cart: HTMLDivElement): void {
  const promocodes: IPromocode[] = [
    {
      code: 'STORE-RS',
      name: 'Rolling Scopes School - 10%',
      discount: 0.1,
    },
    {
      code: 'WATCH4YOU',
      name: 'Watch For You - 15%',
      discount: 0.15,
    },
  ];
  const foundCode = cart.querySelector('.cart__total__found-code') as HTMLDivElement;
  const foundPromo = promocodes.find((value) => value.code === input.value.toUpperCase());

  if (foundPromo) {
    const promoText = document.createElement('span');
    const local = getLocalData();

    promoText.classList.add('cart__total__found-code-text');
    promoText.innerText = foundPromo.name;

    foundCode.innerHTML = '';
    foundCode.appendChild(promoText);

    if (!local.localPromo.some((localPromocode) => localPromocode.code === foundPromo.code)) {
      const promoButton = document.createElement('button');
      promoButton.classList.add('cart__total__found-code-button');
      promoButton.innerText = 'ADD';
      promoButton.addEventListener('click', () => {
        foundCode.innerHTML = '';
        input.value = '';
        local.localPromo.push(foundPromo);
        setLocalData(local);
        applyPromocodes(cart);
      });

      foundCode.appendChild(promoButton);
    }
  } else {
    foundCode.innerHTML = '';
  }
}
