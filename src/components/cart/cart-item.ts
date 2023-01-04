import { IWatch } from '../../interfaces';
import { changeQuantity } from './change-quantity';

export class CartItem {
  item: IWatch;
  index: number;

  constructor(item: IWatch, index: number) {
    this.item = item;
    this.index = index;
  }

  renderCartItem(): HTMLDivElement {
    const cartItem = document.createElement('div');
    const { id, name, price, stock } = this.item;

    cartItem.classList.add('cart__item');
    cartItem.innerHTML = `
    <div class="cart__item__index">${ this.index + 1 }</div>
    <div class="cart__item__info">
      <img class="cart__item__img" src="./assets/watch-images/${id}/1.jpg" alt="${name}"/>
      <p class="cart__item__name">${ name }</p>
    </div>
    <div class="cart__item__number">
      <div class="cart__item__number__controls">
        <div class="cart__item__inc-dec">
          <button class="cart__item__button decrease">-</button>
          <p class="cart__item__quantity">1</p>
          <button class="cart__item__button increase">+</button>
        </div>
        <p class="cart__item__stock-text">Stock: <span class="cart__item__stock">${ stock }</span></p>
      </div>
      <p class="cart__item__amount-text">$<span class="cart__item__amount">${ price }.00</span></p>
    </div>
    `;

    changeQuantity(cartItem);

    return cartItem;
  }
}
