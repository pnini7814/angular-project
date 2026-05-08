import { OrderItemCreate } from "./order-item-create.model";
export type OrderStatus = 'created' | 'collected' | 'shipped' | 'delivered';
export class OrderCreate{
  id?: number;
  userId?: number; 
  orderItems: OrderItemCreate[]=[];
  orderSum: number=0;
  status:OrderStatus='created';
  orderDate: Date=new Date();
} 