import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { signal, computed } from '@angular/core';
import { ProductFilter } from '../models/product.model';

@Injectable({ providedIn: 'root' }) 
export class ProductsService {
  private baseUrl = 'https://localhost:44313';
  products = signal<ProductModel[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}/api/products`);
  }
  getProductById<ProductModel>(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/api/products/${id}`);
  }

  post<ProductModel>(product:ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.baseUrl}/api/products`, product);
  }

  put<ProductModel>(id:number, product:ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/api/products/${id}`, product);
  }
  

  
  delete(id: number): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${this.baseUrl}/api/products/${id}`);
  }
  getProducts(filters?: ProductFilter): Observable<ProductModel[]> {
    this.loading.set(true);
    this.error.set(null);

    let params = new URLSearchParams();

    if (filters) {
      if (filters.categoryIds && filters.categoryIds.length > 0) {
        filters.categoryIds.forEach(id => params.append('categoryIds', id.toString()));
      }
      if (filters.description) {
        params.append('description', filters.description);
      }
      if (filters.minPrice !== undefined) {
        params.append('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice !== undefined) {
        params.append('maxPrice', filters.maxPrice.toString());
      }
      if (filters.skip !== undefined) {
        params.append('skip', filters.skip.toString());
      }
      if (filters.position !== undefined) {
        params.append('position', filters.position.toString());
      }
    } else {
      // Default pagination
      params.append('skip', '8');
      params.append('position', '1');
    }

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}/api/products?${queryString}` : this.baseUrl;

    return new Observable<ProductModel[]>((observer: any) => {
      this.http.get<ProductModel[]>(url).subscribe({
        next: (data) => {
          this.products.set(data);
          this.loading.set(false);
          observer.next(data);
          observer.complete();
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Failed to fetch products';
          this.error.set(errorMsg);
          this.loading.set(false);
          observer.error(err);
        }
      });
    });
  }

  uploadImage(formData: FormData) {
  return this.http.post<{ url: string }>(
    'https://localhost:44313/api/Upload/upload',
    formData
  );}
  
}