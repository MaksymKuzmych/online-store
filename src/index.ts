import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderProductsPage } from './templates/render-products-page';

import './global.scss';

const body = document.querySelector('.body') as HTMLBodyElement;
const main = document.createElement('main');

main.classList.add('main');

//Build DOM
body.appendChild(renderHeader());
body.appendChild(main);
body.appendChild(renderFooter());

renderProductsPage();
