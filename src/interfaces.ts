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
  localPromo: IPromocode[];
}
