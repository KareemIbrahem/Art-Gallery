interface UserData {
  email: string;
  name: string;
  _id: string;
  role: string;
  phone: string;
  userImg: string;
  address: string;
}

export interface UserCreate {
  status: string;
  data: UserData;
}
