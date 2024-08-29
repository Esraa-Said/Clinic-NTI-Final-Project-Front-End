import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstContentHomeComponent } from './first-content-home.component';

describe('FirstContentHomeComponent', () => {
  let component: FirstContentHomeComponent;
  let fixture: ComponentFixture<FirstContentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstContentHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstContentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
