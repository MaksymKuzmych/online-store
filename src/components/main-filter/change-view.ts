import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';
import { setRouting } from '../../utils/set-routing';

export function changeViewListener(filtersEl: HTMLDivElement): void {
  filtersEl.addEventListener('click', (event) => {
    const allCards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
    const cardsWrapper = document.querySelector('.cards-wrapper') as HTMLDivElement;
    const local = getLocalData();
    const target = event.target as HTMLElement;

    if (target.classList.contains('sort-bar__view-big') || target.classList.contains('sort-bar__view-big-point')) {
      cardsWrapper.classList.remove('cards-wrapper-small');

      allCards.forEach((card) => {
        card.classList.remove('card-small');
      });

      local.localFilters.view = 'big';

      setLocalData(local);
      setRouting(true);
    }

    if (target.classList.contains('sort-bar__view-small') || target.classList.contains('sort-bar__view-small-point')) {
      cardsWrapper.classList.add('cards-wrapper-small');

      allCards.forEach((card) => {
        card.classList.add('card-small');
      });

      local.localFilters.view = 'small';

      setLocalData(local);
      setRouting(true);
    }
  });
}
