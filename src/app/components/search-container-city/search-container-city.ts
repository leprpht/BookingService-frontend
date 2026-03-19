import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../services/location-service';

@Component({
  selector: 'booking-service-search-container-city',
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
  templateUrl: './search-container-city.html',
  styleUrl: './search-container-city.scss',
})
export class SearchContainerCity {
  readonly form = input.required<FormGroup>();
  private readonly locationService = inject(LocationService);

  readonly filteredCities = toSignal(
    toObservable(this.form).pipe(
      switchMap((form) =>
        (form.get('city') as FormControl<string>).valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter((query) => query !== null && query.trim().length >= 3 && query.length <= 30),
          switchMap((query) => this.locationService.autocomplete(query!)),
        ),
      ),
    ),
    { initialValue: [] as string[] },
  );

  get cityControl(): FormControl<string> {
    return this.form().get('city') as FormControl<string>;
  }
}
