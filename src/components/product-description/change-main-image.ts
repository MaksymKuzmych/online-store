export function imagesListener(descriptionEl: HTMLDivElement): void {
  const mainImage = descriptionEl.querySelector('.description__main-image') as HTMLImageElement;

  descriptionEl.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement;

    if (target.classList.contains('description__image')) {
      mainImage.src = target.src;
    }
  });
}
