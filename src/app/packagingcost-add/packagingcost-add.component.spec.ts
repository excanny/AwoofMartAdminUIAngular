import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingcostAddComponent } from './packagingcost-add.component';

describe('PackagingcostAddComponent', () => {
  let component: PackagingcostAddComponent;
  let fixture: ComponentFixture<PackagingcostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingcostAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingcostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
