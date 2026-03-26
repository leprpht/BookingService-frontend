import { Component, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import type { PropertyDetails } from '../../../models/types/propertyDetails';

const TRUNCATE_LENGTH = 320;

@Component({
  selector: 'booking-service-property-description',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './description.html',
  styleUrl: './description.scss',
})
export class Description {
  readonly property = input.required<PropertyDetails>();

  readonly expanded = signal(false);

  readonly needsTruncation = computed(
    () => (this.property().description ?? '').length > TRUNCATE_LENGTH,
  );

  readonly displayedText = computed(() => {
    const desc = this.property().description ?? '';
    if (!this.needsTruncation() || this.expanded()) return desc;
    return desc.slice(0, TRUNCATE_LENGTH).trimEnd() + '…';
  });

  toggleExpanded(): void {
    this.expanded.update((v) => !v);
  }
}
