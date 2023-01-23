import { CartItem } from './cart-item';
import { changePage } from './change-page';
import { addPromo } from './add-promo';
import { getLocalData } from '../../utils/get-local-data';
import { openSumbitFormListener } from './checkout';
import { watchData } from '../../watch-data/watch-data';
import { IWatch } from '../../interfaces';

export function renderEmptyCart(): HTMLDivElement {
  const emptyContainer = document.createElement('div');
  emptyContainer.classList.add('empty-container');

  emptyContainer.innerHTML = `
  <h1 class="title-empty">Cart is Empty</h1>
  <img src="./assets/icons/empty-cart.jpg" alt="empty-cart">
  `;
  return emptyContainer;
}

export function renderCart(): void {
  const main = document.querySelector('.main') as HTMLElement;
  const { localLimit, localPage, localCounter, localAmount, localCart } = getLocalData();

  const cart = document.createElement('div');
  cart.classList.add('cart');
  cart.innerHTML = `
  <div class="cart__products">
  <div class="cart__products__title-and-page-control">
    <h2 class="cart__products__title">Products In Cart</h2>
    <div class="cart__products__page-control">
      <div class="cart__products__limit">
        <p class="limit__text">LIMIT:</p>
        <input class="cart__products__limit-input" type="number" name="limit" id="limit" min="1" value="${localLimit}">
      </div>
      <div class="cart__products__pages">
        <p class="pages__text">PAGE:</p>
        <button class="decrese pages-button"><</button>
        <p class="page__number">${localPage}</p>
        <button class="increse pages-button">></button>
      </div>
    </div>
  </div>
  <div class="cart__products__items"></div>
  </div>
  <div class="cart__total">
  <h2 class="cart__total__title">Summary</h2>
  <p class="cart__total__products">Products: <span class="cart__items-counter">${localCounter}</span></p>
  <p class="cart__total__total">Total: $<span class="cart__items-total">${localAmount}</span>.00</p>
  <p class="cart__total__total total__promo"></p>
  <div class="cart__total__applied-codes hide"></div>
  <input class="cart__total__promo-input" type="text" placeholder="Enter promo code">
  <div class="cart__total__found-code"></div>
  <p class="promo__text">Promo for test: 'STORE-RS', 'WATCH4YOU'</p>
  <button class="cart__total__buy-btn">CHECK OUT</button>
  </div>
  `;

  const cartProducts = cart.querySelector('.cart__products__items') as HTMLDivElement;

  localCart.forEach((watchItem, index) => {
    if (watchItem) {
      if (index + 1 > (localPage - 1) * localLimit && index + 1 <= localPage * localLimit) {
        const watch = watchData.find((watch) => watch.id === watchItem.id) as IWatch;
        const itemElement = new CartItem(watch, watchItem.quantity, index);
        cartProducts.appendChild(itemElement.renderCartItem());
      }
    }
  });

  changePage(cart);
  openSumbitFormListener(cart);
  addPromo(cart);

  if (localCart.length === 0) {
    cart.innerHTML = '';
    cart.appendChild(renderEmptyCart());
  }

  main.innerHTML = '';
  main.appendChild(cart);
  location.hash = 'cart';
}
