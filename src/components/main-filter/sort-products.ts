import { IWatch } from '../../interfaces';
import { filteredArray, chosenBrands } from './filter-products';
import { renderProductsPage } from '../../templates/render-products-page';

export function sortProductsListener(filtersEl: HTMLElement) {
  const sortSelect = filtersEl.querySelector('#sort') as HTMLSelectElement;

  sortSelect.addEventListener('change', () => {
    sortProducts(filtersEl);
  });
}

export function sortProducts(filtersEl: HTMLElement) {
  const sortSelect = filtersEl.querySelector('#sort') as HTMLSelectElement;

  const itemsArray = chosenBrands.length > 0 ? chosenBrands : filteredArray;

  if (sortSelect.value === 'price-up') {
    renderProductsPage(itemsArray.sort((a: IWatch, b: IWatch) => a.price - b.price));
  }
  if (sortSelect.value === 'price-down') {
    renderProductsPage(itemsArray.sort((a: IWatch, b: IWatch) => b.price - a.price));
  }
  if (sortSelect.value === 'availability-up') {
    renderProductsPage(itemsArray.sort((a: IWatch, b: IWatch) => a.stock - b.stock));
  }
  if (sortSelect.value === 'availability-down') {
    renderProductsPage(itemsArray.sort((a: IWatch, b: IWatch) => b.stock - a.stock));
  }
}
