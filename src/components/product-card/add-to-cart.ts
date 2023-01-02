import { IWatch } from '../../interfaces';

export function addToCartListener(cardEl: HTMLElement, item: IWatch): void {
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;

  cardEl.addEventListener('click', (event): void => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('options__btn_add')) {
      if (target.innerText === 'Add to Cart') {
        cartCounter.innerText = String(+cartCounter.innerText + 1);
        target.innerText = 'Remove from Cart';
        totalAmount.innerText = String(+totalAmount.innerText + item.price);
      } else {
        cartCounter.innerText = String(+cartCounter.innerText - 1);
        target.innerText = 'Add to Cart';
        totalAmount.innerText = String(+totalAmount.innerText - item.price);
      }
    }
  });
}
