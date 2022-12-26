import { watchData } from '../watch-data/watch-data';
import Card from '../components/product-card/product-card';

export function renderProductsPage(): void {
  const main = document.querySelector('main') as HTMLElement;
  const cardsWrapper = document.createElement('div');

  cardsWrapper.classList.add('cards-wrapper');
  main.appendChild(cardsWrapper);

  watchData.forEach((el) => {
    const card = new Card(el);
    cardsWrapper.appendChild(card.renderCard());
  });
}
