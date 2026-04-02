import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Auth } from '../../auth/auth';
import { Dialog } from '@angular/cdk/dialog';

export type AuthDialogMode = 'login' | 'register';

@Component({
  selector: 'booking-service-header-auth-buttons',
  imports: [MatButton],
  templateUrl: './auth-buttons.html',
  styleUrl: './auth-buttons.scss',
})
export class AuthButtons {
  private readonly dialog = inject(Dialog);

  openAuth(dialogMode: AuthDialogMode): void {
    this.dialog.open(Auth, { data: dialogMode });
  }
}
