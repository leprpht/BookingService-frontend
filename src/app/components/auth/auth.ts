import { Component, computed, inject } from '@angular/core';
import { Header } from './header/header';
import { AuthDialogMode } from '../header/header';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { EmailInput } from './email-input/email-input';
import { PasswordInput } from './password-input/password-input';

@Component({
  selector: 'booking-service-auth',
  imports: [Header, EmailInput, PasswordInput],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly authType = inject<AuthDialogMode>(DIALOG_DATA);

  title = computed(() =>
    this.authType === 'login' ? 'Login to your account' : 'Create a new account',
  );
}
