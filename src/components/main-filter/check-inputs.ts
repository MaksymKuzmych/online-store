import { getLocalData } from '../../utils/get-local-data';

export function checkInputs(filtersEl: HTMLDivElement): void {
  const { localFilters } = getLocalData();

  const {
    search,
    sort,
    optionsPointer,
    optionsDigital,
    optionsStrap,
    optionsBracelet,
    brandCasio,
    brandCitizen,
    brandNorthEdge,
    brandSeiko,
    brandTagHeuer,
    brandFossil,
    priceFrom,
    priceTo,
    stockFrom,
    stockTo,
  } = localFilters;

  const searchInput = filtersEl.querySelector('.search-bar__input') as HTMLInputElement;
  const sortSelect = filtersEl.querySelector('.sort-bar__select') as HTMLSelectElement;

  const pointerCheckbox = filtersEl.querySelector('#clockface-pointer') as HTMLInputElement;
  const digitalCheckbox = filtersEl.querySelector('#clockface-digital') as HTMLInputElement;
  const strapCheckbox = filtersEl.querySelector('#mount-strap') as HTMLInputElement;
  const braceletCheckbox = filtersEl.querySelector('#mount-bracelet') as HTMLInputElement;

  const casioCheckbox = filtersEl.querySelector('#casio') as HTMLInputElement;
  const citizenCheckbox = filtersEl.querySelector('#citizen') as HTMLInputElement;
  const northEdgeCheckbox = filtersEl.querySelector('#north-edge') as HTMLInputElement;
  const seikoCheckbox = filtersEl.querySelector('#seiko') as HTMLInputElement;
  const tagHeuerCheckbox = filtersEl.querySelector('#tag-heuer') as HTMLInputElement;
  const fossilCheckbox = filtersEl.querySelector('#fossil') as HTMLInputElement;

  const priceFromInput = filtersEl.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const priceToInput = filtersEl.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const stockFromInput = filtersEl.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const stockToInput = filtersEl.querySelector('.slider__to-data__input-stock') as HTMLInputElement;

  searchInput.value = search;
  sortSelect.value = sort;

  pointerCheckbox.checked = optionsPointer;
  digitalCheckbox.checked = optionsDigital;
  strapCheckbox.checked = optionsStrap;
  braceletCheckbox.checked = optionsBracelet;
  casioCheckbox.checked = brandCasio;
  citizenCheckbox.checked = brandCitizen;
  northEdgeCheckbox.checked = brandNorthEdge;
  seikoCheckbox.checked = brandSeiko;
  tagHeuerCheckbox.checked = brandTagHeuer;
  fossilCheckbox.checked = brandFossil;

  priceFromInput.value = String(priceFrom);
  priceToInput.value = String(priceTo);
  stockFromInput.value = String(stockFrom);
  stockToInput.value = String(stockTo);
}
