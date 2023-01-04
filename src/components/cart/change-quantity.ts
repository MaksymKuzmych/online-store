import { IWatch } from '../../interfaces';
import { renderCart } from '../cart/cart';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function addChangeQuantityListener(item: HTMLDivElement, watch: IWatch): void {
  item.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const quantity = item.querySelector('.cart__item__quantity') as HTMLParagraphElement;
    const amount = item.querySelector('.cart__item__amount') as HTMLSpanElement;
    const local = getLocalData();
    let localItem = local.localCart.find(element => element.id === watch.id);
    if (!localItem) {
      localItem = {id: 0, quantity: 0};
    }

    if (target.classList.contains('decrease')) {
      if (quantity.innerText === '1') {
        local.localCart.splice(local.localCart.findIndex(element => element.id === watch.id), 1);
        setLocalData(local);
        renderCart();
      } else {
        quantity.innerText = `${ localItem.quantity - 1 }`;
        local.localCart[local.localCart.findIndex(element => element.id === watch.id)].quantity -= 1;
        local.localCounter -= 1;
        amount.innerText = `${ (localItem.quantity - 1) * watch.price }`;
        local.localAmount -= watch.price;
      }
    } else if (target.classList.contains('increase')) {
      if (+quantity.innerText !== watch.stock) {
        quantity.innerText = `${ localItem.quantity + 1 }`;
        local.localCart[local.localCart.findIndex(element => element.id === watch.id)].quantity += 1;
        local.localCounter += 1;
        amount.innerText = `${ (localItem.quantity + 1) * watch.price }`;
        local.localAmount += watch.price;
      }
    }
    setLocalData(local);
  })
}