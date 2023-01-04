import { renderCart } from '../cart/cart';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';


export function changePage(cart: HTMLDivElement): void {
  const pageDown = cart.querySelector('.decrese') as HTMLButtonElement;
  const pageUp = cart.querySelector('.increse') as HTMLButtonElement;
  const limitInput = cart.querySelector('.cart__products__limit-input') as HTMLInputElement;
  const local = getLocalData();

  pageDown.addEventListener('click', () => {
    if (local.localPage !== 1) {
      local.localPage -= 1;
      setLocalData(local);
      renderCart();
    }
  });

  pageUp.addEventListener('click', () => {
    if (local.localCart.length > local.localLimit * local.localPage) {
      local.localPage += 1;
      setLocalData(local);
      renderCart();
    }
  });

  limitInput.addEventListener('input', () => {
    if (+limitInput.value > 0 && +limitInput.value <= local.localCart.length && !isNaN(+limitInput.value)) {
      if (+limitInput.value * local.localPage > local.localCart.length) {
        local.localPage = Math.ceil(local.localCart.length / +limitInput.value);
      }
      local.localLimit = +limitInput.value;
      setLocalData(local);
      renderCart();
    } else if (+limitInput.value < local.localLimit) {
      local.localLimit = +limitInput.value;
      setLocalData(local);
      renderCart();
    } else {
      limitInput.value = `${local.localLimit}`;
    }
  });
}