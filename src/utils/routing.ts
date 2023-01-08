import { renderCart } from '../components/cart/cart';
import { resetFilters } from '../components/main-filter/reset-filters';
import { renderDescription } from '../components/product-description/product-description';

export function getRoutingListener() {
  window.addEventListener('hashchange', () => {
    getRouting();
  });
}

export function getRouting() {
  if (location.hash === '#cart') {
    renderCart();
  }
  if (location.hash === '') {
    resetFilters();
  }

  if (location.hash.includes('products')) {
    const main = document.querySelector('.main') as HTMLElement;
    const id = location.hash.split('/').reverse()[0];
    main.innerHTML = '';
    main.appendChild(renderDescription(+id));
  }
}
