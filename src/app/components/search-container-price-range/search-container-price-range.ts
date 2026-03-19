import { Component, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'booking-service-search-container-price-range',
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
  templateUrl: './search-container-price-range.html',
  styleUrl: './search-container-price-range.scss',
})
export class SearchContainerPriceRange {
  readonly form = input.required<FormGroup>();

  get priceString(): string {
    const min = this.minPrice;
    const max = this.maxPrice;
    return `$${min} - ${max >= 205 ? '$200+' : '$' + max}`;
  }

  get minPrice(): number {
    return this.form().get('minPrice')?.value ?? 10;
  }

  get maxPrice(): number {
    return this.form().get('maxPrice')?.value ?? 205;
  }
}
