import { renderCart } from '../cart/cart';
import { getLocalData } from '../../utils/get-local-data';
export function renderHeader(): HTMLElement {
  const header = document.createElement('header');

  const local = getLocalData();

  header.classList.add('header');
  header.innerHTML = `
  <img src="./assets/icons/Watch4You.svg" alt="Logo" class="header__logo" />
  <div class="header__purchases purchases">
    <p class="purchases__amount">Total amount: <span class="purchases__amount_number">${ local.localAmount }</span> $</p>
    <div class="purchases__quantity">
      <button class="purchases__btn btn">
        <img src="./assets/icons/cart.svg" alt="cart" class="purchases__logo" />
      </button>
      <p class="purchases__counter">${ local.localCounter }</p>
    </div>
  </div>
  `;

  const cartButton = header.querySelector(".purchases__btn") as HTMLButtonElement;
  cartButton.addEventListener('click', renderCart);
  return header;
}
