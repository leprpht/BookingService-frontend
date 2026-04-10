import { Component, input } from '@angular/core';
import { UnitHeaderData } from '../unit-page';
import { DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'booking-service-unit-header',
  imports: [DecimalPipe, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly unitHeaderData = input.required<UnitHeaderData>();

  get name(): string {
    return this.unitHeaderData().name;
  }

  get capacity(): number {
    return this.unitHeaderData().capacity;
  }

  get price(): number {
    return this.unitHeaderData().price;
  }

  get size(): number {
    return this.unitHeaderData().size;
  }
}
