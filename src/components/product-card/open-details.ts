import { renderDescription } from '../product-description/product-description';

export function openDetailsListener(cardEl: HTMLDivElement): void {
  const optionsBtn = cardEl.querySelector('.options__btn_details') as HTMLButtonElement;
  const main = document.querySelector('.main') as HTMLElement;

  optionsBtn.addEventListener('click', () => {
    if (optionsBtn.dataset.id) {
      main.innerHTML = '';
      main.appendChild(renderDescription(+optionsBtn.dataset.id));
    }
  });
}
