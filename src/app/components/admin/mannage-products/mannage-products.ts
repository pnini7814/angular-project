import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../models/product.model';
import { ProductsService } from '../../../services/ProductsService';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-mannage-products',
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, FileUploadModule, InputNumberModule, CheckboxModule, TextareaModule],
  templateUrl: './mannage-products.html',
  styleUrl: './mannage-products.scss',
})
export class MannageProducts implements OnInit {
  products: ProductModel[] = [];
  product: ProductModel = new ProductModel();
  productDialog: boolean = false;
  productService = inject(ProductsService);
  selectedFile: File | null = null;
  previewImage: string | null = null;
  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data: ProductModel[]) => this.products = data,
      error: (error: any) => {
        console.error('Failed to load products:', error);
      }
    });
  }
  onComplete() {
    this.loadProducts(); // רענון הרשימה
    this.productDialog = false;
    this.previewUrl = '';
   this.fileUpload?.clear(); 
   this.selectedFile=null;
   this.hideDialog();

  }
  openNew() {
    this.product = new ProductModel();
    this.productDialog = true;
  }

  editProduct(product: ProductModel) {
    this.product = { ...product };
    this.productDialog = true;
  }

  saveProduct() {
    
  const formData = new FormData();
  
  // הוספת כל השדות ל-FormData
  formData.append('name', this.product.name);
  formData.append('description', this.product.description);
  formData.append('price', this.product.price.toString());
  formData.append('categoryId', this.product.categoryId.toString());
  formData.append('isAvailable', this.product.isAvailable.toString());

  // הוספת הקובץ אם נבחר כזה
  if (this.selectedFile) {
    formData.append('imageFile', this.selectedFile); 
  }

  if (this.product.id) {
    this.productService.put(this.product.id, this.product).subscribe({
      next: () => this.onComplete(),
      error: (err) => console.error(err)
    });
  } else {
    this.productService.post(this.product).subscribe({
      next: () => this.onComplete(),
      error: (err) => console.error(err)
    });
  }

  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }

  hideDialog() { this.productDialog = false; }
  onFileSelect(event: any) {
  this.selectedFile = event.files[0];
  
  // יצירת תצוגה מקדימה (Preview)
  const reader = new FileReader();
  reader.onload = (e: any) => this.previewImage = e.target.result;
  reader.readAsDataURL(this.selectedFile!);
}
  previewUrl: string = '';
  uploading = false;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  onFileSelected(event: FileSelectEvent) {

  const file = event.files[0];
  if (!file) return;

  this.previewUrl = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append('file', file);

  this.uploading = true;

  this.productService.uploadImage(formData).subscribe({
    next: (res) => {
      this.product.imageUrl = res.url;
      this.uploading = false;
    },
    error: () => this.uploading = false
  });
}
}
