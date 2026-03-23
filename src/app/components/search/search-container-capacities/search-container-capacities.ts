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
  selector: 'booking-service-search-container-capacities',
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
  templateUrl: './search-container-capacities.html',
  styleUrl: './search-container-capacities.scss',
})
export class SearchContainerCapacities {
  readonly form = input.required<FormGroup>();
  readonly capacityOptions = [2, 3, 4, 5, 6, 7, 8];

  toggleCapacity(value: number): void {
    const current = this.capacitiesControlValue ?? [];
    const updated = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value];
    this.capacitiesControl.setValue(updated);
  }

  isSelected(value: number): boolean {
    return (this.capacitiesControlValue ?? []).includes(value);
  }

  get capacitiesControl(): FormControl<number[]> {
    return this.form().get('capacities') as FormControl<number[]>;
  }

  get capacitiesControlValue(): number[] {
    return this.capacitiesControl.value ?? [];
  }
}
