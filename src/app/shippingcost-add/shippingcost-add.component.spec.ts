import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingcostAddComponent } from './shippingcost-add.component';

describe('ShippingcostAddComponent', () => {
  let component: ShippingcostAddComponent;
  let fixture: ComponentFixture<ShippingcostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingcostAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingcostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
