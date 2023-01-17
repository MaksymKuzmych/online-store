import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderOrderForm } from './components/order-submit/order-submit';
import { getRouting, getRoutingListener } from './utils/get-routing';
import { resetFilters } from './components/main-filter/reset-filters';

import './global.scss';

const body = document.querySelector('.body') as HTMLBodyElement;
const main = document.createElement('main');

main.classList.add('main');

body.appendChild(renderHeader());
body.appendChild(main);
body.appendChild(renderFooter());
body.appendChild(renderOrderForm());

getRoutingListener();
if (location.hash) {
  getRouting();
} else {
  resetFilters(true);
}
