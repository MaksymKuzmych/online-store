export function closeFormListener(orderBackground: HTMLDivElement): void {
  orderBackground.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('order-background')) {
      target.classList.add('hide');
    }
  });
}
