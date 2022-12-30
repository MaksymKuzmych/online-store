import { watchData } from '../../watch-data/watch-data';
import { imagesListener } from './change-main-image';

export function renderDescription(id: number): HTMLElement {
  const item = watchData[id - 1];
  const description = document.createElement('div');
  const { name, price } = item;

  //change view of item-description for this page
  const text = item.description
    .slice(0, item.description.length - 1)
    .split('; ')
    .map((el) => {
      const arr = el.split(' - ');
      return `${arr[0].toUpperCase()} - [ ${arr[1]} ]`;
    })
    .join(`<br>`);

  description.classList.add('description');
  description.innerHTML = `
    <div class="description__images">
      <img src="./assets/watch-images/${id}/1.jpg" alt="watch-image" class="description__image">
      <img src="./assets/watch-images/${id}/2.jpg" alt="watch-image" class="description__image">
      <img src="./assets/watch-images/${id}/3.jpg" alt="watch-image" class="description__image">
    </div>
    <img src="./assets/watch-images/${id}/1.jpg" alt="watch-image" class="description__main-image">
    <div class="description__info">
      <h3 class="description__name">${name}</h3>
      <p class="description__price">${price} $</p>
      <p class="description__text">${text}</p>
    </div>
    <div class="description__order order">
      <div class="order__quantity-wrapper">
        <p class="order__quantity-text">Quantity: </p> 
        <input type="number" class="order__quantity" min="1" max="99" value="1">
      </div>
      <button class="order_add-to-cart order__btn">Add to cart</button>
      <button class="order_buy-now order__btn">Buy now</button>
    </div>
  `;

  imagesListener(description);

  return description;
}
