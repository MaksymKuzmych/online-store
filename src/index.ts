import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderFilters } from './components/main-filter/main-filter';
import { renderProductsPage } from './templates/render-products-page';
import { renderOrderForm } from './components/order-submit/order-submit';
import { filteredArray, chosenBrands, isBrandChecked } from './components/main-filter/filter-products';
import { getRouting, getRoutingListener } from './utils/get-routing';

import './global.scss';
import { resetFilters } from './components/main-filter/reset-filters';

const body = document.querySelector('.body') as HTMLBodyElement;
const main = document.createElement('main');

main.classList.add('main');

//Build DOM
body.appendChild(renderHeader());
body.appendChild(main);
body.appendChild(renderFooter());
body.appendChild(renderOrderForm());

if (location.hash) {
  getRouting();
  getRoutingListener();

  main.innerHTML = '';
  main.appendChild(renderFilters());

  const itemsArray = isBrandChecked ? chosenBrands : filteredArray;

  renderProductsPage(itemsArray);
} else {
  resetFilters(true);
}
