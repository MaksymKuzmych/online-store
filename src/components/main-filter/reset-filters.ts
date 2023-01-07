import { setLocalData } from '../../utils/set-local-data';
import { getLocalData } from '../../utils/get-local-data';
import { renderFilters } from './main-filter';
import { renderProductsPage } from '../../templates/render-products-page';
import { watchData } from '../../watch-data/watch-data';

export function resetFiltersListener(filtersEl: HTMLElement): void {
  filtersEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('reset-total__btn-reset')) {
      resetFilters();
    }
  });
}

export function resetFilters(): void {
  const main = document.querySelector('.main') as HTMLElement;
  const local = getLocalData();

  local.localFilters = {
    search: '',
    sort: 'choose',
    view: 'big',
    optionsPointer: false,
    optionsDigital: false,
    optionsStrap: false,
    optionsBracelet: false,
    brandCasio: false,
    brandCitizen: false,
    brandNorthEdge: false,
    brandSeiko: false,
    brandTagHeuer: false,
    brandFossil: false,
    priceFrom: 68,
    priceMin: 68,
    priceTo: 9293,
    priceMax: 9293,
    stockFrom: 8,
    stockMin: 8,
    stockTo: 112,
    stockMax: 112,
  };

  setLocalData(local);

  main.innerHTML = '';
  main.appendChild(renderFilters());
  renderProductsPage(watchData);
}
