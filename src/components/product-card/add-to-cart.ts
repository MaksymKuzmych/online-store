import { IWatch } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function addToCartListener(cardEl: HTMLDivElement, watch: IWatch): void {
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;
  const addBtn = cardEl.querySelector('.options__btn_add') as HTMLButtonElement;

  addBtn.addEventListener('click', () => {
    const local = getLocalData();
    if (addBtn.innerText === 'Add to Cart') {
      local.localCounter += 1;
      local.localAmount += watch.price;
      local.localCart.push({ id: watch.id, quantity: 1 });

      addBtn.innerText = 'Remove from Cart';
    } else {
      local.localCounter -= 1;
      local.localAmount -= watch.price;
      local.localCart = local.localCart.filter((watchInCart) => watchInCart.id !== watch.id);

      addBtn.innerText = 'Add to Cart';
    }

    cartCounter.innerText = `${local.localCounter}`;
    totalAmount.innerText = `${local.localAmount}`;

    setLocalData(local);
  });
}
