import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { OrderItem } from '../../models/order-item.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-item',
  imports: [ButtonModule, CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  @Input({ required: true }) item!: OrderItem;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
