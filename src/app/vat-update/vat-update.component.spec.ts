import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatUpdateComponent } from './vat-update.component';

describe('VatUpdateComponent', () => {
  let component: VatUpdateComponent;
  let fixture: ComponentFixture<VatUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VatUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
