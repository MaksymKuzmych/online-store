export function renderHeader(): HTMLElement {
  const header = document.createElement('header');

  // here will be getter from localStorage or 0 during render
  const purchasesAmount = 0;
  const purchasesCounter = 0;

  header.classList.add('header');
  header.innerHTML = `
  <img src="./assets/icons/Watch4You.svg" alt="Logo" class="header__logo" />
  <div class="header__purchases purchases">
    <p class="purchases__amount">Total amount: ${purchasesAmount} $</p>
    <div class="purchases__quantity">
      <button class="purchases__btn btn">
        <img src="./assets/icons/cart.svg" alt="cart" class="purchases__logo" />
      </button>
      <p class="purchases__counter">${purchasesCounter}</p>
    </div>
  </div>
  `;
  return header;
}
