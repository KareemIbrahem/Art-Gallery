export interface CatgoryResponse{
  status:string
  data:Array<{
    _id: string;
    name: string;
  }>
}

export interface AddCatogryResponse{
  status:string
  data:{
    _id: string;
    name: string;
  }
}
