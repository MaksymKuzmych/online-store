import { IWatch } from '../../interfaces';
import { renderDescription } from '../product-description/product-description';

export function setItemListener(cartItem: HTMLDivElement, watch: IWatch): void {
  cartItem.addEventListener('click', (event) => {
    const main = document.querySelector('.main') as HTMLElement;
    const target = event.target as HTMLElement;

    if (target.classList.contains('cart__item__img') || target.classList.contains('cart__item__name')) {
      main.innerHTML = '';
      main.appendChild(renderDescription(watch.id));
    }
  });
}
