import { ILocalData } from '../interfaces';
import { defaultLocalFilters } from './default-local-filters';

export function getLocalData(): ILocalData {
  const localAmount = localStorage.getItem('amount-os');
  const localCart = localStorage.getItem('cart-os');
  const localCounter = localStorage.getItem('counter-os');
  const localLimit = localStorage.getItem('limit-os');
  const localPage = localStorage.getItem('page-os');
  const localFilters = localStorage.getItem('filters-os');
  const localPromo = localStorage.getItem('promo-os');
  const localStorageData: ILocalData = {
    localAmount: 0,
    localCart: [],
    localCounter: 0,
    localLimit: 5,
    localPage: 1,
    localPromo: [],
    localFilters: defaultLocalFilters,
  };

  if (localAmount) {
    localStorageData.localAmount = JSON.parse(localAmount);
  }
  if (localCart) {
    localStorageData.localCart = JSON.parse(localCart);
  }
  if (localCounter) {
    localStorageData.localCounter = JSON.parse(localCounter);
  }
  if (localLimit) {
    localStorageData.localLimit = JSON.parse(localLimit);
  }
  if (localPage) {
    localStorageData.localPage = JSON.parse(localPage);
  }
  if (localFilters) {
    localStorageData.localFilters = JSON.parse(localFilters);
  }
  if (localPromo) {
    localStorageData.localPromo = JSON.parse(localPromo);
  }

  return localStorageData;
}
