import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'booking-service-search-container-rating',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSliderModule,
    MatButtonToggleModule,
  ],
  templateUrl: './search-container-rating.html',
  styleUrl: './search-container-rating.scss',
})
export class SearchContainerRating {
  readonly form = input.required<FormGroup>();
  readonly ratingOptions = [6, 7, 8, 9, 10];

  setMinRating(value: number): void {
    const current = this.ratingControl.value;
    this.ratingControl.setValue(current === value ? null : value);
  }

  checked(value: number): boolean {
    return this.ratingControl.value === value;
  }

  get ratingControl(): FormControl<number | null> {
    return this.form().get('minRating') as FormControl<number | null>;
  }
}
