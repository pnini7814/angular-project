import { Injectable, signal, computed } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order-item.model';
import { ProductModel } from '../models/product.model';
import { OrderCreate } from '../models/order-create.model';
import { OrderItemCreate } from '../models/order-item-create.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  // ניהול ההזמנה הנוכחית כ-Signal
  private currentOrder = signal<Order>(this.loadOrderFromStorage());

  // חשיפת נתונים לקומפוננטות
  order = this.currentOrder.asReadonly();

  private loadOrderFromStorage(): Order {
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      try {
        return JSON.parse(storedOrder);
      } catch (e) {
        console.error('Error parsing stored order:', e);
        return new Order();
      }
    }
    return new Order();
  }

  saveOrderAtStorage() {
    const order = this.currentOrder();
    const sum = (order.orderItems || []).reduce((acc, item) => acc + (item.productPrice * item.quantity), 0);
    const toSave = { ...order, orderSum: sum };
    localStorage.setItem('currentOrder', JSON.stringify(toSave));
  }
  
  // חישוב אוטומטי של סכום ההזמנה
  totalSum = computed(() => {
    return this.currentOrder().orderItems.reduce((acc, item) => 
      acc + (item.productPrice * item.quantity), 0);
  });

  addToCart(product: ProductModel, quantity: number = 1) {
    this.currentOrder.update(order => {
      const existingItem = order.orderItems.find(i => i.productId === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        return { ...order, orderItems: [...order.orderItems] };
      }

      const newItem: OrderItem = {
        orderId: order.id ?? 0,
        productId: product.id,
        quantity: quantity,
        productName: product.name,
        productImageUrl: product.imageUrl,
        productPrice: product.price
      };
      
      return { ...order, orderItems: [...order.orderItems, newItem] };
    });
    // save after the signal update completes
    this.saveOrderAtStorage();
  }

  updateQuantity(productId: number, delta: number) {
    this.currentOrder.update(order => {
      const items = order.orderItems.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
      return { ...order, orderItems: items };
    });
    // persist after update finishes
    this.saveOrderAtStorage();
  }

  removeItem(productId: number) {
    this.currentOrder.update(order => ({
      ...order,
      orderItems: order.orderItems.filter(i => i.productId !== productId)
    }));
    this.saveOrderAtStorage();
  }

  clearCart() {
    this.currentOrder.set(new Order());
    this.saveOrderAtStorage();
  }
}
