import { IWatch } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';
import { fillQuantity } from './fill-quantity';
import { renderProductsPage } from '../../templates/render-products-page';
import { sortProducts } from './sort-products';

export let filteredArray = watchData;
export let chosenBrands: Array<IWatch> | [] = [];

function filterOptions(filtersEl: HTMLElement) {
  const pointerOption = filtersEl.querySelector('#clockface-pointer') as HTMLInputElement;
  const digitalOption = filtersEl.querySelector('#clockface-digital') as HTMLInputElement;
  const strapOption = filtersEl.querySelector('#mount-strap') as HTMLInputElement;
  const braceletOption = filtersEl.querySelector('#mount-bracelet') as HTMLInputElement;

  filteredArray = watchData;

  //check if at least one is checked in options
  if (pointerOption.checked || digitalOption.checked || strapOption.checked || braceletOption.checked) {
    if (pointerOption.checked && !digitalOption.checked) {
      filteredArray = filteredArray.filter((el) => el.clockFace === 'pointer');
      renderProductsPage(filteredArray);
      fillQuantity(filtersEl, filteredArray);
    }
    if (!pointerOption.checked && digitalOption.checked) {
      filteredArray = filteredArray.filter((el) => el.clockFace === 'digital');
      renderProductsPage(filteredArray);
      fillQuantity(filtersEl, filteredArray);
    }
    if (digitalOption.checked && pointerOption.checked) {
      filteredArray = filteredArray.filter((el) => el.clockFace === 'digital' || el.clockFace === 'pointer');
      renderProductsPage(filteredArray);
      fillQuantity(filtersEl, filteredArray);
    }
    if (strapOption.checked && !braceletOption.checked) {
      filteredArray = filteredArray.filter((el) => el.mount === 'strap');
      renderProductsPage(filteredArray);
      fillQuantity(filtersEl, filteredArray);
    }
    if (!strapOption.checked && braceletOption.checked) {
      filteredArray = filteredArray.filter((el) => el.mount === 'bracelet');
      renderProductsPage(filteredArray);
      fillQuantity(filtersEl, filteredArray);
    }
    if (strapOption.checked && braceletOption.checked) {
      filteredArray = filteredArray.filter((el) => el.mount === 'strap' || el.mount === 'bracelet');
      renderProductsPage(filteredArray);
      fillQuantity(filtersEl, filteredArray);
    }
  } else {
    // if no checks at all in options
    renderProductsPage(filteredArray);
    fillQuantity(filtersEl, filteredArray);
  }
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

  //check if at least one is checked in brands
  chosenBrands = [];

  brandsCheckbox.forEach((el) => {
    if (el.checked) {
      chosenBrands = [...chosenBrands, ...filteredArray.filter((item) => item.brand === el.dataset.brand)];
    }
  });

  if (chosenBrands.length > 0) {
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

export function filterProductsListener(filtersEl: HTMLElement) {
  const allInputs = filtersEl.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
  const multiRangeBtns = filtersEl.querySelectorAll('.multi-range__btn') as NodeListOf<HTMLButtonElement>;

  //for type checkboxes
  allInputs.forEach((el) => {
    el.addEventListener('change', () => {
      filterOptions(filtersEl);
      filterRanges(filtersEl);
      filterBrands(filtersEl);
      sortProducts(filtersEl);
    });
  });

  //for type text or number
  allInputs.forEach((el) => {
    el.addEventListener('input', () => {
      filterOptions(filtersEl);
      filterRanges(filtersEl);
      filterBrands(filtersEl);
      sortProducts(filtersEl);
    });
  });

  // for custom range
  multiRangeBtns.forEach((el) => {
    el.addEventListener('mousedown', () => {
      document.addEventListener('mouseup', function applyFilters() {
        filterOptions(filtersEl);
        filterRanges(filtersEl);
        filterBrands(filtersEl);
        sortProducts(filtersEl);

        document.removeEventListener('mouseup', applyFilters);
      });
    });
  });
}
