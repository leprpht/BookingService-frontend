import { Component, computed, inject, signal } from '@angular/core';
import { UnitService } from './services/unit-service';
import { PeriodRequest } from '../../models/requests/periodRequest';
import { withLoadingState } from '../../operators/with-loading-state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

export interface UnitHeaderData {
  name: string;
  capacity: number;
  price: number;
  size: number;
}

@Component({
  selector: 'booking-service-unit-page',
  imports: [MatProgressSpinnerModule, MatIcon],
  templateUrl: './unit-page.html',
  styleUrl: './unit-page.scss',
})
export class UnitPage {
  readonly service = inject(UnitService);
  readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly unit = signal<UnitHeaderData | null>(null);

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
      this.fetchUnit(unitId, period);
    });
  }

  readonly headerData = computed(() => {
    const unit = this.unit();
    if (!unit) return null;

    return {
      name: unit.name,
      capacity: unit.capacity,
      price: unit.price,
      size: unit.size,
    };
  });

  goBack() {
    window.history.back();
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
