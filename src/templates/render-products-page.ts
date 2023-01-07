import { Card } from '../components/product-card/product-card';
import { IWatch } from '../interfaces';
import { getLocalData } from '../utils/get-local-data';
import { setLocalData } from '../utils/set-local-data';

export function renderProductsPage(items: IWatch[]): void {
  const local = getLocalData();
  const main = document.querySelector('main') as HTMLElement;
  const cardsWrapper = document.createElement('div');
  const cardsWrapperEl: HTMLElement | null = document.querySelector('.cards-wrapper');

  if (cardsWrapperEl) {
    main.removeChild(cardsWrapperEl);
  }

  cardsWrapper.classList.add('cards-wrapper');

  if (local.localFilters.view === 'small') {
    cardsWrapper.classList.add('cards-wrapper-small');
  }

  main.appendChild(cardsWrapper);

  if (!items.length) {
    cardsWrapper.innerHTML = '<h2 class="not-found">Products not found</h2>';
  } else {
    const arrayForSort = [...items];

    //for set to localStorage min and max value of price and stock sorted array (for multirange behavior)
    const sortedArrByPrice = arrayForSort.sort((a, b) => a.price - b.price);
    local.localFilters.priceMin = sortedArrByPrice[0].price;
    local.localFilters.priceMax = sortedArrByPrice[sortedArrByPrice.length - 1].price;

    const sortedArrByStock = arrayForSort.sort((a, b) => a.stock - b.stock);
    local.localFilters.stockMin = sortedArrByStock[0].stock;
    local.localFilters.stockMax = sortedArrByStock[sortedArrByStock.length - 1].stock;

    setLocalData(local);

    items.forEach((el) => {
      const card = new Card(el);
      cardsWrapper.appendChild(card.renderCard());
    });
  }
}
