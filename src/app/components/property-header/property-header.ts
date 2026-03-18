import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import type { PropertyDetails } from '../../models/types/propertyDetails';

@Component({
  selector: 'booking-service-property-header',
  imports: [DecimalPipe, MatDividerModule, MatIconModule],
  templateUrl: './property-header.html',
  styleUrl: './property-header.scss',
})
export class PropertyHeader {
  readonly property = input.required<PropertyDetails>();

  readonly location = computed(() => {
    const p = this.property();
    return p.state
      ? `${p.address}, ${p.city}, ${p.state}, ${p.country}`
      : `${p.address}, ${p.city}, ${p.country}`;
  });

  readonly rating = computed(() => this.property().averageRating);
}
