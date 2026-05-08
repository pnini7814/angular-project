import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UsersService } from '../../services/users-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-orders-history',
  imports: [CommonModule, CardModule, ButtonModule, DataViewModule, TagModule, ToastModule],
  providers: [MessageService],
  templateUrl: './orders-history.html',
  styleUrl: './orders-history.scss',
})
export class OrdersHistory {
  orderService = inject(OrderService);
  userService = inject(UsersService);
  authService = inject(AuthService);
  messageService = inject(MessageService);
  orders = signal<Order[]>([]);

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.userService.getUserOrders(this.authService.currentUser()?.id || 0).subscribe({
      next: (data) => {
        this.orders.set(Array.isArray(data) ? data : [data]);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load orders.' });
      }
    });
  }

  updateStatus(order: Order, newStatus: string) {
    if (!order.id) return;
    this.orderService.updateOrderStatus(order.id, order).subscribe({
      next: (updatedOrder) => {
        this.messageService.add({ severity: 'success', summary: 'Status Updated', detail: `Order #${order.id} status changed to ${newStatus}.` });
        this.loadOrders(); // Reload to reflect changes
      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update order status.' });
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'created': return 'info';
      case 'collected': return 'warn';
      case 'shipped': return 'success';
      case 'delivered': return 'success';
      default: return 'secondary';
    }
  }
}
