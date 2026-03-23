import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'booking-service-search-results-filter-chips',
  imports: [MatChipsModule],
  templateUrl: './filter-chips.html',
  styleUrl: './filter-chips.scss',
})
export class FilterChips {
  readonly chips = input.required<string[]>();
}
