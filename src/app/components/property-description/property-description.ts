import {Component, computed, inject, input, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {DecimalPipe} from '@angular/common';
import type {PropertyDetails} from '../../models/types/propertyDetails';

const TRUNCATE_LENGTH = 320;

@Component({
  selector: 'app-property-description',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, DecimalPipe],
  templateUrl: './property-description.html',
  styleUrl: './property-description.scss',
})
export class PropertyDescription {
  readonly property = input.required<PropertyDetails>();

  readonly expanded = signal(false);

  readonly needsTruncation = computed(() =>
    (this.property().description ?? '').length > TRUNCATE_LENGTH,
  );

  readonly displayedText = computed(() => {
    const desc = this.property().description ?? '';
    if (!this.needsTruncation() || this.expanded()) return desc;
    return desc.slice(0, TRUNCATE_LENGTH).trimEnd() + '…';
  });

  readonly ratingLabel = computed(() => {
    const r = this.property().averageRating;
    if (r >= 4.8) return 'Exceptional';
    if (r >= 4.5) return 'Excellent';
    if (r >= 4.0) return 'Very good';
    if (r >= 3.5) return 'Good';
    if (r > 0) return 'Satisfactory';
    return 'No rating yet';
  });

  private readonly dialog = inject(MatDialog);

  toggleExpanded(): void {
    this.expanded.update(v => !v);
  }
}