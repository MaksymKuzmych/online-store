import { IWatch } from '../interfaces';
import { watchData } from '../watch-data/watch-data';

export function addToCartListener(): void {
  const addToCartBtns = document.querySelectorAll('.options__btn_add') as NodeListOf<HTMLElement>;
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;

  addToCartBtns.forEach((btn) => {
    const item = watchData.find((el) => String(el.id) === btn.dataset.id) as IWatch;

    btn.addEventListener('click', (): void => {
      if (btn.innerHTML === 'Add to Cart') {
        cartCounter.innerHTML = String(+cartCounter.innerHTML + 1);
        btn.innerHTML = 'Remove from Cart';
        totalAmount.innerHTML = String(+totalAmount.innerHTML + item.price);
      } else {
        +cartCounter.innerHTML < 0 ? 0 : (cartCounter.innerHTML = String(+cartCounter.innerHTML - 1));
        btn.innerHTML = 'Add to Cart';
        +totalAmount.innerHTML < 0 ? 0 : (totalAmount.innerHTML = String(+totalAmount.innerHTML - item.price));
      }
    });
  });
}
