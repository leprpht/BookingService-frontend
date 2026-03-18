import {Component, input, output} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {PropertyUnitCard} from '../property-unit-card/property-unit-card';
import type {UnitListItem} from '../../models/types/unitListItem';

@Component({
  selector: 'app-property-units-list',
  imports: [MatDividerModule, MatIconModule, PropertyUnitCard],
  templateUrl: './property-units-list.html',
  styleUrl: './property-units-list.scss',
})
export class PropertyUnitsList {
  readonly units = input.required<UnitListItem[]>();
  readonly nightsCount = input.required<number>();
  readonly dateRangeLabel = input<string>('');
  readonly period = input<{from: string; to: string} | null>(null);

  readonly bookUnit = output<UnitListItem>();
}