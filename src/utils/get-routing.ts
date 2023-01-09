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
  const main = document.querySelector('.main') as HTMLElement;

  if (location.hash === '') {
    resetFilters();
  } else if (location.hash === '#?') {
    location.hash = '';
  } else if (location.hash.slice(0, 5) === '#cart') {
    renderCart();
  } else if (location.hash.slice(0, 9) === '#products') {
    const id = location.hash.split('/').reverse()[0];
    main.innerHTML = '';
    main.appendChild(renderDescription(+id));
  } else if (
    location.hash.includes('search=') ||
    location.hash.includes('sort=') ||
    location.hash.includes('view=') ||
    location.hash.includes('options=') ||
    location.hash.includes('brands=') ||
    location.hash.includes('price=') ||
    location.hash.includes('stock=')
  ) {
    hashToLocalData();
    main.innerHTML = '';
    main.appendChild(renderFilters());
    const itemsArray = isBrandChecked ? chosenBrands : filteredArray;
    renderProductsPage(itemsArray);
  } else {
    main.innerHTML = '';
    main.appendChild(renderFilters());
    const itemsArray = isBrandChecked ? chosenBrands : filteredArray;
    renderProductsPage(itemsArray);
  }
}
