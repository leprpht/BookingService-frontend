import { Component, inject, input } from '@angular/core';
import { UnitHeaderData } from '../unit-page';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PeriodRequest } from '../../../models/requests/periodRequest';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-service-unit-header',
  imports: [DecimalPipe, MatIconModule, DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly router = inject(Router);

  readonly unitHeaderData = input.required<UnitHeaderData | null>();
  readonly dates = input.required<PeriodRequest | null>();

  get name(): string {
    return this.unitHeaderData()?.name ?? '';
  }

  get capacity(): number {
    return this.unitHeaderData()?.capacity ?? 0;
  }

  get price(): number {
    return this.unitHeaderData()?.price ?? 0;
  }

  get size(): number {
    return this.unitHeaderData()?.size ?? 0;
  }

  get from(): string {
    return this.dates()?.from ?? '';
  }

  get to(): string {
    return this.dates()?.to ?? '';
  }

  get daysCount(): number {
    return this.unitHeaderData()?.daysCount ?? 0;
  }

  searchByDates(): void {
    this.router.navigate(['/search'], {
      queryParams: { filter: this.buildSearchQueryParams() },
    });
  }

  buildSearchQueryParams(): string {
    const period = {
      from: this.from,
      to: this.to,
    };
    return encodeURIComponent(JSON.stringify({ period }));
  }
}
