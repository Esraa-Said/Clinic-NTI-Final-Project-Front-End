import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDoctorComponent } from './settings-doctor.component';

describe('SettingsDoctorComponent', () => {
  let component: SettingsDoctorComponent;
  let fixture: ComponentFixture<SettingsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
