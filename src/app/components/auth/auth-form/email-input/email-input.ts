import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'booking-service-auth-email-input',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './email-input.html',
  styleUrl: './email-input.scss',
})
export class EmailInput implements OnInit {
  readonly form = input.required<FormGroup>();
  errorMessage = signal('');

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else if (this.email.hasError('maxlength')) {
      this.errorMessage.set('Email must be at most 100 characters long');
    } else {
      this.errorMessage.set('');
    }
  }

  get email(): FormControl<string> {
    return this.form().get('email') as FormControl<string>;
  }
}
