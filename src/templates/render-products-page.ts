import { Card } from '../components/product-card/product-card';
import { IWatch } from '../interfaces';
import { getLocalData } from '../utils/get-local-data';

export function renderProductsPage(items: IWatch[]): void {
  const { localFilters } = getLocalData();
  const main = document.querySelector('main') as HTMLElement;
  const cardsWrapper = document.createElement('div');
  const cardsWrapperEl: HTMLDivElement | null = document.querySelector('.cards-wrapper');

  if (cardsWrapperEl) {
    main.removeChild(cardsWrapperEl);
  }

  cardsWrapper.classList.add('cards-wrapper');

  if (localFilters.view === 'small') {
    cardsWrapper.classList.add('cards-wrapper-small');
  }

  main.appendChild(cardsWrapper);

  if (!items.length) {
    cardsWrapper.innerHTML = '<h2 class="not-found">Products not found</h2>';
  } else {
    items.forEach((watch) => {
      const card = new Card(watch);

      cardsWrapper.appendChild(card.renderCard());
    });
  }
}
