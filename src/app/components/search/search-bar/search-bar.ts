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
  selector: 'booking-service-search-bar',
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
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  readonly minDate = new Date();
  readonly form = input.required<FormGroup>();

  get searchQuery(): FormControl<string> {
    return this.form().get('searchQuery') as FormControl<string>;
  }

  get searchQueryValue(): string {
    return this.searchQuery.value.trim();
  }

  get period(): FormGroup {
    return this.form().get('period') as FormGroup;
  }

  get from(): FormControl<Date | null> {
    return this.period.get('from') as FormControl<Date | null>;
  }

  get fromValue(): Date | null {
    return this.from.value;
  }

  get to(): FormControl<Date | null> {
    return this.period.get('to') as FormControl<Date | null>;
  }

  get toValue(): Date | null {
    return this.to.value;
  }
}
