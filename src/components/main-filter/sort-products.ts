import { filteredArray, chosenBrands, isBrandChecked } from './filter-products';
import { renderProductsPage } from '../../templates/render-products-page';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';
import { setRouting } from '../../utils/set-routing';

export function sortProductsListener(filtersEl: HTMLDivElement): void {
  const sortSelect = filtersEl.querySelector('#sort') as HTMLSelectElement;
  const { localFilters } = getLocalData();

  sortSelect.value = localFilters.sort;
  sortProducts(filtersEl);

  sortSelect.addEventListener('change', () => {
    sortProducts(filtersEl);
    setRouting();
  });
}

export function sortProducts(filtersEl: HTMLDivElement): void {
  const local = getLocalData();
  const sortSelect = filtersEl.querySelector('#sort') as HTMLSelectElement;
  const itemsArray = isBrandChecked ? chosenBrands : filteredArray;

  local.localFilters.sort = sortSelect.value;
  setLocalData(local);

  switch (sortSelect.value) {
    case 'price-up':
      renderProductsPage(itemsArray.sort((a, b) => a.price - b.price));
      break;
    case 'price-down':
      renderProductsPage(itemsArray.sort((a, b) => b.price - a.price));
      break;
    case 'availability-up':
      renderProductsPage(itemsArray.sort((a, b) => a.stock - b.stock));
      break;
    case 'availability-down':
      renderProductsPage(itemsArray.sort((a, b) => b.stock - a.stock));
      break;
    default:
      renderProductsPage(itemsArray);
  }
}
