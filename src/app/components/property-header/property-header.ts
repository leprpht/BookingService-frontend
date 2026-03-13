import {Component, input, signal} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import type {PropertyDetails} from '../../models/types/propertyDetails';

@Component({
  selector: 'app-property-header',
  imports: [DecimalPipe, MatDividerModule, MatIconModule],
  templateUrl: './property-header.html',
  styleUrl: './property-header.scss',
})
export class PropertyHeader {
  readonly property = input.required<PropertyDetails>();
  readonly location = signal<string>('');
  readonly rating = signal<number | null>(null);

  ngOnChanges() {
    const p = this.property();
    p.state
      ? this.location.set(`${p.city}, ${p.state}, ${p.country}`)
      : this.location.set(`${p.city}, ${p.country}`);
    
    this.rating.set(p.averageRating);
  }
}