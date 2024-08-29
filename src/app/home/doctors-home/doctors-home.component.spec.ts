import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsHomeComponent } from './doctors-home.component';

describe('DoctorsHomeComponent', () => {
  let component: DoctorsHomeComponent;
  let fixture: ComponentFixture<DoctorsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
