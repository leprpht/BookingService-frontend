import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'booking-service-property-gallery',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatIconModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  readonly pictures = input.required<string[]>();

  readonly MAX_VISIBLE = 5;

  readonly visiblePictures = () => this.pictures().slice(0, this.MAX_VISIBLE);
  readonly remainingCount = () => Math.max(0, this.pictures().length - this.MAX_VISIBLE);

  getGridCols(index: number): number {
    if (this.visiblePictures().length === 1) return 4;
    if (this.visiblePictures().length === 2) return 2;
    if (index === 0) return 2;
    return 1;
  }

  getGridRows(index: number): number {
    if (this.visiblePictures().length === 1) return 2;
    if (index === 0) return 2;
    return 1;
  }
}
