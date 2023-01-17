import { ILocalFilters } from '../interfaces';
import { watchData } from '../watch-data/watch-data';
import { findLimitValue } from './find-limit-value';

export const defaultLocalFilters: ILocalFilters = {
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
  priceFrom: findLimitValue(watchData, 'price', 'min'),
  priceMin: findLimitValue(watchData, 'price', 'min'),
  priceTo: findLimitValue(watchData, 'price', 'max'),
  priceMax: findLimitValue(watchData, 'price', 'max'),
  stockFrom: findLimitValue(watchData, 'stock', 'min'),
  stockMin: findLimitValue(watchData, 'stock', 'min'),
  stockTo: findLimitValue(watchData, 'stock', 'max'),
  stockMax: findLimitValue(watchData, 'stock', 'max'),
};
