import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:44313/api/categories';

  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private categoriesLoaded = signal<boolean>(false);

  constructor() {
    // Auto-load categories on first access
    effect(() => {
      if (!this.categoriesLoaded() && this.categories().length === 0) {
        this.loadCategories();
      }
    });
  }

  loadCategories(): void {
    if (this.loading() || this.categoriesLoaded()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.httpClient.get<Category[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.categories.set(data);
        this.categoriesLoaded.set(true);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.error.set('Failed to load categories');
        this.loading.set(false);
        this.categories.set([]);
      }
    });
  }
}
