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

  const itemsArray = chosenBrands.length ? chosenBrands : filteredArray;

  if (sortSelect.value === 'price-up') {
    renderProductsPage(itemsArray.sort((a, b) => a.price - b.price));
  }
  if (sortSelect.value === 'price-down') {
    renderProductsPage(itemsArray.sort((a, b) => b.price - a.price));
  }
  if (sortSelect.value === 'availability-up') {
    renderProductsPage(itemsArray.sort((a, b) => a.stock - b.stock));
  }
  if (sortSelect.value === 'availability-down') {
    renderProductsPage(itemsArray.sort((a, b) => b.stock - a.stock));
  }
}
