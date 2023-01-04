import { ILocalData } from '../interfaces';

export function setLocalData(data: ILocalData) {
  if (data.localAmount) {
    localStorage.setItem('amount-os', JSON.stringify(data.localAmount));
  }
  if (data.localCart) {
    localStorage.setItem('cart-os', JSON.stringify(data.localCart));
  }
  if (data.localCounter) {
    localStorage.setItem('counter-os', JSON.stringify(data.localCounter));
  }
}