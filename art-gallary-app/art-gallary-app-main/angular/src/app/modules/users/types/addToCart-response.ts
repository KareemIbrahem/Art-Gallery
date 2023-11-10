export interface AddToCartResponse {
  status: string;
  message: string;
  cartLength: number;
  data: {
    cartItems: CartItem[];
    user: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalPrice: number;
  };
}

interface CartItem {
  product: string;
  quantity: number;
  price: number;
  _id: string;
}
