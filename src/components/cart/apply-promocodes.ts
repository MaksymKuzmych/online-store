import { getLocalData } from '../../utils/get-local-data';
import { renderAppliedCode } from './render-applyed-code';

export function applyPromocodes(cart: HTMLDivElement): void {
  const totalAmount = cart.querySelector('.cart__total__total') as HTMLParagraphElement;
  const totalAmountPromo = cart.querySelector('.total__promo') as HTMLParagraphElement;
  const appliedCodes = cart.querySelector('.cart__total__applied-codes') as HTMLDivElement;
  const { localPromo, localAmount } = getLocalData();

  if (!localPromo.length) {
    totalAmount.classList.remove('discount');
    totalAmountPromo.innerHTML = '';
    appliedCodes.innerHTML = '';
    appliedCodes.classList.add('hide');
  } else {
    const discount = localPromo.reduce((totalDiscount, promocode) => totalDiscount - promocode.discount, 1);
    const title = document.createElement('h3');

    title.classList.add('cart__total__applied-codes__title');
    title.innerText = 'Applied codes';
    appliedCodes.innerHTML = '';
    appliedCodes.classList.remove('hide');
    appliedCodes.appendChild(title);
    totalAmount.classList.add('discount');
    totalAmountPromo.innerText = `Total: $${(localAmount * discount).toFixed(2)}`;

    localPromo.forEach((localPromocode) => {
      appliedCodes.appendChild(renderAppliedCode(localPromocode, cart));
    });
  }
}
