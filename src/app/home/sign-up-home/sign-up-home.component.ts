import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from './customValidators';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sign-up-home',
  templateUrl: './sign-up-home.component.html',
  styleUrls: ['./sign-up-home.component.css'],
})
export class SignUpHomeComponent implements OnInit {
  signUpForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  fileValid: Boolean = true;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.minLength(3),
          Validators.required,
        ]),
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required]),
        retypePassword: new FormControl(null, [Validators.required]),
        age: new FormControl(null, [
          Validators.pattern('^[0-9]*$'),
          Validators.required,
        ]),
        phoneNumber: new FormControl(null, [
          Validators.pattern('^[0-9]{12}$'),
          Validators.required,
        ]),
        photo: new FormControl(null, [Validators.required]),
        gender: new FormControl('Female', [Validators.required]),
      },
      { validators: CustomValidators.MatchPassword }
    );
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const validExtensions = ['image/png', 'image/jpeg'];
    this.fileValid = validExtensions.includes(file.type);

    if (this.fileValid) {
      const fileReader = new FileReader();
      fileReader.onload = (fileReaderEvent) => {
        this.imagePreview = fileReaderEvent.target!.result;
      };
      fileReader.readAsDataURL(file);
      this.signUpForm.get('photo')?.setValue(file);
    }
  }

  submitForm(): void {
    if (this.signUpForm.valid) {
      const signUpData: any = {
        name: this.signUpForm.get('name')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        age: this.signUpForm.get('age')?.value,
        phoneNumber: this.signUpForm.get('phoneNumber')?.value,
        gender: this.signUpForm.get('gender')?.value,
      };

      const photoFile = this.signUpForm.get('photo')?.value;

      if (this.fileValid && photoFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          signUpData.photo = reader.result as string;

          this._authService.signUp(signUpData).subscribe({
            next: (response) => {
              this.showSuccessPopup();
              this._router.navigateByUrl('/Home/Sign/SignIn');
            },
            error: (error) => {
              console.error('Sign-up error:', error);
              alert('Sign-up failed. Please try again.');
            },
          });

          this.resetForm();
        };
        reader.readAsDataURL(photoFile);
      } else {
        this._authService.signUp(signUpData).subscribe({
          next: (response) => {
            this.showSuccessPopup();
            this._router.navigateByUrl('/Home/Sign/SignIn');
          },
          error: (error) => {
            console.error('Sign-up error:', error);
            alert('Sign-up failed. Please try again.');
          },
        });

        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.signUpForm.reset();

    this.imagePreview = null;

    this.selectedFile = null;

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  navToSignIn(): void {
    this._router.navigateByUrl('/Home/Sign/SignIn');
  }

  showPopup: boolean = false;
  showSuccessPopup(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 30000);
  }
}
