import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { UserStateService } from '../shared/services';

export const nameSetupGuard: CanActivateFn = () => {
  const userState = inject(UserStateService);
  const router = inject(Router);

  return toObservable(userState.loading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => {
      const user = userState.user();
      if (!user) return true;
      if (!user.firstName?.trim()) {
        return router.createUrlTree(['/profile-setup']);
      }
      return true;
    }),
  );
};
