import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { UserInfo } from '../../models/types/userInfo';
import { FALLBACK_IMAGE_URL } from '../../data/fallback-image';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly userService = inject(UserService);

  readonly user = signal<UserInfo | null>(null);
  readonly isAuthenticated = signal(false);
  readonly loading = signal(true);

  refresh() {
    this.userService
      .getUser()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.user.set(null);
          this.isAuthenticated.set(false);
          if (err.status !== 401) {
            console.error('Unexpected error fetching user', err);
          }
          return EMPTY;
        }),
      )
      .subscribe((u) => {
        u.profilePictureUrl ??= FALLBACK_IMAGE_URL;
        this.user.set(u);
        this.isAuthenticated.set(true);
      });
  }
}
