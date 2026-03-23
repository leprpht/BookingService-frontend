import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { HousingFilterOptions } from '../../../models/filters/housingFilterOptions';
import type { SortOption } from '../../../models/filters/sortOption';

@Component({
  selector: 'booking-service-search-results-header',
  imports: [MatButtonModule, MatIconModule, MatSelectModule, MatTooltipModule],
  templateUrl: './search-results-header.html',
  styleUrl: './search-results-header.scss',
})
export class SearchResultsHeader {
  readonly loading = input.required<boolean>();
  readonly activeFilter = input<HousingFilterOptions | null>(null);
  readonly resultCount = input.required<number>();
  readonly hasMore = input.required<boolean>();
  readonly nightsCount = input.required<number>();
  readonly dateRangeLabel = input.required<string>();
  readonly sortBy = input.required<SortOption>();

  readonly goHome = output<void>();
  readonly sortChange = output<SortOption>();
}
