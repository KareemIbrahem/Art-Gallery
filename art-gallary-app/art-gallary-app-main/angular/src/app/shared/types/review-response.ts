export interface ReviewResponse {
  status: string;
  data: {
    title: string;
    rating: number;
    user: string;
    product: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}