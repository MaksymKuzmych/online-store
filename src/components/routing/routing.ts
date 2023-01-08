import { renderCart } from '../cart/cart';
import { resetFilters } from '../main-filter/reset-filters';

export function getRouting() {
  window.addEventListener('hashchange', () => {
    console.log(location.hash);
    if (location.hash === '#cart') {
      renderCart();
    }
    if (location.hash === '') {
      resetFilters();
    }
  });
  if (location.hash === '#cart') {
    renderCart();
  }
}
