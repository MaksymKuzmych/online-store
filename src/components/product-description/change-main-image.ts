export function imagesListener(descriptionEl: HTMLElement): void {
  const mainImage = descriptionEl.querySelector('.description__main-image') as HTMLImageElement;

  descriptionEl.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement;

    if (target.className.split(' ').includes('description__image')) {
      mainImage.src = target.src;
    }
  });
}
