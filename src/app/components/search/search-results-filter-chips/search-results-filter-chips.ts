import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'booking-service-search-results-filter-chips',
  imports: [MatChipsModule],
  templateUrl: './search-results-filter-chips.html',
  styleUrl: './search-results-filter-chips.scss',
})
export class SearchResultsFilterChips {
  readonly chips = input.required<string[]>();
}
