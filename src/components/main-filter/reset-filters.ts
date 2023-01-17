import { setLocalData } from '../../utils/set-local-data';
import { getLocalData } from '../../utils/get-local-data';
import { renderFilters } from './main-filter';
import { renderProductsPage } from '../../templates/render-products-page';
import { watchData } from '../../watch-data/watch-data';
import { defaultLocalFilters } from '../../utils/default-local-filters';

export function resetFiltersListener(filtersEl: HTMLElement): void {
  filtersEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('reset-total__btn-reset')) {
      resetFilters();
    }
  });
}

export function resetFilters(firstLoad?: boolean): void {
  const main = document.querySelector('.main') as HTMLElement;
  const local = getLocalData();

  local.localFilters = defaultLocalFilters;

  setLocalData(local);

  main.innerHTML = '';
  main.appendChild(renderFilters());
  renderProductsPage(watchData);
  if (!firstLoad) {
    location.hash = '';
  }
}
