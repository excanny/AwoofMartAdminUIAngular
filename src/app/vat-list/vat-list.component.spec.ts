import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatListComponent } from './vat-list.component';

describe('VatListComponent', () => {
  let component: VatListComponent;
  let fixture: ComponentFixture<VatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
