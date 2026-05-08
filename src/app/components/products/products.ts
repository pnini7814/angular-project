import { Component,computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../product-card/product-card";
import {  OnInit, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ProductsService } from '../../services/ProductsService';
import { ProductModel, ProductFilter } from '../../models/product.model';
import { Router } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectItem } from 'primeng/api'
import { Select, SelectModule } from 'primeng/select';
import { SortEvent } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { Filters } from '../filters/filters';
import { CategoryService } from '../../services/category.service';
import { ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [Filters,CommonModule, ProductCard, ButtonModule, DataViewModule, TagModule, BreadcrumbModule, SkeletonModule, SelectModule, FormsModule, Select],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products {
  readonly productService = inject(ProductsService);
  readonly cartService = inject(CartService);
  readonly categoryService = inject(CategoryService);
  readonly router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    private route = inject(ActivatedRoute);

  // products = computed(() => this.productService.getProducts());
  loading = computed(() => this.productService.loading());
  error = computed(() => this.productService.error());
  categories = computed(() => this.categoryService.categories());

  searchText = '';
  minPrice = 0;
  maxPrice = 10000;
  selectedCategory: number | null = null;
    products = signal<ProductModel[]>([]);
    getSeverity(item: any) {
        switch (item.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'primary';
        }
    }
    ngOnInit() { 
        this.route.queryParams.subscribe(params => {
            if (params['category']) {
                // Assuming category is a string like 'lipstick', map to id or name
                // For now, set selectedCategory to a default or find by name
                // You might need to adjust based on your category data
                this.selectedCategory = 1; // Example: set to first category or find matching
            }
        });
        this.loadProducts();
    }

    onViewProduct(product: ProductModel) {
        console.log('View product:', product);
        // Add logic to view product details
        this.router.navigate(['/product-details', product.id]);
    }
    

    onAddToCart(product: ProductModel) {
      this.cartService.addToCart(product, 1);
      console.log('Add to cart:', product);
    }
    sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
    ];
    sortField: string = '';
    sortOrder: number = 0;

    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    loadProducts() {
    const filters: ProductFilter = {
      description: this.searchText || undefined,
      minPrice: this.minPrice || undefined,
      maxPrice: this.maxPrice || undefined,
      categoryIds: this.selectedCategory ? [this.selectedCategory] : undefined,
      skip: 8,
      position: 1,
    };

    this.productService.getProducts(filters).subscribe({
      next: (data) => {
        console.log('Products loaded:', data);
        this.products.set(data as ProductModel[]);
      },
      error: (err: any) => {
        console.error('Error loading products:', err);
      },
    });
    this.cdr.detectChanges();
  }


    applyFilters() {
    this.loadProducts();
  }

  resetFilters() {
    this.searchText = '';
    this.minPrice = 0;
    this.maxPrice = 10000;
    this.selectedCategory = null;
    this.loadProducts();
  }
  }


