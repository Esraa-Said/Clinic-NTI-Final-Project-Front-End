import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileHomeComponent } from './doctor-profile-home.component';

describe('DoctorProfileHomeComponent', () => {
  let component: DoctorProfileHomeComponent;
  let fixture: ComponentFixture<DoctorProfileHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorProfileHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorProfileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
