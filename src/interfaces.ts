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
