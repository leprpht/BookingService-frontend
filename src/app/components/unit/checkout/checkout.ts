import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UnitService } from '../services/unit-service';
import { withLoadingState } from '../../../operators/with-loading-state';
import { PeriodRequest } from '../../../models/requests/periodRequest';
import { UnitDetails } from '../../../models/types/unitDetails';

@Component({
  selector: 'booking-service-unit-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  readonly route = inject(ActivatedRoute);
  readonly service = inject(UnitService);
  
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly unit = signal<UnitDetails | null>(null);
  readonly dates = signal<PeriodRequest | null>(null);

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

  get unitId(): string {
    return this.unit()?.id ?? '';
  }

  get unitName(): string {
    return this.unit()?.name ?? '';
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
