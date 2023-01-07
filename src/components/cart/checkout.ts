export function openSumbitFormListener(cart: HTMLElement): void {
  cart.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const orderForm = document.querySelector('.order-background') as HTMLElement;

    if (target.classList.contains('cart__total__buy-btn')) {
      orderForm.classList.remove('hide');
    }
  });
}
