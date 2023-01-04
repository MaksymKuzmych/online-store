import { IWatch } from '../../interfaces';

export function addToCartListener(cardEl: HTMLElement, item: IWatch): void {
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;
  
  cardEl.addEventListener('click', (event): void => {
    const target = event.target as HTMLElement;
    let cartArray: number[] = [];

    if (localStorage.getItem('cart')) {
      localStorage.getItem('cart')?.split(',').forEach(id => cartArray.push(+id));
    }

    if (target.classList.contains('options__btn_add')) {
      if (target.innerText === 'Add to Cart') {
        cartCounter.innerText = String(+cartCounter.innerText + 1);
        target.innerText = 'Remove from Cart';
        totalAmount.innerText = String(+totalAmount.innerText + item.price);
        cartArray.push(item.id);
      } else {
        cartCounter.innerText = String(+cartCounter.innerText - 1);
        target.innerText = 'Add to Cart';
        totalAmount.innerText = String(+totalAmount.innerText - item.price);
        cartArray = cartArray.filter(element => element !== item.id);
      }
      localStorage.setItem('cart', cartArray.toString());
    }
  });
}
