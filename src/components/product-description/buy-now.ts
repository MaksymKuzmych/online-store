import { IWatch } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';
import { renderCart } from '../cart/cart';

export function buyNowListener(descriptionEl: HTMLDivElement, watch: IWatch): void {
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;
  const buyNowBtn = descriptionEl.querySelector('.order_buy-now') as HTMLButtonElement;

  buyNowBtn.addEventListener('click', () => {
    const orderForm = document.querySelector('.order-background') as HTMLDivElement;
    const addBtn = descriptionEl.querySelector('.order_add-to-cart') as HTMLButtonElement;
    const local = getLocalData();

    if (addBtn.innerText === 'Add to Cart') {
      local.localCounter += 1;
      local.localAmount += watch.price;
      local.localCart.push({ id: watch.id, quantity: 1 });

      addBtn.innerText = 'Remove from Cart';
    }

    cartCounter.innerText = `${local.localCounter}`;
    totalAmount.innerText = `${local.localAmount}`;

    setLocalData(local);
    renderCart();

    orderForm.classList.remove('hide');
  });
}
