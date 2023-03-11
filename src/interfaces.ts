export interface IWatch {
  id: number;
  brand: string;
  name: string;
  price: number;
  stock: number;
  clockFace: 'digital' | 'pointer';
  mount: 'strap' | 'bracelet';
  description: string;
}

export interface ICart {
  id: number;
  quantity: number;
}

export interface IPromocode {
  code: string;
  name: string;
  discount: number;
}

export interface ILocalData {
  localCart: ICart[];
  localCounter: number;
  localAmount: number;
  localLimit: number;
  localPage: number;
  localFilters: ILocalFilters;
  localPromo: IPromocode[];
}

export interface ILocalFilters {
  search: string;
  sort: string;
  view: 'big' | 'small';
  optionsPointer: boolean;
  optionsDigital: boolean;
  optionsStrap: boolean;
  optionsBracelet: boolean;
  brandCasio: boolean;
  brandCitizen: boolean;
  brandNorthEdge: boolean;
  brandSeiko: boolean;
  brandTagHeuer: boolean;
  brandFossil: boolean;
  priceFrom: number;
  priceMin: number;
  priceTo: number;
  priceMax: number;
  stockFrom: number;
  stockMin: number;
  stockTo: number;
  stockMax: number;
}

export type FlatArray<T> = Array<T>;
