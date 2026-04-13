import { Component, input } from '@angular/core';
import { UnitCustomization } from '../../../models/types/unitDetails';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'booking-service-unit-facilities',
  imports: [MatCardModule],
  templateUrl: './facilities.html',
  styleUrl: './facilities.scss',
})
export class Facilities {
  readonly facilities = input.required<UnitCustomization[]>();
}
