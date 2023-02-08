export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export interface ICartProduct extends IProduct {
  quantity: number;
  totalPrice: number | string;
}

export interface ISortItem {
  label: string;
  value: string;
  order: boolean | "asc" | "desc";
}

export interface IOption {
  label: string;
  value: string | number;
}
