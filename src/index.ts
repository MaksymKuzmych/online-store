import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderFilters } from './components/main-filter/main-filter';
import { renderProductsPage } from './templates/render-products-page';
import { renderOrderForm } from './components/order-submit/order-submit';
import { filteredArray, chosenBrands } from './components/main-filter/filter-products';

import './global.scss';

const body = document.querySelector('.body') as HTMLBodyElement;
const main = document.createElement('main');

main.classList.add('main');

//Build DOM
body.appendChild(renderHeader());
body.appendChild(main);
body.appendChild(renderFooter());
body.appendChild(renderOrderForm());

main.appendChild(renderFilters());

const itemsArray = chosenBrands.length ? chosenBrands : filteredArray;

renderProductsPage(itemsArray);
