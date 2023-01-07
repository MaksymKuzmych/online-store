import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function changeViewListener(filtersEl: HTMLElement): void {
  filtersEl.addEventListener('click', (event) => {
    const allCards = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;
    const cardsWrapper = document.querySelector('.cards-wrapper') as HTMLElement;
    const local = getLocalData();
    const target = event.target as HTMLElement;

    if (target.classList.contains('sort-bar__view-big') || target.classList.contains('sort-bar__view-big-point')) {
      cardsWrapper.classList.remove('cards-wrapper-small');

      allCards.forEach((el) => {
        el.classList.remove('card-small');
      });

      local.localFilters.view = 'big';
      setLocalData(local);
    }

    if (target.classList.contains('sort-bar__view-small') || target.classList.contains('sort-bar__view-small-point')) {
      cardsWrapper.classList.add('cards-wrapper-small');

      allCards.forEach((el) => {
        el.classList.add('card-small');
      });

      local.localFilters.view = 'small';
      setLocalData(local);
    }
  });
}
