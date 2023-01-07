import { ILocalData } from '../interfaces';

export function getLocalData(): ILocalData {
  const localAmount = localStorage.getItem('amount-os');
  const localCart = localStorage.getItem('cart-os');
  const localCounter = localStorage.getItem('counter-os');
  const localLimit = localStorage.getItem('limit-os');
  const localPage = localStorage.getItem('page-os');
  const localFilters = localStorage.getItem('filters-os');
  const localStorageData: ILocalData = {
    localAmount: 0,
    localCart: [],
    localCounter: 0,
    localLimit: 5,
    localPage: 1,
    localFilters: {
      search: '',
      sort: 'choose',
      view: 'big',
      optionsPointer: false,
      optionsDigital: false,
      optionsStrap: false,
      optionsBracelet: false,
      brandCasio: false,
      brandCitizen: false,
      brandNorthEdge: false,
      brandSeiko: false,
      brandTagHeuer: false,
      brandFossil: false,
      priceFrom: 68,
      priceMin: 68,
      priceTo: 9293,
      priceMax: 9293,
      stockFrom: 8,
      stockMin: 8,
      stockTo: 112,
      stockMax: 112,
    },
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

  return localStorageData;
}
