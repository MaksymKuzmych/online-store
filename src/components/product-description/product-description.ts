import { watchData } from '../../watch-data/watch-data';
import { imagesListener } from './change-main-image';
import { getLocalData } from '../../utils/get-local-data';
import { addToCartListener } from '../product-card/add-to-cart';
import { buyNowListener } from './buy-now';

export function renderDescription(id: number): HTMLDivElement {
  const descriptionEl = document.createElement('div');
  const watch = watchData[id - 1];
  const { name, price, brand, clockFace, mount, description } = watch;
  const { localCart } = getLocalData();
  const buttonText = localCart.some((watchInCart) => watchInCart.id === id) ? 'Remove from Cart' : 'Add to Cart';

  //change view of item-description for this page
  const text = description
    .slice(0, description.length - 1)
    .split('; ')
    .map((option) => {
      const splitOption = option.split(' - ');
      return `${splitOption[0].toUpperCase()} - [ ${splitOption[1]} ]`;
    })
    .join(`<br>`);

  descriptionEl.classList.add('description');
  descriptionEl.innerHTML = `
  <p class="description__crumbs">STORE > ${clockFace.toUpperCase()} > ${mount.toUpperCase()} > ${brand.toUpperCase()} > ${name.toUpperCase()}</p>
  <div class="description__wrapper">
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
      <button class="order_add-to-cart order__btn options__btn_add">${buttonText}</button>
      <button class="order_buy-now order__btn">Buy now</button>
    </div>
  </div>
  `;

  imagesListener(descriptionEl);
  addToCartListener(descriptionEl, watch);
  buyNowListener(descriptionEl, watch);
  location.hash = `products/${brand.toLowerCase()}/${id}`;

  return descriptionEl;
}
