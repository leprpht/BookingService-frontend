import { Component, computed, inject } from '@angular/core';
import { Header } from './header/header';
import { AuthDialogMode } from '../header/header';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { AuthForm } from './auth-form/auth-form';

@Component({
  selector: 'booking-service-auth',
  imports: [Header, AuthForm],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  readonly authType = inject<AuthDialogMode>(DIALOG_DATA);

  title = computed(() =>
    this.authType === 'login' ? 'Login to your account' : 'Create a new account',
  );

  buttonLabel = computed(() => (this.authType === 'login' ? 'Sign in' : 'Sign up'));
}
