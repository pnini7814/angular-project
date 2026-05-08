import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductModel } from '../../models/product.model';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [ButtonModule, CardModule, CommonModule, TagModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: ProductModel;
  @Output() viewProduct = new EventEmitter<ProductModel>();
  @Output() addToCart = new EventEmitter<ProductModel>();
}
