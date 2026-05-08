import { inject, Injectable } from '@angular/core';
import { Order, OrderStatus } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderCreate } from '../models/order-create.model';
import { OrderItemCreate } from '../models/order-item-create.model';
import { OrderItem } from '../models/order-item.model';
import { AuthService } from './auth-service';
import { CartService } from './cart-service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'https://localhost:44313';
  authService: AuthService = inject(AuthService);
  cartService = inject(CartService);
  constructor(private http: HttpClient) {}
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/api/orders`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/api/orders/${id}`);
  }

  createOrder(order: OrderCreate): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/api/orders`, order);
  }

  createOrderFromCart(order: Order): Observable<Order> {
    const orderCreate: OrderCreate = {
      id: 0,
      userId: this.authService.currentUser()?.id ?? 0,
      orderItems: order.orderItems.map(item => ({
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        productPrice: item.productPrice
      })),
      orderSum: this.cartService.totalSum(),
      status: order.status,
      orderDate: order.orderDate
    };
    return this.createOrder(orderCreate);
  }

  updateOrderStatus(id: number, order: Order): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/orders/${id}`, order);
  }

}
