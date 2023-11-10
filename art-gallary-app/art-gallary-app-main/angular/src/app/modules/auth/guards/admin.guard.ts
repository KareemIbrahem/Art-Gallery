import { ɵɵinject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = ɵɵinject(Router);
  const authService = ɵɵinject(AuthService);

  return authService.getCurrentUser().pipe(
    map(user => {
      if (user?.data.role=="admin" ||user?.data.role=="superAdmin" ) {
        return true;
      } else {
        router.navigateByUrl("/");
        return false;
      }
    })
  )
};
