import { ILocalData } from '../interfaces';

export function getLocalData(): ILocalData {
  const localAmount = localStorage.getItem('amount-os');
  const localCart = localStorage.getItem('cart-os');
  const localCounter = localStorage.getItem('counter-os');
  const result: ILocalData = {
    localAmount: 0,
    localCart: [],
    localCounter: 0,
  };

  if (localAmount) {
    result.localAmount = JSON.parse(localAmount);
  }
  if (localCart) {
    result.localCart = JSON.parse(localCart);
  }
  if (localCounter) {
    result.localCounter = JSON.parse(localCounter);
  }

  return result;
}