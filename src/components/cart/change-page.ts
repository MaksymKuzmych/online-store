import { renderCart } from '../cart/cart';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function changePage(cart: HTMLDivElement): void {
  const pageDown = cart.querySelector('.decrese') as HTMLButtonElement;
  const pageUp = cart.querySelector('.increse') as HTMLButtonElement;
  const limitInput = cart.querySelector('.cart__products__limit-input') as HTMLInputElement;

  pageDown.addEventListener('click', () => {
    const local = getLocalData();
    if (local.localPage !== 1) {
      local.localPage -= 1;
      setLocalData(local);
      renderCart();
    }
  });

  pageUp.addEventListener('click', () => {
    const local = getLocalData();
    if (local.localCart.length > local.localLimit * local.localPage) {
      local.localPage += 1;
      setLocalData(local);
      renderCart();
    }
  });

  limitInput.addEventListener('input', () => {
    const local = getLocalData();
    if (+limitInput.value > 0 && +limitInput.value <= local.localCart.length) {
      if (+limitInput.value * local.localPage > local.localCart.length) {
        local.localPage = Math.ceil(local.localCart.length / +limitInput.value);
      }
      local.localLimit = +limitInput.value;
      setLocalData(local);
      renderCart();
    } else {
      limitInput.value = `${local.localLimit}`;
    }
  });
}
