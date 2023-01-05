import { IWatch } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';
import { fillQuantity } from './fill-quantity';
import { renderProductsPage } from '../../templates/render-products-page';
import { sortProducts } from './sort-products';

export let filteredArray = watchData;
export let chosenBrands: IWatch[] | [] = [];

function filterOptions(filtersEl: HTMLElement) {
  const pointerOption = filtersEl.querySelector('#clockface-pointer') as HTMLInputElement;
  const digitalOption = filtersEl.querySelector('#clockface-digital') as HTMLInputElement;
  const strapOption = filtersEl.querySelector('#mount-strap') as HTMLInputElement;
  const braceletOption = filtersEl.querySelector('#mount-bracelet') as HTMLInputElement;

  filteredArray = watchData;

  if (!(pointerOption.checked || digitalOption.checked || strapOption.checked || braceletOption.checked)) {
    renderAndFill(filtersEl);
  }

  if (digitalOption.checked && pointerOption.checked) {
    filteredArray = filteredArray.filter((el) => el.clockFace === 'digital' || el.clockFace === 'pointer');
    renderAndFill(filtersEl);
  } else if (pointerOption.checked) {
    filteredArray = filteredArray.filter((el) => el.clockFace === 'pointer');
    renderAndFill(filtersEl);
  } else if (digitalOption.checked) {
    filteredArray = filteredArray.filter((el) => el.clockFace === 'digital');
    renderAndFill(filtersEl);
  }

  if (strapOption.checked && braceletOption.checked) {
    filteredArray = filteredArray.filter((el) => el.mount === 'strap' || el.mount === 'bracelet');
    renderAndFill(filtersEl);
  } else if (strapOption.checked) {
    filteredArray = filteredArray.filter((el) => el.mount === 'strap');
    renderAndFill(filtersEl);
  } else if (braceletOption.checked) {
    filteredArray = filteredArray.filter((el) => el.mount === 'bracelet');
    renderProductsPage(filteredArray);
    fillQuantity(filtersEl, filteredArray);
  }
}

function renderAndFill(filtersEl: HTMLElement) {
  renderProductsPage(filteredArray);
  fillQuantity(filtersEl, filteredArray);
}

function filterBrands(filtersEl: HTMLElement) {
  const casioCheckbox = filtersEl.querySelector('#casio') as HTMLInputElement;
  const citizenCheckbox = filtersEl.querySelector('#citizen') as HTMLInputElement;
  const northEdgeCheckbox = filtersEl.querySelector('#north-edge') as HTMLInputElement;
  const seikoCheckbox = filtersEl.querySelector('#seiko') as HTMLInputElement;
  const tagHeuerCheckbox = filtersEl.querySelector('#tag-heuer') as HTMLInputElement;
  const fossilCheckbox = filtersEl.querySelector('#fossil') as HTMLInputElement;
  const brandsCheckbox = [
    casioCheckbox,
    citizenCheckbox,
    northEdgeCheckbox,
    seikoCheckbox,
    tagHeuerCheckbox,
    fossilCheckbox,
  ];

  let atLeastOneChecked = false;

  chosenBrands = [];

  brandsCheckbox.forEach((el) => {
    if (el.checked) {
      chosenBrands = [...chosenBrands, ...filteredArray.filter((item) => item.brand === el.dataset.brand)];
      atLeastOneChecked = true;
    }
  });

  if (atLeastOneChecked) {
    renderProductsPage(chosenBrands);
    fillQuantity(filtersEl, chosenBrands);
  }
}

function filterRanges(filtersEl: HTMLElement) {
  const priceFrom = filtersEl.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const priceTo = filtersEl.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const stockFrom = filtersEl.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const stockTo = filtersEl.querySelector('.slider__to-data__input-stock') as HTMLInputElement;

  filteredArray = filteredArray.filter((el) => {
    return (
      el.price >= +priceFrom.value &&
      el.price <= +priceTo.value &&
      el.stock >= +stockFrom.value &&
      el.stock <= +stockTo.value
    );
  });
  renderProductsPage(filteredArray);
  fillQuantity(filtersEl, filteredArray);
}

function applyAllFilters(filtersEl: HTMLElement) {
  filterOptions(filtersEl);
  filterRanges(filtersEl);
  filterBrands(filtersEl);
  sortProducts(filtersEl);
}

export function filterProductsListener(filtersEl: HTMLElement) {
  const allInputs = filtersEl.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

  allInputs.forEach((el) => {
    el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
      applyAllFilters(filtersEl);
    });
  });

  filtersEl.addEventListener('mousedown', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('multi-range__btn')) {
      document.addEventListener('mouseup', function applyFiltersListener() {
        applyAllFilters(filtersEl);
        document.removeEventListener('mouseup', applyFiltersListener);
      });
    }
  });
}
