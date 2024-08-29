import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreeSlotComponent } from './add-free-slot.component';

describe('AddFreeSlotComponent', () => {
  let component: AddFreeSlotComponent;
  let fixture: ComponentFixture<AddFreeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFreeSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFreeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
