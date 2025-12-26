 export interface Products {
  id: string;
  name: string;
  src: string;
  price: number;
};

export interface Bag extends Products{
  count: number;
};

