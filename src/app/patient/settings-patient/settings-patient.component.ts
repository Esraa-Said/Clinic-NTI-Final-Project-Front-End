import { Component } from '@angular/core';
import { PatientsService } from '../../Services/patients.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-patient',
  templateUrl: './settings-patient.component.html',
  styleUrls: ['./settings-patient.component.css'],
})
export class SettingsPatientComponent {
  securityForm!: FormGroup;
  accountForm!: FormGroup;
  userAccountData: any;
  userId: string = '';
  errorMessage: string = ''; // Variable to hold error messages
  errorMessagePass: string = ''; // Variable to hold error messages

  constructor(
    private _authService: AuthService,
    private _patientsService: PatientsService
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
      phoneNumber: new FormControl(null, [
        Validators.pattern('^[0-9]{12}$'),
        Validators.required,
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      age: new FormControl(null, [
        Validators.pattern('^[0-9]*$'),
        Validators.required,
      ]),
      gender: new FormControl(null, Validators.required),
    });
  }

  fetchUserData(): void {
    this._patientsService.getPatientById(this.userId).subscribe((data) => {
      this.userAccountData = data;
      this.accountForm.patchValue({
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        age: data.age,
        gender: data.gender,
      });
    });
  }

  submitAccountForm(): void {
    const updatedData = this.accountForm.value;

    this._patientsService
      .updatePatientById(this.userId, updatedData)
      .subscribe({
        next: (response) => {
          this.errorMessage = ''; // Clear error message on success
          this.showSuccessPopup();
        },
        error: (error) => {
          console.error('Error updating account:', error);
          this.errorMessage =
            error.error.error || 'Error updating account. Please try again.';
        },
      });
  }

  submitSecurityForm(): void {
    const { currentPassword, newPassword } = this.securityForm.value;

    this._patientsService
      .changePassword(this.userId, currentPassword, newPassword)
      .subscribe({
        next: (response) => {
          this.errorMessagePass = ''; // Clear error message on success
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
