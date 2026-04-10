import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { UserService, UserStateService } from '../../shared/services';
import { withLoadingState } from '../../operators/with-loading-state';

@Component({
  selector: 'booking-service-profile-setup',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatButton,
  ],
  templateUrl: './profile-setup.html',
  styleUrl: './profile-setup.scss',
})
export class ProfileSetup {
  private readonly userService = inject(UserService);
  private readonly userState = inject(UserStateService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  onSubmit() {
    if (this.form.invalid) return;
    const { firstName, middleName, lastName } = this.form.value;

    this.userService
      .updateName({
        firstName: firstName!,
        middleName: middleName || undefined,
        lastName: lastName!,
      })
      .pipe(withLoadingState({ loading: this.loading, error: this.error }))
      .subscribe({
        next: () => {
          this.userState.refresh();
          window.location.reload();
        },
      });
  }
}
