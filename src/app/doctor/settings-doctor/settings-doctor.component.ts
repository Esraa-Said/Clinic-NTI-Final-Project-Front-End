import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { DoctorsService } from '../../Services/doctors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-doctor',
  templateUrl: './settings-doctor.component.html',
  styleUrls: ['./settings-doctor.component.css'],
})
export class SettingsDoctorComponent implements OnInit {
  securityForm!: FormGroup;
  accountForm!: FormGroup;
  userAccountData: any;
  userId: string = '';
  errorMessage: string = '';
  errorMessagePass: string = '';

  constructor(
    private _authService: AuthService,
    private _doctorServices: DoctorsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();

    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.userId = decodedToken.userId;
      this.fetchUserData();
    }
  }

  initializeForms(): void {
    this.securityForm = new FormGroup({
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
    });

    this.accountForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      phoneNumber: new FormControl(null, [Validators.pattern('^[0-9]{12}$')]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      age: new FormControl(null, [
        Validators.pattern('^[0-9]*$'),
        Validators.required,
      ]),
      gender: new FormControl(null),
    });
  }

  fetchUserData(): void {
    this._doctorServices.getDoctorById(this.userId).subscribe((data) => {
      this.userAccountData = data;
      this.accountForm.patchValue({
        name: data.name.substring(3),
        phoneNumber: data.phoneNumber,
        email: data.email,
        age: data.age,
        gender: data.gender,
      });
    });
  }

  submitAccountForm(): void {
    const updatedData = this.accountForm.value;
    updatedData['name'] = `Dr.${updatedData['name']}`
    this._doctorServices.updateDoctorById(this.userId, updatedData).subscribe({
      next: (response) => {
        this.showSuccessPopup();
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage =
          error.error.error || 'Error updating account. Please try again.';
        console.error('Error updating account:', error);
      },
    });
  }

  submitSecurityForm(): void {
    const { currentPassword, newPassword } = this.securityForm.value;

    this._doctorServices
      .changePassword(this.userId, currentPassword, newPassword)
      .subscribe({
        next: (response) => {
          this.errorMessagePass = '';
          this.showSuccessPopup();
          this.securityForm.reset();
        },
        error: (error) => {
          console.error('Error updating password:', error);
          this.errorMessagePass =
            error.error.error || 'Error updating password. Please try again.';
        },
      });
  }

  showPopup: boolean = false;
  showSuccessPopup(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 30000);
  }
}
