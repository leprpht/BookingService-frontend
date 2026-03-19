import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import {
  MatAutocompleteModule,
  type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COUNTRIES } from '../../data/countries';
import { SearchBar } from '../search-bar/search-bar';
import type { TagOption } from '../../models/filters/tagOption';
import type { HousingFilterOptions } from '../../models/filters/housingFilterOptions';
import { LocationService } from '../../services/location-service';

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
    SearchBar,
  ],
  templateUrl: './search-container.html',
  styleUrl: './search-container.scss',
})
export class SearchContainer {
  readonly minDate = new Date();

  readonly filterForm = new FormGroup({
    searchQuery: new FormControl<string>(''),
    period: new FormGroup({
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null),
    }),
    city: new FormControl<string>(''),
    country: new FormControl<string>(''),
    minPrice: new FormControl<number>(10),
    maxPrice: new FormControl<number>(205),
    minRating: new FormControl<number | null>(null),
    capacities: new FormControl<number[]>([]),
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly tagInputControl = new FormControl<string>('');
  readonly selectedTags = signal<TagOption[]>([]);

  // TODO: replace with API call — Guids are real backend IDs
  readonly allTags: TagOption[] = [
    { id: 'a1b2c3d4-0001-0000-0000-000000000000', name: 'Beachfront' },
    { id: 'a1b2c3d4-0002-0000-0000-000000000000', name: 'Pet-friendly' },
    { id: 'a1b2c3d4-0003-0000-0000-000000000000', name: 'Pool' },
    { id: 'a1b2c3d4-0004-0000-0000-000000000000', name: 'Spa' },
    { id: 'a1b2c3d4-0005-0000-0000-000000000000', name: 'Free parking' },
    { id: 'a1b2c3d4-0006-0000-0000-000000000000', name: 'Breakfast included' },
    { id: 'a1b2c3d4-0007-0000-0000-000000000000', name: 'City center' },
    { id: 'a1b2c3d4-0008-0000-0000-000000000000', name: 'Family-friendly' },
  ];

  readonly filteredTags = computed(() => {
    const query = (this.tagInputControl.value ?? '').toLowerCase();
    const selectedIds = new Set(this.selectedTags().map((t) => t.id));
    const available = this.allTags.filter((t) => !selectedIds.has(t.id));
    return query ? available.filter((t) => t.name.toLowerCase().includes(query)) : available;
  });
  readonly countries = COUNTRIES.sort((a, b) => a.name.localeCompare(b.name));
  readonly ratingOptions = [6, 7, 8, 9, 10];
  readonly capacityOptions = [2, 3, 4, 5, 6, 7, 8];
  private readonly announcer = inject(LiveAnnouncer);
  private readonly locationService = inject(LocationService);
  readonly filteredCities = toSignal(
    this.filterForm.controls.city.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((query) => query !== null && query.trim().length >= 3 && query.length <= 30),
      switchMap((query) => this.locationService.autocomplete(query!)),
    ),
    { initialValue: [] as string[] },
  );
  private readonly router = inject(Router);

  get priceString(): string {
    const min = this.filterForm.get('minPrice')?.value ?? 10;
    const max = this.filterForm.get('maxPrice')?.value ?? 205;
    return `$${min} - ${max >= 205 ? '$200+' : '$' + max}`;
  }

  removeTag(tag: TagOption): void {
    this.selectedTags.update((tags) => {
      this.announcer.announce(`Removed ${tag.name}`);
      return tags.filter((t) => t.id !== tag.id);
    });
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    const tag: TagOption = event.option.value;
    if (!this.selectedTags().find((t) => t.id === tag.id)) {
      this.selectedTags.update((tags) => [...tags, tag]);
    }
    this.tagInputControl.setValue('');
    event.option.deselect();
  }

  setMinRating(value: number): void {
    const current = this.filterForm.controls.minRating.value;
    this.filterForm.controls.minRating.setValue(current === value ? null : value);
  }

  toggleCapacity(value: number): void {
    const current = this.filterForm.controls.capacities.value ?? [];
    const updated = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value];
    this.filterForm.controls.capacities.setValue(updated);
  }

  isCapacitySelected(value: number): boolean {
    return (this.filterForm.controls.capacities.value ?? []).includes(value);
  }

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
      tags: this.selectedTags().length ? this.selectedTags().map((t) => t.id) : null,
      minRating: value.minRating ?? null,
      capacities,
    };
  }

  private toDateString(date: Date | null): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }
}
