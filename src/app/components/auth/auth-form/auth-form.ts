import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmailInput } from '../email-input/email-input';
import { PasswordInput } from '../password-input/password-input';
import { AuthService } from '../services/auth-service';
import { AuthDialogMode } from '../../header/header';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'booking-service-auth-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EmailInput,
    PasswordInput,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  private readonly service = inject(AuthService);
  buttonLabel = input.required<string>();
  authType = input.required<AuthDialogMode>();

  readonly form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/),
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      if (!email || !password) return;

      if (this.authType() === 'login') {
        this.service.login(email, password).subscribe({
          next: (res) => {
            console.log('Login successful:', res);
          },
          error: (err) => {
            console.error('Login failed:', err);
          },
        });
      } else {
        this.service.register(email, password).subscribe({
          next: (res) => {
            console.log('Registration successful:', res);
          },
          error: (err) => {
            console.error('Registration failed:', err);
          },
        });
      }
    }
  }
}
