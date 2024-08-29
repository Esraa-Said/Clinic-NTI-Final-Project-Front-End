import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sign-in-home',
  templateUrl: './sign-in-home.component.html',
  styleUrls: ['./sign-in-home.component.css'],
})
export class SignInHomeComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage: string = ''; 
  loading = false;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submitForm() {
    if (this.signInForm.invalid) return;

    this.loading = true;
    const credentials = this.signInForm.value;
    this._authService.login(credentials).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.token) {
          this._authService.setToken(response.token);
          const decodedToken = this._authService.getDecodedToken();
          this.signInForm.reset();
          
          // Navigate based on user role
          if (decodedToken.role === 'Patient') {
            this._router.navigateByUrl('/Patient');
          } else if (decodedToken.role === 'Doctor') {
            this._router.navigate(['/Doctor']);
          } else if (decodedToken.role === 'Admin') {
            this._router.navigate(['/Admin']);
          }
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message; // Display the backend error
      },
    });
  }

  navToSignUp() {
    this._router.navigateByUrl('Home/Sign/SignUp');
  }
}
