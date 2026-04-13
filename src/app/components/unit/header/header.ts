import { Component, input } from '@angular/core';
import { UnitHeaderData } from '../unit-page';
import { DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PeriodRequest } from '../../../models/requests/periodRequest';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'booking-service-unit-header',
  imports: [DecimalPipe, MatIcon, DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
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
}
