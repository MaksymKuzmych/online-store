import { renderCart } from '../components/cart/cart';
import { chosenBrands, filteredArray, isBrandChecked } from '../components/main-filter/filter-products';
import { renderFilters } from '../components/main-filter/main-filter';
import { resetFilters } from '../components/main-filter/reset-filters';
import { renderDescription } from '../components/product-description/product-description';
import { renderProductsPage } from '../templates/render-products-page';
import { hashToLocalData } from './hash-to-local-data';

export function getRoutingListener() {
  window.addEventListener('hashchange', () => {
    getRouting();
  });
}

export function getRouting() {
  if (location.hash === '') {
    resetFilters();
  }
  if (location.hash === '#cart') {
    renderCart();
  }
  if (location.hash.includes('products')) {
    const main = document.querySelector('.main') as HTMLElement;
    const id = location.hash.split('/').reverse()[0];
    main.innerHTML = '';
    main.appendChild(renderDescription(+id));
  }
  if (
    location.hash.includes('search=') ||
    location.hash.includes('sort=') ||
    location.hash.includes('view=') ||
    location.hash.includes('options=') ||
    location.hash.includes('brands=') ||
    location.hash.includes('price=') ||
    location.hash.includes('brands=')
  ) {
    const main = document.querySelector('.main') as HTMLElement;
    hashToLocalData();
    main.innerHTML = '';
    main.appendChild(renderFilters());
    const itemsArray = isBrandChecked ? chosenBrands : filteredArray;
    renderProductsPage(itemsArray);
  }
}
