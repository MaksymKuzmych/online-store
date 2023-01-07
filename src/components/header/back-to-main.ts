import { resetFilters } from '../main-filter/reset-filters';

export function backToMainListener(headerEl: HTMLElement): void {
  headerEl.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('header__logo')) {
      resetFilters();
    }
  });
}
