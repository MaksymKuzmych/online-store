import { IWatch } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';
import { renderCart } from '../cart/cart';

export function buyNowListener(descriptionEl: HTMLElement, item: IWatch): void {
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;

  descriptionEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const orderForm = document.querySelector('.order-background') as HTMLElement;
    const addButtonText = descriptionEl.querySelector('.order_add-to-cart') as HTMLElement;
    const local = getLocalData();

    if (target.classList.contains('order_buy-now')) {
      if (addButtonText.innerText === 'Add to Cart') {
        local.localCounter += 1;
        local.localAmount += item.price;
        local.localCart.push({ id: item.id, quantity: 1 });
        addButtonText.innerText = 'Remove from Cart';
      }

      cartCounter.innerText = `${local.localCounter}`;
      totalAmount.innerText = `${local.localAmount}`;

      setLocalData(local);
      renderCart();
      orderForm.classList.remove('hide');
    }
  });
}
