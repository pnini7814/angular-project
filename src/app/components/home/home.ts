import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProductModel } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ProductsService } from '../../services/ProductsService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  router = inject(Router);
  categoryService = inject(CategoryService);
  categories: Category[] = this.categoryService.categories();
  productService = inject(ProductsService);
  featuredProducts: ProductModel[] = [];

  ngOnInit() {
    this.productService.getProducts({skip: 0, position: 5}).subscribe({
      next: (next) => this.featuredProducts = next,
      error: (error) => console.error('Failed to load featured products', error)
    });
  }

  navigateToProducts(category?: string) {
    if (category) {
      this.router.navigate(['/products'], { queryParams: { category } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  viewProduct(product: ProductModel) {
    this.router.navigate(['/product-details', product.id]);
  }
}
