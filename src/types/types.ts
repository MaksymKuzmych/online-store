interface IWatch {
  id: number;
  brand: string;
  name: string;
  price: number;
  clockFace: 'digital' | 'pointer';
  mount: 'strap' | 'bracelet';
  description: string;
  image: File;
}

export { IWatch };
