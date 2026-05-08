import { OrderItem } from "./order-item.model";
export type OrderStatus = 'created' | 'collected' | 'shipped' | 'delivered';
export class Order{
  id?: number;
  userId?: number; 
  orderItems: OrderItem[]=[];
  orderSum: number=0;
  status:OrderStatus='created';
  orderDate: Date=new Date();
}