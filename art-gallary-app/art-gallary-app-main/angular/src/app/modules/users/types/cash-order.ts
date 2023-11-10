export interface CashOrder {
  status: string;
  data: {
    user: string;
    cartItems: {
      product: string;
      quantity: number;
      price: number;
      _id: string;
    }[];
    shippingAddress: string;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethod: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}