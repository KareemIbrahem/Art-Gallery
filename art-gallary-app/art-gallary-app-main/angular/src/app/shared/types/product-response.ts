export interface ProductResponse {
  result: number;
  paginateResult: {
    currentage: number;
    limit: number;
    numberOfPages: number;
    next: number;
    previous: number;
  };
  data: Array<{
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    sold: number;
    createdAt: string;
    updatedAt: string;
    view: number;
    fav: boolean;
  }>;
}


