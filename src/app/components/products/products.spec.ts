import { TestBed } from '@angular/core/testing';
import { Products } from './products';

describe('Products', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Products] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Products);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
