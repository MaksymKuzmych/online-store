import { IWatch } from '../../interfaces';
import { changeQuantity } from './change-quantity';
import { setItemListener } from './set-item-listener';

export class CartItem {
  watch: IWatch;
  quantity: number;
  index: number;

  constructor(watch: IWatch, quantity: number, index: number) {
    this.watch = watch;
    this.quantity = quantity;
    this.index = index;
  }

  renderCartItem(): HTMLDivElement {
    const cartItem = document.createElement('div');
    const { id, name, clockFace, mount, stock, price } = this.watch;

    cartItem.classList.add('cart__item');
    cartItem.innerHTML = `
    <div class="cart__item__index">${this.index + 1}</div>
    <div class="cart__item__info">
      <img class="cart__item__img" src="./assets/watch-images/${id}/1.jpg" alt="${name}"/>
      <p class="cart__item__name">${name}</p>
      <div class="cart__item__description">
        <p class="cart__item__description-text">${clockFace.toUpperCase()}</p>
        <p class="cart__item__description-text">${mount.toUpperCase()}</p>
      </div>
    </div>
    <div class="cart__item__number">
      <div class="cart__item__number__controls">
        <div class="cart__item__inc-dec">
          <button class="cart__item__button decrease" data-id="${id}">-</button>
          <p class="cart__item__quantity">${this.quantity}</p>
          <button class="cart__item__button increase" data-id="${id}">+</button>
        </div>
        <p class="cart__item__stock-text">Stock: <span class="cart__item__stock">${stock}</span></p>
      </div>
      <p class="cart__item__amount-text">$<span class="cart__item__amount">${price * this.quantity}</span>.00</p>
    </div>
    `;

    changeQuantity(cartItem, this.watch);
    setItemListener(cartItem, this.watch);

    return cartItem;
  }
}
