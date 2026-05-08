import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannageProducts } from './mannage-products';

describe('MannageProducts', () => {
  let component: MannageProducts;
  let fixture: ComponentFixture<MannageProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MannageProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MannageProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
