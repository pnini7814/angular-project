import { Component, inject, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  private readonly categoryService = inject(CategoryService);

  selectedCategoryId = input<number | null>(null);
  selectedCategoryIdChange = output<number | null>();
  
  isDisabled = input<boolean>(false);
  showLabel = input<boolean>(true);
  label = input<string>('Category');

  categories = computed(() => this.categoryService.categories());
  loading = computed(() => this.categoryService.loading());
  error = computed(() => this.categoryService.error());

  onCategoryChange(value: string): void {
    const categoryId = value ? parseInt(value, 10) : null;
    this.selectedCategoryIdChange.emit(categoryId);
  }
}
