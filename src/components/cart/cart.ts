import { watchData } from '../../watch-data/watch-data';
import { CartItem } from './cart-item';

// function renderEmptyCart(): HTMLElement {
//   const empty = document.createElement('h1');
//   empty.classList.add('title-empty');
//   empty.innerText = 'Cart is Empty';
//   return empty;
// }

export function renderCart(): void {
  const main = document.querySelector('.main') as HTMLElement;
  const total = document.querySelector('.purchases__amount_number') as HTMLSpanElement;
  const products = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  

  const cartItems: number[] = [];

  if (localStorage.getItem('cart')) {
    localStorage.getItem('cart')?.split(',').forEach(id => cartItems.push(+id));
  }
  
  const cart = document.createElement('div');
  cart.classList.add('cart');
  cart.innerHTML = `
  <div class="cart__products">
  <div class="cart__products__title-and-page-control">
    <h2 class="cart__products__title">Products In Cart</h2>
    <div class="cart__products__page-control">
      <div class="cart__products__limit">
        <p class="limit__text">LIMIT:</p>
        <input class="cart__products__limit-input" type="number" name="limit" id="limit" min="1" max="10" value="3">
      </div>
      <div class="cart__products__pages">
        <p class="pages-text">PAGE:</p>
        <button class="decrese-pages"><</button>
        <span>1</span>
        <button class="increse-pages">></button>
      </div>
    </div>
  </div>
  <div class="cart__products__items"></div>
  </div>
  <div class="cart__total">
  <h2 class="cart__total__title">Summary</h2>
  <p class="cart__total__products">Products: <span class="cart__items-counter">${products.innerText}</span></p>
  <p class="cart__total__total">Total: $<span class="cart__items-total">${total.innerText}</span></p>
  <input class="cart__total__promo" type="text" placeholder="Enter promo code">
  <p class="promo__text">Promo for test: 'STORE-RS'</p>
  <button class="cart__total__buy-btn">CHECK OUT</button>
  </div>
  `;
  const cartProducts = cart.querySelector('.cart__products__items') as HTMLDivElement;

  cartItems.map(item => watchData.find(watch => watch.id === item)).forEach((watchItem, index) => {
    if (watchItem) {
      const itemElement = new CartItem(watchItem, index);
      cartProducts.appendChild(itemElement.renderCartItem());
    }
  });

  // const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  // if (cartCounter.innerText === '0') {
  //   cart.innerHTML = '';
  //   cart.appendChild(renderEmptyCart());
  // }

  main.innerHTML = '';
  main.appendChild(cart);
}