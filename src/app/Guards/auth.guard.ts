import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);
  
  if (_authS.isAuthenticated()) {
    return true;
  } else {
    _router.navigateByUrl('/Home');
    return false;
  }
};
