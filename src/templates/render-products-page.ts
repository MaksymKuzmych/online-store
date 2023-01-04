import { Card } from '../components/product-card/product-card';
import { IWatch } from '../interfaces';

export function renderProductsPage(items: Array<IWatch>): void {
  const main = document.querySelector('main') as HTMLElement;
  const cardsWrapper = document.createElement('div');

  if (document.querySelector('.cards-wrapper')) {
    main.removeChild(document.querySelector('.cards-wrapper') as HTMLElement);
  }

  cardsWrapper.classList.add('cards-wrapper');
  main.appendChild(cardsWrapper);

  items.forEach((el) => {
    const card = new Card(el);
    cardsWrapper.appendChild(card.renderCard());
  });
}
