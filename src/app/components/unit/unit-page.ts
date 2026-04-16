import { Component, computed, inject, signal } from '@angular/core';
import { UnitService } from './services/unit-service';
import { PeriodRequest } from '../../models/requests/periodRequest';
import { withLoadingState } from '../../operators/with-loading-state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Header } from './header/header';
import { Gallery } from './gallery/gallery';
import { Facilities } from './facilities/facilities';
import { UnitCustomization, UnitDetails } from '../../models/types/unitDetails';
import { MatButtonModule } from '@angular/material/button';

export interface UnitHeaderData {
  name: string;
  capacity: number;
  price: number;
  size: number;
  daysCount: number;
}

@Component({
  selector: 'booking-service-unit-page',
  imports: [MatProgressSpinnerModule, MatIconModule, Header, Gallery, Facilities, MatButtonModule],
  templateUrl: './unit-page.html',
  styleUrl: './unit-page.scss',
})
export class UnitPage {
  readonly service = inject(UnitService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly unit = signal<UnitDetails | null>(null);
  readonly dates = signal<PeriodRequest | null>(null);

  readonly headerData = computed(() => {
    const unit = this.unit();
    if (!unit) return null;

    return {
      name: unit.name,
      capacity: unit.capacity,
      price: unit.price,
      size: unit.size,
      daysCount: this.dates()
        ? Math.ceil(
            (new Date(this.dates()!.to).getTime() - new Date(this.dates()!.from).getTime()) /
              (1000 * 3600 * 24),
          )
        : 0,
    } as UnitHeaderData;
  });

  readonly pictures = computed(() => (this.unit()?.pictures as string[]) ?? []);
  readonly facilities = computed(() => (this.unit()?.customizations as UnitCustomization[]) ?? []);

  constructor() {
    combineLatest({
      params: this.route.params,
      queryParams: this.route.queryParams,
    }).subscribe(({ params, queryParams }) => {
      const unitId = params['id'] as string;
      const period: PeriodRequest = {
        from: queryParams['from'] as string,
        to: queryParams['to'] as string,
      };
      this.dates.set(period);
      this.fetchUnit(unitId, period);
    });
  }

  get propertyName(): string {
    return this.unit()?.propertyName ?? '';
  }

  goBack() {
    window.history.back();
  }

  goToCheckout() {
    this.router.navigate(['checkout', this.unit()?.id], {
      queryParams: {
        from: this.dates()?.from,
        to: this.dates()?.to,
      },
    });
  }

  private fetchUnit(unitId: string, period: PeriodRequest) {
    this.service
      .getUnitById(unitId, period)
      .pipe(
        withLoadingState({
          loading: this.loading,
          error: this.error,
          errorMessage: 'Failed to load unit details. Please try again.',
        }),
      )
      .subscribe((prop) => this.unit.set(prop));
  }
}
