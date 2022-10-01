import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingcostListComponent } from './shippingcost-list.component';

describe('ShippingcostListComponent', () => {
  let component: ShippingcostListComponent;
  let fixture: ComponentFixture<ShippingcostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingcostListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingcostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
