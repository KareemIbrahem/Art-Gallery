interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  ratingsAverage: number;
  id: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
}

export interface UserCartResponse {
  status: string;
  cartLength: number;
  data: {
    _id: string;
    cartItems: CartItem[];
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalPrice: number;
  };
}
