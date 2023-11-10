export interface Product {
  data: {
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
  reviews: Review[];
  id: string;
    view: number;
    fav: boolean;
}
}

interface Review {
  _id: string;
  title: string;
  rating: number;
  user: User;
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  userImg: string;
}
