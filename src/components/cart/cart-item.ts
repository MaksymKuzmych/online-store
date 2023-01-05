import { IWatch, ICart } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';
import { changeQuantity } from './change-quantity';

export class CartItem {
  item: ICart;
  index: number;

  constructor(item: ICart, index: number) {
    this.item = item;
    this.index = index;
  }

  renderCartItem(): HTMLDivElement {
    const cartItem = document.createElement('div');
    const watch = watchData.find(element => element.id === this.item.id) as IWatch;

    cartItem.classList.add('cart__item');
    cartItem.innerHTML = `
    <div class="cart__item__index">${ this.index + 1 }</div>
    <div class="cart__item__info">
      <img class="cart__item__img" src="./assets/watch-images/${watch.id}/1.jpg" alt="${watch.name}"/>
      <p class="cart__item__name">${ watch.name }</p>
    </div>
    <div class="cart__item__number">
      <div class="cart__item__number__controls">
        <div class="cart__item__inc-dec">
          <button class="cart__item__button decrease" data-id="${ watch.id }">-</button>
          <p class="cart__item__quantity">${ this.item.quantity }</p>
          <button class="cart__item__button increase" data-id="${ watch.id }">+</button>
        </div>
        <p class="cart__item__stock-text">Stock: <span class="cart__item__stock">${ watch.stock }</span></p>
      </div>
      <p class="cart__item__amount-text">$<span class="cart__item__amount">${ watch.price * this.item.quantity }</span>.00</p>
    </div>
    `;

    changeQuantity(cartItem, watch);

    return cartItem;
  }
}
