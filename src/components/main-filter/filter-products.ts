import { IWatch } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';
import { fillQuantity } from './fill-quantity';
import { renderProductsPage } from '../../templates/render-products-page';
import { sortProducts } from './sort-products';
import { setLocalData } from '../../utils/set-local-data';
import { getLocalData } from '../../utils/get-local-data';
import { findLimitValue } from '../../utils/find-limit-value';
import { setMultirange } from './multirange';
import { setRouting } from '../../utils/set-routing';

export let filteredArray = [...watchData];
export let chosenBrands: IWatch[] = [];
export let finalArray: IWatch[] = [];
export let isBrandChecked = false;
export let isMultirange = true;

function filterOptions(filtersEl: HTMLDivElement): void {
  const local = getLocalData();

  const searchInput = filtersEl.querySelector('.search-bar__input') as HTMLInputElement;
  const pointerOption = filtersEl.querySelector('#clockface-pointer') as HTMLInputElement;
  const digitalOption = filtersEl.querySelector('#clockface-digital') as HTMLInputElement;
  const strapOption = filtersEl.querySelector('#mount-strap') as HTMLInputElement;
  const braceletOption = filtersEl.querySelector('#mount-bracelet') as HTMLInputElement;

  filteredArray = [...watchData];

  if (searchInput.value) {
    filteredArray = filteredArray.filter((watch) => {
      return (
        watch.brand.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        watch.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        String(watch.price).includes(searchInput.value) ||
        String(watch.stock).includes(searchInput.value) ||
        watch.clockFace.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        watch.mount.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        watch.description.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    });
  }

  local.localFilters.search = searchInput.value;

  if (digitalOption.checked && pointerOption.checked) {
    filteredArray = filteredArray.filter((watch) => watch.clockFace === 'digital' || watch.clockFace === 'pointer');
  } else if (pointerOption.checked) {
    filteredArray = filteredArray.filter((watch) => watch.clockFace === 'pointer');
  } else if (digitalOption.checked) {
    filteredArray = filteredArray.filter((watch) => watch.clockFace === 'digital');
  }

  if (strapOption.checked && braceletOption.checked) {
    filteredArray = filteredArray.filter((watch) => watch.mount === 'strap' || watch.mount === 'bracelet');
  } else if (strapOption.checked) {
    filteredArray = filteredArray.filter((watch) => watch.mount === 'strap');
  } else if (braceletOption.checked) {
    filteredArray = filteredArray.filter((watch) => watch.mount === 'bracelet');
  }

  local.localFilters.optionsPointer = pointerOption.checked;
  local.localFilters.optionsDigital = digitalOption.checked;
  local.localFilters.optionsStrap = strapOption.checked;
  local.localFilters.optionsBracelet = braceletOption.checked;

  setLocalData(local);
}

function filterBrands(filtersEl: HTMLDivElement): void {
  const local = getLocalData();

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

  isBrandChecked = false;
  chosenBrands = [];

  brandsCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      chosenBrands = [...chosenBrands, ...filteredArray.filter((watch) => watch.brand === checkbox.dataset.brand)];
      isBrandChecked = true;
    }
  });

  local.localFilters.brandCasio = casioCheckbox.checked;
  local.localFilters.brandCitizen = citizenCheckbox.checked;
  local.localFilters.brandNorthEdge = northEdgeCheckbox.checked;
  local.localFilters.brandSeiko = seikoCheckbox.checked;
  local.localFilters.brandTagHeuer = tagHeuerCheckbox.checked;
  local.localFilters.brandFossil = fossilCheckbox.checked;

  setLocalData(local);
}

function filterRanges(filtersEl: HTMLDivElement): void {
  const local = getLocalData();

  const priceFrom = filtersEl.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const priceTo = filtersEl.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const stockFrom = filtersEl.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const stockTo = filtersEl.querySelector('.slider__to-data__input-stock') as HTMLInputElement;

  if (isMultirange) {
    filteredArray = filteredArray.filter((watch) => {
      return (
        watch.price >= +priceFrom.value &&
        watch.price <= +priceTo.value &&
        watch.stock >= +stockFrom.value &&
        watch.stock <= +stockTo.value
      );
    });
  }

  local.localFilters.priceFrom = +priceFrom.value;
  local.localFilters.priceTo = +priceTo.value;
  local.localFilters.stockFrom = +stockFrom.value;
  local.localFilters.stockTo = +stockTo.value;

  setLocalData(local);
}

export function applyAllFilters(filtersEl: HTMLDivElement): void {
  filterOptions(filtersEl);
  filterRanges(filtersEl);
  filterBrands(filtersEl);
  sortProducts(filtersEl);

  const itemsArray = isBrandChecked ? chosenBrands : filteredArray;

  finalArray = [...itemsArray];

  renderProductsPage(itemsArray);
  fillQuantity(filtersEl, itemsArray);
}

export function setInputValues(filtersEl: HTMLDivElement): void {
  const local = getLocalData();

  local.localFilters.priceMin = local.localFilters.priceFrom = findLimitValue(finalArray, 'price', 'min');
  local.localFilters.priceMax = local.localFilters.priceTo = findLimitValue(finalArray, 'price', 'max');
  local.localFilters.stockMin = local.localFilters.stockFrom = findLimitValue(finalArray, 'stock', 'min');
  local.localFilters.stockMax = local.localFilters.stockTo = findLimitValue(finalArray, 'stock', 'max');

  setLocalData(local);
  setMultirange(filtersEl);
}

export function filterProductsListener(filtersEl: HTMLDivElement): void {
  const allInputs = filtersEl.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

  allInputs.forEach((inputEl) => {
    inputEl.addEventListener(inputEl.type === 'checkbox' ? 'change' : 'input', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('input-number')) {
        isMultirange = true;
        applyAllFilters(filtersEl);
      } else {
        isMultirange = false;
        applyAllFilters(filtersEl);
        setInputValues(filtersEl);
        if (inputEl.type === 'checkbox') {
          setRouting();
        }
      }
    });

    if (inputEl.type === 'search') {
      inputEl.addEventListener('change', () => setRouting());
    }

    if (inputEl.type === 'number') {
      inputEl.addEventListener('change', (event) => {
        const target = event.target as HTMLElement;
        setRouting(false, target);
      });
    }
  });

  filtersEl.addEventListener('mousedown', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('multi-range__btn')) {
      document.addEventListener('mouseup', function applyFiltersListener() {
        isMultirange = true;
        applyAllFilters(filtersEl);
        setRouting(false, target);
        document.removeEventListener('mouseup', applyFiltersListener);
      });
    }
  });
}
