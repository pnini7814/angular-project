import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../cart-item/cart-item';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItem, CardModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  router = inject(Router);
  cartService = inject(CartService);
  orderService = inject(OrderService);
  messageService = inject(MessageService);

  checkout() {
    const order = this.cartService.order();
    if (order.orderItems.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Cart Empty', detail: 'Add items to cart before checkout.' });
      return;
    }

    this.orderService.createOrderFromCart(order).subscribe({
      next: (createdOrder) => {
        this.messageService.add({ severity: 'success', summary: 'Order Created', detail: 'Your order has been placed successfully!' });
        this.cartService.clearCart();
        this.router.navigate(['/account']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Order Failed', detail: 'Failed to create order. Please try again.' });
        console.error('Order creation error:', err);
      }
    });
  }
}
