import { WhishList } from "../../users/types/user-whishlist";



export interface CurentUser {
  status: string;
  data: {
    email: string;
    name: string;
    _id: string;
    role: string;
    phone: string;
    userImg: string;
    address: string;
    wishList: WhishList[];
  };
  token: string;
}

