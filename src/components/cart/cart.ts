import { CartItem } from './cart-item';
import { getLocalData } from '../../utils/get-local-data';

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
        <input class="cart__products__limit-input" type="number" name="limit" id="limit" min="1" max="100" value="5">
      </div>
      <div class="cart__products__pages">
        <p class="pages__text">PAGE:</p>
        <button class="decrese pages-button"><</button>
        <p class="page__number">1</p>
        <button class="increse pages-button">></button>
      </div>
    </div>
  </div>
  <div class="cart__products__items"></div>
  </div>
  <div class="cart__total">
  <h2 class="cart__total__title">Summary</h2>
  <p class="cart__total__products">Products: <span class="cart__items-counter">${local.localCounter}</span></p>
  <p class="cart__total__total">Total: $<span class="cart__items-total">${local.localAmount}</span></p>
  <input class="cart__total__promo" type="text" placeholder="Enter promo code">
  <p class="promo__text">Promo for test: 'STORE-RS'</p>
  <button class="cart__total__buy-btn">CHECK OUT</button>
  </div>
  `;
  const cartProducts = cart.querySelector('.cart__products__items') as HTMLDivElement;

  local.localCart.forEach((watchItem, index) => {
    if (watchItem) {
      const itemElement = new CartItem(watchItem, index);
      cartProducts.appendChild(itemElement.renderCartItem());
    }
  });

  if (local.localCart.length === 0) {
    cart.innerHTML = '';
    cart.appendChild(renderEmptyCart());
  }

  main.innerHTML = '';
  main.appendChild(cart);
}