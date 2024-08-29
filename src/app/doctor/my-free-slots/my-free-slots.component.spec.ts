import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFreeSlotsComponent } from './my-free-slots.component';

describe('MyFreeSlotsComponent', () => {
  let component: MyFreeSlotsComponent;
  let fixture: ComponentFixture<MyFreeSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFreeSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFreeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
