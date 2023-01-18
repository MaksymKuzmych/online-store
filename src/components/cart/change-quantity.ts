import { IWatch } from '../../interfaces';
import { renderCart } from '../cart/cart';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function changeQuantity(cartItem: HTMLDivElement, watch: IWatch): void {
  cartItem.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const amount = cartItem.querySelector('.cart__item__amount') as HTMLSpanElement;
    const quantity = cartItem.querySelector('.cart__item__quantity') as HTMLParagraphElement;
    const headerCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
    const headerAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;
    const summaryCounter = document.querySelector('.cart__items-counter') as HTMLSpanElement;
    const summaryAmount = document.querySelector('.cart__items-total') as HTMLSpanElement;
    const local = getLocalData();
    let localItem = local.localCart.find((cartItem) => cartItem.id === watch.id);
    const setInnerText = () => {
      if (!localItem) {
        localItem = { id: 0, quantity: 0 };
      }
      amount.innerText = `${localItem.quantity * watch.price}`;
      quantity.innerText = `${localItem.quantity}`;
      headerCounter.innerText = `${local.localCounter}`;
      summaryCounter.innerText = `${local.localCounter}`;
      headerAmount.innerText = `${local.localAmount}`;
      summaryAmount.innerText = `${local.localAmount}`;
    };

    if (target.classList.contains('decrease')) {
      if (quantity.innerText === '1') {
        local.localCart.splice(
          local.localCart.findIndex((cartItem) => cartItem.id === watch.id),
          1,
        );
        local.localCounter -= 1;
        local.localAmount -= watch.price;
        if (Math.ceil(local.localCart.length / local.localLimit) < local.localPage) {
          local.localPage -= 1;
        }
        setInnerText();
        setLocalData(local);
        renderCart();
      } else {
        local.localCart[local.localCart.findIndex((cartItem) => cartItem.id === watch.id)].quantity -= 1;
        local.localCounter -= 1;
        local.localAmount -= watch.price;
      }
    } else if (target.classList.contains('increase')) {
      if (+quantity.innerText !== watch.stock) {
        local.localCart[local.localCart.findIndex((cartItem) => cartItem.id === watch.id)].quantity += 1;
        local.localCounter += 1;
        local.localAmount += watch.price;
      }
    }
    setInnerText();
    setLocalData(local);
  });
}
