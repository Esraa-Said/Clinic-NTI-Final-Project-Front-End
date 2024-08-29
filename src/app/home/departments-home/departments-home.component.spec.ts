import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsHomeComponent } from './departments-home.component';

describe('DepartmentsHomeComponent', () => {
  let component: DepartmentsHomeComponent;
  let fixture: ComponentFixture<DepartmentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
