import { renderHeader } from './components/header/header';
import { renderFooter } from './components/footer/footer';
import { renderFilters } from './components/main-filter/main-filter';
import { setMultirange } from './components/main-filter/multirange';


import './global.scss';

const body = document.querySelector('.body') as HTMLElement;
const main = document.createElement('main');

main.classList.add('main');

main.appendChild(renderFilters());

//Build DOM
body.appendChild(renderHeader());
body.appendChild(main);
body.appendChild(renderFooter());

setMultirange();