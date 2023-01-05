import { Card } from '../components/product-card/product-card';
import { IWatch } from '../interfaces';

export function renderProductsPage(items: IWatch[]): void {
  const main = document.querySelector('main') as HTMLElement;
  const cardsWrapper = document.createElement('div');
  const cardsWrapperEl: HTMLElement | null = document.querySelector('.cards-wrapper');

  if (cardsWrapperEl) {
    main.removeChild(cardsWrapperEl);
  }

  cardsWrapper.classList.add('cards-wrapper');
  main.appendChild(cardsWrapper);

  items.forEach((el) => {
    const card = new Card(el);
    cardsWrapper.appendChild(card.renderCard());
  });
}
