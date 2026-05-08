import { Order } from "./order.model";
export class User{
  id: number=0;
  email:string=""
  firstName:string=""
  lastName:string=""
  address:string='';
  phoneNumber:string='';
  isAdmin?:boolean=false
  orders: Order[]=[];
  password:string='';
}