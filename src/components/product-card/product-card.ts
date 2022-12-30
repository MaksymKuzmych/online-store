import { IWatch } from '../../interfaces';

class Card {
  item: IWatch;

  constructor(item: IWatch) {
    this.item = item;
  }

  renderCard(): HTMLElement {
    const card = document.createElement('div');
    const id = this.item.id;
    const imageSrc = `./assets/watch-images/${this.item.id}/1.jpg`;
    const name = this.item.name;
    const description = this.item.description;
    const price = this.item.price;

    card.classList.add('card');
    card.innerHTML = `
    <div class="card__img-wrapper">
      <img src="${imageSrc}" alt="${name}" class="card__img" />
    </div>
    <div class="card__info">
      <h3 class="card__name">${name}</h3>
      <p class="card__description"> ${description}</p>
      <p class="card__price">${price} $</p>
    </div>
    <div class="card__options options">
      <button class="options__btn options__btn_add btn" data-id="${id}">Add to Cart</button>
      <button class="options__btn options__btn_details btn" data-id="${id}">Details</button>
    </div>
    `;

    return card;
  }
}

export default Card;
