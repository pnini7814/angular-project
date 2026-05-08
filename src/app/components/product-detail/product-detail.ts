import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/ProductsService';
import { ProductModel } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // נדרש עבור ngModel
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { OrderItem } from '../../models/order-item.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, TagModule, InputNumberModule, ButtonModule, BreadcrumbModule, SkeletonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);
  private cdr = inject(ChangeDetectorRef);
  cartService = inject(CartService);
  product: ProductModel | null = null;
  quantity: number = 1;

  items: MenuItem[] | undefined; // עבור ה-Breadcrumbs
  home: MenuItem | undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.loadProduct(+productId);
    } else {
      console.error('No product ID provided');
      this.router.navigate(['/show-products']);
    }

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    
  }

 

  loadProduct(id: number): void {
    
    this.productService.getProductById<ProductModel>(id).subscribe({
      next: (data) => {
        this.product = data;
        this.items = [
            { label: 'Products', routerLink: '/products' },
            { label: this.product.categoryName },
            { label: this.product.name }
        ];
        this.cdr.detectChanges();
      }
    });
  }

  addToCart(): void {
    if (!this.product) {
      console.error('No product loaded');
      return;
    }
    if (!this.product.isAvailable) return;
    
    this.cartService.addToCart(this.product, this.quantity);
    console.log('Product added to cart:', this.product);
    
  }
}
