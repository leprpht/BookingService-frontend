import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchContainer } from '../search/search-container';
import { NavigationEnd, Router } from '@angular/router';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { Login } from '../auth/login/login';
import { Registration } from '../auth/registration/registration';

@Component({
  standalone: true,
  selector: 'booking-service-header',
  imports: [MatToolbarModule, MatButtonModule, SearchContainer],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);

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

  openLogin(): void {
    const dialogRef = this.dialog.open<string>(Login);

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Dialog result:', result);
    });
  }

  openRegistration(): void {
    const dialogRef = this.dialog.open<string>(Registration);

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Dialog result:', result);
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
