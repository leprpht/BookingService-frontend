import { Component, computed, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchContainer } from '../search/search-container';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { AuthButtons } from './auth-buttons/auth-buttons';
import { UserService } from '../../shared/services/user-service';
import { UserInfo } from '../../models/types/userInfo';
import { FALLBACK_IMAGE_URL } from '../../data/fallback-image';
import { ProfileButton } from './profile-button/profile-button';

@Component({
  standalone: true,
  selector: 'booking-service-header',
  imports: [MatToolbarModule, MatButtonModule, SearchContainer, AuthButtons, ProfileButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  readonly user = signal<UserInfo | null>(null);
  readonly isAuthenticated = signal(false);

  readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly showSearchContainer = computed(
    () => this.currentRoute() === '/' || this.currentRoute().startsWith('/search'),
  );

  readonly showAuthButtons = computed(() => !this.isAuthenticated());

  constructor() {
    this.userService.getUser().subscribe({
      next: (user) => {
        user.profilePictureUrl ??= FALLBACK_IMAGE_URL;
        this.isAuthenticated.set(!!user);
        this.user.set(user);
      },
      error: () => {
        this.user.set(null);
        this.isAuthenticated.set(false);
      },
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
