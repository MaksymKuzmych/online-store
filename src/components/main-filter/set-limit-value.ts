import { getLocalData } from '../../utils/get-local-data';

export function setLimitValue(component: HTMLElement): void {
  const fromPrice = component.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const toPrice = component.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const fromStock = component.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const toStock = component.querySelector('.slider__to-data__input-stock') as HTMLInputElement;
  const local = getLocalData();

  fromPrice.min = `${local.localFilters.priceMin}`;
  fromPrice.value = toPrice.min = `${local.localFilters.priceFrom}`;
  toPrice.max = `${local.localFilters.priceMax}`;
  toPrice.value = fromPrice.max = `${local.localFilters.priceTo}`;
  fromStock.min = `${local.localFilters.stockMin}`;
  fromStock.value = toStock.min = `${local.localFilters.stockFrom}`;
  toStock.max = `${local.localFilters.stockMax}`;
  toStock.value = fromStock.max = `${local.localFilters.stockTo}`;
}
