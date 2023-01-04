export function changeQuantity(item: HTMLDivElement): void {
  item.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const quantity = target.querySelector('.cart__item__quantity') as HTMLParagraphElement;

    if (target.classList.contains('decrease')) {
      if (quantity.innerText === '1') {
        quantity.innerText = `${ +quantity.innerText - 1}`;
      } else {
        quantity.innerText = `${ +quantity.innerText - 1}`;
      }
    } else if (target.classList.contains('increase')) {
      quantity.innerText = `${ +quantity.innerText + 1}`;
    }
  })
}