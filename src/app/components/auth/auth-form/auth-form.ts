import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmailInput } from '../email-input/email-input';
import { PasswordInput } from '../password-input/password-input';
import { AuthService } from '../services/auth-service';
import { AuthDialogMode } from '../../header/auth-buttons/auth-buttons';
import { withLoadingState } from '../../../operators/with-loading-state';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

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
  private readonly router = inject(Router);

  buttonLabel = input.required<string>();
  authType = input.required<AuthDialogMode>();
  dialogRef = input.required<DialogRef>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

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
    if (!this.form.valid) return;

    const { email, password } = this.form.value;
    if (!email || !password) return;

    if (this.authType() === 'login') {
      this.service
        .login(email, password)
        .pipe(withLoadingState({ loading: this.loading, error: this.error }))
        .subscribe({
          next: () => {
            this.dialogRef().close();
          },
        });
    } else {
      this.service
        .register(email, password)
        .pipe(withLoadingState({ loading: this.loading, error: this.error }))
        .subscribe({
          next: () => {
            this.dialogRef().close();
            this.router.navigate(['/']);
          },
        });
    }
  }
}
