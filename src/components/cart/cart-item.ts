import { IWatch, ICart } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';
import { changeQuantity } from './change-quantity';
import { setItemListener } from './set-item-listener';

export class CartItem {
  cartItem: ICart;
  index: number;

  constructor(cartItem: ICart, index: number) {
    this.cartItem = cartItem;
    this.index = index;
  }

  renderCartItem(): HTMLDivElement {
    const cartItem = document.createElement('div');
    const watch = watchData.find((watch) => watch.id === this.cartItem.id) as IWatch;
    const { id, name, clockFace, mount, stock, price } = watch;

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
          <p class="cart__item__quantity">${this.cartItem.quantity}</p>
          <button class="cart__item__button increase" data-id="${id}">+</button>
        </div>
        <p class="cart__item__stock-text">Stock: <span class="cart__item__stock">${stock}</span></p>
      </div>
      <p class="cart__item__amount-text">$<span class="cart__item__amount">${
        price * this.cartItem.quantity
      }</span>.00</p>
    </div>
    `;

    changeQuantity(cartItem, watch);
    setItemListener(cartItem, watch);

    return cartItem;
  }
}
