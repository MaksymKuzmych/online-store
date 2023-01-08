import { CartItem } from './cart-item';
import { changePage } from './change-page';
import { addPromo } from './add-promo';
import { getLocalData } from '../../utils/get-local-data';
import { openSumbitFormListener } from './checkout';

function renderEmptyCart(): HTMLElement {
  const empty = document.createElement('h1');
  empty.classList.add('title-empty');
  empty.innerText = 'Cart is Empty';
  return empty;
}

export function renderCart(): void {
  const main = document.querySelector('.main') as HTMLElement;
  const local = getLocalData();

  const cart = document.createElement('div');
  cart.classList.add('cart');
  cart.innerHTML = `
  <div class="cart__products">
  <div class="cart__products__title-and-page-control">
    <h2 class="cart__products__title">Products In Cart</h2>
    <div class="cart__products__page-control">
      <div class="cart__products__limit">
        <p class="limit__text">LIMIT:</p>
        <input class="cart__products__limit-input" type="number" name="limit" id="limit" min="1" value="${local.localLimit}">
      </div>
      <div class="cart__products__pages">
        <p class="pages__text">PAGE:</p>
        <button class="decrese pages-button"><</button>
        <p class="page__number">${local.localPage}</p>
        <button class="increse pages-button">></button>
      </div>
    </div>
  </div>
  <div class="cart__products__items"></div>
  </div>
  <div class="cart__total">
  <h2 class="cart__total__title">Summary</h2>
  <p class="cart__total__products">Products: <span class="cart__items-counter">${local.localCounter}</span></p>
  <p class="cart__total__total">Total: $<span class="cart__items-total">${local.localAmount}</span>.00</p>
  <p class="cart__total__total total__promo"></p>
  <div class="cart__total__applied-codes hide"></div>
  <input class="cart__total__promo-input" type="text" placeholder="Enter promo code">
  <div class="cart__total__found-code"></div>
  <p class="promo__text">Promo for test: 'STORE-RS', 'WATCH4YOU'</p>
  <button class="cart__total__buy-btn">CHECK OUT</button>
  </div>
  `;

  const cartProducts = cart.querySelector('.cart__products__items') as HTMLDivElement;

  local.localCart.forEach((watchItem, index) => {
    if (watchItem) {
      if (index + 1 > (local.localPage - 1) * local.localLimit && index + 1 <= local.localPage * local.localLimit) {
        const itemElement = new CartItem(watchItem, index);
        cartProducts.appendChild(itemElement.renderCartItem());
      }
    }
  });

  changePage(cart);
  openSumbitFormListener(cart);
  addPromo(cart);

  if (local.localCart.length === 0) {
    cart.innerHTML = '';
    cart.appendChild(renderEmptyCart());
  }

  main.innerHTML = '';
  main.appendChild(cart);
  location.hash = 'cart';
}
