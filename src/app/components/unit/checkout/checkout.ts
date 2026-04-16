import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DecimalPipe, DatePipe } from '@angular/common';
import { UnitService } from '../services/unit-service';
import { withLoadingState } from '../../../operators/with-loading-state';
import { PeriodRequest } from '../../../models/requests/periodRequest';
import { UnitDetails } from '../../../models/types/unitDetails';
import { UnitAdditionalService } from '../../../models/types/unitAdditionalServices';
import { AdditionalServices } from '../additional-services/additional-services';

@Component({
  selector: 'booking-service-unit-checkout',
  imports: [
    AdditionalServices,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly service = inject(UnitService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly unit = signal<UnitDetails | null>(null);
  readonly dates = signal<PeriodRequest | null>(null);
  readonly selectedServices = signal<UnitAdditionalService[]>([]);
  readonly confirmed = signal(false);

  readonly nightsCount = computed(() => {
    const d = this.dates();
    if (!d) return 1;
    const diff = new Date(d.to).getTime() - new Date(d.from).getTime();
    return Math.max(1, Math.round(diff / 86_400_000));
  });

  readonly baseTotal = computed(() => (this.unit()?.price ?? 0) * this.nightsCount());

  readonly servicesTotal = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.price, 0),
  );

  readonly grandTotal = computed(() => this.baseTotal() + this.servicesTotal());

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

  onServicesChange(services: UnitAdditionalService[]): void {
    this.selectedServices.set(services);
  }

  confirmBooking(): void {
    this.confirmed.set(true);
  }

  goBack(): void {
    window.history.back();
  }

  private fetchUnit(unitId: string, period: PeriodRequest): void {
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
