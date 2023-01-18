import { ILocalData } from '../interfaces';

export function setLocalData(data: ILocalData): void {
  const { localAmount, localCart, localCounter, localLimit, localPage, localFilters, localPromo } = data;

  if (localAmount || localAmount === 0) {
    localStorage.setItem('amount-os', JSON.stringify(localAmount));
  }
  if (localCart) {
    localStorage.setItem('cart-os', JSON.stringify(localCart));
  }
  if (localCounter || localCounter === 0) {
    localStorage.setItem('counter-os', JSON.stringify(localCounter));
  }
  if (localLimit) {
    localStorage.setItem('limit-os', JSON.stringify(localLimit));
  }
  if (localPage) {
    localStorage.setItem('page-os', JSON.stringify(localPage));
  }
  if (localFilters) {
    localStorage.setItem('filters-os', JSON.stringify(localFilters));
  }
  if (localPromo) {
    localStorage.setItem('promo-os', JSON.stringify(localPromo));
  }
}
