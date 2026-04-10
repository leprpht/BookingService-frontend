import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateService } from '../shared/services';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const alreadySetupGuard: CanActivateFn = () => {
  const userState = inject(UserStateService);
  const router = inject(Router);

  return toObservable(userState.loading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => {
      const user = userState.user();
      if (user?.firstName?.trim()) {
        return router.createUrlTree(['/']);
      }
      return true;
    }),
  );
};
