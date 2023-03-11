import { renderDescription } from '../product-description/product-description';

export function openDetailsListener(cardEl: HTMLElement): void {
  cardEl.addEventListener('click', (event) => {
    const main = document.querySelector('.main') as HTMLElement;
    const target = event.target as HTMLElement;

    if (target.classList.contains('options__btn_details') && target.dataset.id) {
      main.innerHTML = '';
      main.appendChild(renderDescription(+target.dataset.id));
    }
  });
}
