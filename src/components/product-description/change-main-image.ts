export function imagesListener(el: HTMLElement): void {
  const mainImage = el.querySelector('.description__main-image') as HTMLImageElement;

  el.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement;

    if (target.className.split(' ').includes('description__image')) {
      mainImage.src = target.src;
    }
  });
}
