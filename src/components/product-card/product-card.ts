import { IWatch } from '../../interfaces';
import { addToCartListener } from './add-to-cart';

export class Card {
  item: IWatch;

  constructor(item: IWatch) {
    this.item = item;
  }

  renderCard(): HTMLElement {
    const card = document.createElement('div');
    const { id, name, description, price, stock } = this.item;

    card.classList.add('card');
    card.innerHTML = `
    <div class="card__img-wrapper">
      <img src="./assets/watch-images/${id}/1.jpg" alt="${name}" class="card__img" />
    </div>
    <div class="card__info">
      <h3 class="card__name">${name}</h3>
      <p class="card__description"> ${description}</p>
      <p class="card__price">${price} $</p>
      <p class="card__stock">Stock: ${stock}</p>
    </div>
    <div class="card__options options">
      <button class="options__btn options__btn_add btn" data-id="${id}">Add to Cart</button>
      <button class="options__btn options__btn_details btn" data-id="${id}">Details</button>
    </div>
    `;

    addToCartListener(card, this.item);

    return card;
  }
}
