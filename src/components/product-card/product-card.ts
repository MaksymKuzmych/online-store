import { IWatch } from '../../interfaces';
import { addToCartListener } from './add-to-cart';
import { getLocalData } from '../../utils/get-local-data';
import { openDetailsListener } from './open-details';

export class Card {
  watch: IWatch;

  constructor(watch: IWatch) {
    this.watch = watch;
  }

  renderCard(): HTMLDivElement {
    const card = document.createElement('div');
    const { id, name, description, price, stock } = this.watch;
    const { localCart, localFilters } = getLocalData();
    const buttonText = localCart.some((watchInCart) => watchInCart.id === id) ? 'Remove from Cart' : 'Add to Cart';

    card.classList.add('card');

    if (localFilters.view === 'small') {
      card.classList.add('card-small');
    }

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
      <button class="options__btn options__btn_add btn" data-id="${id}">${buttonText}</button>
      <button class="options__btn options__btn_details btn" data-id="${id}">Details</button>
    </div>
    `;

    addToCartListener(card, this.watch);
    openDetailsListener(card);

    return card;
  }
}
