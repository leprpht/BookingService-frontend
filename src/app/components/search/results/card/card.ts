import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { PropertyCard } from '../../../../models/types/propertyCard';

@Component({
  selector: 'booking-service-search-results-card',
  imports: [
    DecimalPipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly property = input.required<PropertyCard>();
  readonly nightsCount = input.required<number>();

  readonly view = output<string>();
}
