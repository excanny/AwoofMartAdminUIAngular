import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingcostListComponent } from './packagingcost-list.component';

describe('PackagingcostListComponent', () => {
  let component: PackagingcostListComponent;
  let fixture: ComponentFixture<PackagingcostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingcostListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingcostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
