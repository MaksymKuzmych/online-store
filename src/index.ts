import headerHTML from './components/header/header.html';
import footerHTML from './components/footer/footer.html';
import { renderHeader } from './components/header/header';

import './global.scss';

const body = document.querySelector('.body') as HTMLElement;

//Build DOM
body.insertAdjacentHTML('beforeend', headerHTML);
body.insertAdjacentHTML('beforeend', '<main class="main"></main>');
body.insertAdjacentHTML('beforeend', footerHTML);

renderHeader();
