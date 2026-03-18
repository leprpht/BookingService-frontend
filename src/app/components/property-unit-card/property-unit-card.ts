import {Component, input, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import type { UnitListItem } from '../../models/types/unitListItem';

@Component({
  selector: 'app-property-unit-card',
  imports: [DecimalPipe, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './property-unit-card.html',
  styleUrl: './property-unit-card.scss',
})
export class PropertyUnitCard {
  readonly unit = input.required<UnitListItem>();
  readonly nightsCount = input.required<number>();

  readonly book = output<UnitListItem>();

  selectUnit() {
    if (this.unit().availableRooms > 0) {
      this.book.emit(this.unit());
    }
  }
}