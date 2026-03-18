import {Component, computed, inject, OnDestroy, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SearchService} from '../../services/search-service';
import {withAppendLoadingState, withLoadingState} from '../../operators/with-loading-state';
import type {PropertyCard} from '../../models/types/propertyCard';
import type {HousingFilterOptions} from '../../models/filters/housingFilterOptions';

export type SortOption = 'best-match' | 'price-asc' | 'price-desc' | 'rating-desc' | 'reviews-desc';

const PAGE_SIZE = 12;

@Component({
  selector: 'booking-service-search-results',
  imports: [
    DecimalPipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults implements OnDestroy {
  readonly allResults = signal<PropertyCard[]>([]);
  readonly loading = signal(true);
  readonly loadingMore = signal(false);
  readonly currentPage = signal(1);
  readonly hasMore = signal(false);
  readonly activeFilter = signal<HousingFilterOptions | null>(null);
  readonly sortBy = signal<SortOption>('best-match');
  readonly error = signal<string | null>(null);

  readonly sortedResults = computed(() => {
    const results = [...this.allResults()];
    switch (this.sortBy()) {
      case 'price-asc':   return results.sort((a, b) => a.price - b.price);
      case 'price-desc':  return results.sort((a, b) => b.price - a.price);
      case 'rating-desc': return results.sort((a, b) => b.rating - a.rating);
      case 'reviews-desc':return results.sort((a, b) => b.reviewCount - a.reviewCount);
      default:            return results.sort((a, b) => b.rankingScore - a.rankingScore);
    }
  });

  readonly activeFilterChips = computed(() => {
    const f = this.activeFilter();
    if (!f) return [];
    const chips: string[] = [];
    if (f.city)                          chips.push(`📍 ${f.city}`);
    if (f.country)                       chips.push(`🌍 ${f.country}`);
    if (f.minPrice)                      chips.push(`💰 $${f.minPrice}+ / night`);
    if (f.maxPrice && f.maxPrice < 200)  chips.push(`💰 max $${f.maxPrice} / night`);
    if (f.minRating)                     chips.push(`⭐ ${f.minRating}+`);
    if (f.capacities?.length)            chips.push(`👥 ${f.capacities.join(', ')} guests`);
    if (f.tags?.length)                  chips.push(`🏷️ ${f.tags.length} tag(s)`);
    return chips;
  });

  readonly nightsCount = computed(() => {
    const f = this.activeFilter();
    if (!f) return 1;
    const from = new Date(f.period.from);
    const to = new Date(f.period.to);
    return Math.max(1, Math.round((to.getTime() - from.getTime()) / 86_400_000));
  });

  readonly skeletons = Array.from({length: PAGE_SIZE});

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly searchService = inject(SearchService);
  private readonly sub = new Subscription();

  constructor() {
    this.sub.add(
      this.route.queryParams.subscribe(params => {
        const raw = params['filter'];
        if (!raw) {
          this.error.set('No search filter provided.');
          this.loading.set(false);
          return;
        }
        try {
          const filter: HousingFilterOptions = JSON.parse(decodeURIComponent(raw));
          this.activeFilter.set(filter);
          this.allResults.set([]);
          this.currentPage.set(1);
          this.hasMore.set(false);
          this.error.set(null);
          this.fetchPage(filter, 1, false);
        } catch {
          this.error.set('Invalid search parameters.');
          this.loading.set(false);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadMore(): void {
    const filter = this.activeFilter();
    if (!filter) return;
    const nextPage = this.currentPage() + 1;
    this.currentPage.set(nextPage);
    this.fetchPage(filter, nextPage, true);
  }

  onSortChange(value: SortOption): void {
    this.sortBy.set(value);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  dateRangeLabel(): string {
    const f = this.activeFilter();
    if (!f) return '';
    const from = new Date(f.period.from);
    const to = new Date(f.period.to);
    const fmt = (d: Date) => d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    return `${fmt(from)} - ${fmt(to)}`;
  }

  private fetchPage(filter: HousingFilterOptions, page: number, append: boolean): void {
    const operator = append
      ? withAppendLoadingState<PropertyCard[]>({
          loadingMore: this.loadingMore,
          error: this.error,
          errorMessage: 'Failed to load results. Please try again.',
        })
      : withLoadingState<PropertyCard[]>({
          loading: this.loading,
          error: this.error,
          errorMessage: 'Failed to load results. Please try again.',
        });

    this.sub.add(
      this.searchService
        .searchProperties(filter, {pageNumber: page, pageSize: PAGE_SIZE})
        .pipe(operator)
        .subscribe(results => {
          if (append) {
            this.allResults.update(prev => [...prev, ...results]);
          } else {
            this.allResults.set(results);
          }
          this.hasMore.set(results.length === PAGE_SIZE);
        }),
    );
  }
}