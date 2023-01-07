import { renderFilters } from '../main-filter/main-filter';
import { renderProductsPage } from '../../templates/render-products-page';
import { filteredArray, chosenBrands } from '../main-filter/filter-products';

export function backToMainListener(headerEl: HTMLElement): void {
  headerEl.addEventListener('click', (event) => {
    const main = document.querySelector('.main') as HTMLElement;
    const itemsArray = chosenBrands.length ? chosenBrands : filteredArray;
    const target = event.target as HTMLElement;

    if (target.classList.contains('header__logo')) {
      main.innerHTML = '';
      main.appendChild(renderFilters());
      renderProductsPage(itemsArray);
    }
  });
}
