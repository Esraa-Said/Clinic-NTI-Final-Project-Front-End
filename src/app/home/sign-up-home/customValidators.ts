import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

// Password Validation
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNumber = /[0-9]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const isValidLength = value.length >= 8;
      const passwordValid = hasNumber && hasUpper && hasLower && isValidLength;
      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

// Re Type Password
  static MatchPassword(form: AbstractControl): ValidationErrors | null{
    const password = form.get('password')?.value;
    const retype = form.get('retypePassword')?.value;
    if(password !== retype)
    {
        return {passwordMismatch: true}
    }
    return null;
  }

}
