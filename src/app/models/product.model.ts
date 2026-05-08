export class ProductModel{
    id!: number;
    name: string='';
    description: string='';
    price: number=0;
    categoryName: string='';
    categoryId: number=0;
    imageUrl: string='';
    isAvailable: boolean=true;
}
export class ProductFilter {
  categoryIds?: number[];
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  position?: number;
}
