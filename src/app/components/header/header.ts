import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchContainer } from '../search/search-container';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { AuthButtons } from './auth-buttons/auth-buttons';
import { ProfileButton } from './profile-button/profile-button';
import { UserStateService } from '../../shared/services/user-state-service';

@Component({
  standalone: true,
  selector: 'booking-service-header',
  imports: [MatToolbarModule, MatButtonModule, SearchContainer, AuthButtons, ProfileButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly userState = inject(UserStateService);
  readonly user = this.userState.user;
  readonly isAuthenticated = this.userState.isAuthenticated;

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
    this.userState.refresh();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
