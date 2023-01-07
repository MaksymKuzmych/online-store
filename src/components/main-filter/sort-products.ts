import { filteredArray, chosenBrands, isBrandChecked } from './filter-products';
import { renderProductsPage } from '../../templates/render-products-page';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function sortProductsListener(filtersEl: HTMLElement): void {
  const sortSelect = filtersEl.querySelector('#sort') as HTMLSelectElement;
  const local = getLocalData();

  sortSelect.value = local.localFilters.sort;
  sortProducts(filtersEl);

  sortSelect.addEventListener('change', () => {
    sortProducts(filtersEl);
  });
}

export function sortProducts(filtersEl: HTMLElement): void {
  const local = getLocalData();
  const sortSelect = filtersEl.querySelector('#sort') as HTMLSelectElement;
  const itemsArray = isBrandChecked ? chosenBrands : filteredArray;

  local.localFilters.sort = sortSelect.value;
  setLocalData(local);

  if (sortSelect.value === 'price-up') {
    renderProductsPage(itemsArray.sort((a, b) => a.price - b.price));
  } else if (sortSelect.value === 'price-down') {
    renderProductsPage(itemsArray.sort((a, b) => b.price - a.price));
  } else if (sortSelect.value === 'availability-up') {
    renderProductsPage(itemsArray.sort((a, b) => a.stock - b.stock));
  } else if (sortSelect.value === 'availability-down') {
    renderProductsPage(itemsArray.sort((a, b) => b.stock - a.stock));
  } else {
    renderProductsPage(itemsArray);
  }
}
