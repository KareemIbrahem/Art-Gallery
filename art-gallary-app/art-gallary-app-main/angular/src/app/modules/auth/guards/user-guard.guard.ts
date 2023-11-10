import { ɵɵinject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { CurentUser } from "../types/current-user";
import { map } from "rxjs";

export const userGuardGuard: CanActivateFn = (route, state) => {
  const currentUser: CurentUser | null = null;
  const isLoggedIn: boolean = false;
  const router = ɵɵinject(Router);
  const authService = ɵɵinject(AuthService);

  return authService.getLoggedIn().pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigateByUrl("/api/v1/auth/login");
        return false;
      }
    })
  );
};
