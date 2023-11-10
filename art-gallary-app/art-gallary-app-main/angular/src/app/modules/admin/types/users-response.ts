interface PaginateResult {
  currentage: number;
  limit: number;
  numberOfPages: number;
}


interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  userImg: string;
}

export interface UserApiResponse {
  result: number;
  paginateResult: PaginateResult;
  data: User[];
}
