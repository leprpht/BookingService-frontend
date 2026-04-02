import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchContainer } from '../search/search-container';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { AuthButtons } from './auth-buttons/auth-buttons';

@Component({
  standalone: true,
  selector: 'booking-service-header',
  imports: [MatToolbarModule, MatButtonModule, SearchContainer, AuthButtons],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);

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

  goHome() {
    this.router.navigate(['/']);
  }
}
