import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannageOrders } from './mannage-orders';

describe('MannageOrders', () => {
  let component: MannageOrders;
  let fixture: ComponentFixture<MannageOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MannageOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MannageOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
