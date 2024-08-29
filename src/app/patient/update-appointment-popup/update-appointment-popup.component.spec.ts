import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentPopupComponent } from './update-appointment-popup.component';

describe('UpdateAppointmentPopupComponent', () => {
  let component: UpdateAppointmentPopupComponent;
  let fixture: ComponentFixture<UpdateAppointmentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAppointmentPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAppointmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
