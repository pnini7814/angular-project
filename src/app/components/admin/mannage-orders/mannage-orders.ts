import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select'; 
import { Order, OrderStatus } from '../../../models/order.model';
import { OrderService } from '../../../services/order-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mannage-orders',
  imports: [CommonModule, TableModule, SelectModule, FormsModule],
  templateUrl: './mannage-orders.html',
  styleUrls: ['./mannage-orders.scss'],
})
export class MannageOrders implements OnInit {
  orders: Order[] = [];
  private ordersService = inject(OrderService);

  // הגדרת האפשרויות
  statusOptions = [
    { label: 'Created', value: 'created' },
    { label: 'Collected', value: 'collected' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' }
  ];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (data: Order[]) => this.orders = data,
      error: (error: any) => {
        console.error('Failed to load orders:', error);
      }
    });
  }

  onStatusChange(order: Order) {
    if (!order.id) {
      console.error('Order id is missing');
      return;
    }
    this.ordersService.updateOrderStatus(order.id, order).subscribe({
      next: () => console.log(`Order ${order.id} status updated to ${order.status}`),
      error: (error: any) => console.error('Update failed', error)
    });
  }

}
