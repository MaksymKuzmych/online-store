import { IPromocode } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function addPromo(cart: HTMLDivElement): void {
  const promoInput = cart.querySelector('.cart__total__promo-input') as HTMLInputElement;
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
  const local = getLocalData();

  if (local.localPromo.length) {
    applyPromocodes();
  }

  function renderAppliedCode(promocode: IPromocode): HTMLDivElement {
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
      local.localPromo = local.localPromo.filter((item) => item.code !== promocode.code);
      setLocalData(local);
      applyPromocodes();
    });

    promoContainer.appendChild(promoName);
    promoContainer.appendChild(promoDropButton);

    return promoContainer;
  }

  function applyPromocodes(): void {
    const totalAmount = cart.querySelector('.cart__total__total') as HTMLParagraphElement;
    const totalAmountPromo = cart.querySelector('.total__promo') as HTMLParagraphElement;
    const appliedCodes = cart.querySelector('.cart__total__applied-codes') as HTMLDivElement;
    const local = getLocalData();

    if (!local.localPromo.length) {
      totalAmount.classList.remove('discount');
      totalAmountPromo.innerHTML = '';
      appliedCodes.innerHTML = '';
      appliedCodes.classList.add('hide');
    } else {
      const discount = local.localPromo.reduce((accumulator, promocode) => accumulator - promocode.discount, 1);
      const title = document.createElement('h3');

      title.classList.add('cart__total__applied-codes__title');
      title.innerText = 'Applied codes';
      appliedCodes.innerHTML = '';
      appliedCodes.classList.remove('hide');
      appliedCodes.appendChild(title);
      totalAmount.classList.add('discount');
      totalAmountPromo.innerText = `Total: $${(local.localAmount * discount).toFixed(2)}`;

      local.localPromo.forEach((element) => {
        appliedCodes.appendChild(renderAppliedCode(element));
      });
    }
  }

  function showPromocode(input: HTMLInputElement): void {
    const foundCode = cart.querySelector('.cart__total__found-code') as HTMLDivElement;
    const foundPromo = promocodes.find((value) => value.code === promoInput.value.toUpperCase());

    if (foundPromo) {
      const promoText = document.createElement('span');
      const local = getLocalData();

      promoText.classList.add('cart__total__found-code-text');
      promoText.innerText = foundPromo.name;

      foundCode.innerHTML = '';
      foundCode.appendChild(promoText);

      if (!local.localPromo.some((element) => element.code === foundPromo.code)) {
        const promoButton = document.createElement('button');
        promoButton.classList.add('cart__total__found-code-button');
        promoButton.innerText = 'ADD';
        promoButton.addEventListener('click', () => {
          foundCode.innerHTML = '';
          input.value = '';
          local.localPromo.push(foundPromo);
          setLocalData(local);
          applyPromocodes();
        });

        foundCode.appendChild(promoButton);
      }
    } else {
      foundCode.innerHTML = '';
    }
  }

  promoInput.addEventListener('input', () => showPromocode(promoInput));
}
