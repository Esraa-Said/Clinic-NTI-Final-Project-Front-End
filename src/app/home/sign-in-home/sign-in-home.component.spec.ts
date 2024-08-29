import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInHomeComponent } from './sign-in-home.component';

describe('SignInHomeComponent', () => {
  let component: SignInHomeComponent;
  let fixture: ComponentFixture<SignInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
