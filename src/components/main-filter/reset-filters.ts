import { setLocalData } from '../../utils/set-local-data';
import { getLocalData } from '../../utils/get-local-data';
import { renderFilters } from './main-filter';
import { renderProductsPage } from '../../templates/render-products-page';
import { watchData } from '../../watch-data/watch-data';
import { findLimitValue } from '../../utils/find-limit-value';

export function resetFiltersListener(filtersEl: HTMLDivElement): void {
  const resetBtn = filtersEl.querySelector('.reset-total__btn-reset') as HTMLButtonElement;

  resetBtn.addEventListener('click', () => {
    resetFilters();
  });
}

export function resetFilters(firstLoad?: boolean): void {
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
    priceFrom: findLimitValue(watchData, 'price', 'min'),
    priceMin: findLimitValue(watchData, 'price', 'min'),
    priceTo: findLimitValue(watchData, 'price', 'max'),
    priceMax: findLimitValue(watchData, 'price', 'max'),
    stockFrom: findLimitValue(watchData, 'stock', 'min'),
    stockMin: findLimitValue(watchData, 'stock', 'min'),
    stockTo: findLimitValue(watchData, 'stock', 'max'),
    stockMax: findLimitValue(watchData, 'stock', 'max'),
  };

  setLocalData(local);

  main.innerHTML = '';
  main.appendChild(renderFilters());

  renderProductsPage(watchData);

  if (!firstLoad) {
    location.hash = '';
  }
}
