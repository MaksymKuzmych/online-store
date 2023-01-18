import { resetFilters } from '../main-filter/reset-filters';

export function backToMainListener(header: HTMLElement): void {
  header.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('header__logo')) {
      resetFilters();
    }
  });
}
