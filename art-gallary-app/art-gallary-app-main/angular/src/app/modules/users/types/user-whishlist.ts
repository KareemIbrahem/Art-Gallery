
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ratingsAverage: number;
  view: number;
  id: string;
  fav:boolean
}

export interface WhishList {
  product: Product;
  _id: string;
}
