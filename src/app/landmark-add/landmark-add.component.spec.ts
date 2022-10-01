import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkAddComponent } from './landmark-add.component';

describe('LandmarkAddComponent', () => {
  let component: LandmarkAddComponent;
  let fixture: ComponentFixture<LandmarkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandmarkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
