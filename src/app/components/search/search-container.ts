import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { Bar } from './container/bar/bar';
import { Tags } from './container/tags/tags';
import { City } from './container/city/city';
import { Country } from './container/country/country';
import { PriceRange } from './container/price-range/price-range';
import { Rating } from './container/rating/rating';
import { Capacities } from './container/capacities/capacities';
import type { HousingFilterOptions } from '../../models/filters/housingFilterOptions';

@Component({
  selector: 'booking-service-search-container',
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
    Bar,
    Tags,
    City,
    Country,
    PriceRange,
    Rating,
    Capacities,
  ],
  templateUrl: './search-container.html',
  styleUrl: './search-container.scss',
})
export class SearchContainer {
  readonly filterForm = new FormGroup({
    searchQuery: new FormControl<string>(''),
    period: new FormGroup({
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null),
    }),
    tags: new FormControl<string[] | null>(null),
    city: new FormControl<string>(''),
    country: new FormControl<string>(''),
    minPrice: new FormControl<number>(10),
    maxPrice: new FormControl<number>(205),
    minRating: new FormControl<number | null>(null),
    capacities: new FormControl<number[]>([]),
  });

  private readonly router = inject(Router);

  onSearch(): void {
    const raw = this.filterForm.getRawValue();

    if (!raw.period.from || !raw.period.to) return;

    const dto = this.buildDto(raw);
    const filterParam = encodeURIComponent(JSON.stringify(dto));
    this.router.navigate(['/search'], { queryParams: { filter: filterParam } });
  }

  private buildDto(value: ReturnType<typeof this.filterForm.getRawValue>): HousingFilterOptions {
    const minPrice = (value.minPrice ?? 10) <= 10 ? null : value.minPrice;
    const maxPrice = (value.maxPrice ?? 205) >= 205 ? null : value.maxPrice;
    const capacities = value.capacities?.length ? value.capacities : null;

    return {
      period: {
        from: this.toDateString(value.period.from),
        to: this.toDateString(value.period.to),
      },
      searchQuery: value.searchQuery ?? '',
      city: value.city || null,
      country: value.country || null,
      minPrice,
      maxPrice,
      tags: value.tags?.length ? value.tags : null,
      minRating: value.minRating ?? null,
      capacities,
    };
  }

  private toDateString(date: Date | null): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }
}
