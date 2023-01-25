import { getLocalData } from '../../utils/get-local-data';

export function setLimitValue(filtersEl: HTMLDivElement): void {
  const fromPrice = filtersEl.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const toPrice = filtersEl.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const fromStock = filtersEl.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const toStock = filtersEl.querySelector('.slider__to-data__input-stock') as HTMLInputElement;

  const { localFilters } = getLocalData();
  const { priceMin, priceFrom, priceMax, priceTo, stockMin, stockFrom, stockMax, stockTo } = localFilters;

  fromPrice.min = `${priceMin}`;
  fromPrice.value = toPrice.min = `${priceFrom}`;
  toPrice.max = `${priceMax}`;
  toPrice.value = fromPrice.max = `${priceTo}`;
  fromStock.min = `${stockMin}`;
  fromStock.value = toStock.min = `${stockFrom}`;
  toStock.max = `${stockMax}`;
  toStock.value = fromStock.max = `${stockTo}`;
}
