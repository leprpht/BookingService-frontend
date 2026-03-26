import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'booking-service-auth-password-input',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInput implements OnInit {
  readonly form = input.required<FormGroup>();

  hide = signal(true);

  errorMessage = signal('');

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorMessage());
  }

  changePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.password.hasError('minlength')) {
      this.errorMessage.set('Password must be at least 8 characters long');
    } else if (this.password.hasError('pattern')) {
      this.errorMessage.set('Password must contain at least one letter and one number');
    } else {
      this.errorMessage.set('');
    }
  }

  get password(): FormControl<string> {
    return this.form().get('password') as FormControl<string>;
  }
}
