interface User {
  _id: string;
  name: string;
}

export interface ReviewUpdate {
  status: string;
  data: {
    _id: string;
    title: string;
    rating: number;
    user: User;
    product: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}