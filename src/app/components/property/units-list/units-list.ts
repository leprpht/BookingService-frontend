import { Component, input, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { UnitCard } from '../unit-card/unit-card';
import type { UnitListItem } from '../../../models/types/unitListItem';

@Component({
  selector: 'booking-service-property-units-list',
  imports: [MatDividerModule, MatIconModule, UnitCard],
  templateUrl: './units-list.html',
  styleUrl: './units-list.scss',
})
export class UnitsList {
  readonly units = input.required<UnitListItem[]>();
  readonly nightsCount = input.required<number>();
  readonly dateRangeLabel = input<string>('');
  readonly period = input<{ from: string; to: string } | null>(null);

  readonly bookUnit = output<UnitListItem>();
}
