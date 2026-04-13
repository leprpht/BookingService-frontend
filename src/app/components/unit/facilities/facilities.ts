import { Component, input } from '@angular/core';
import { UnitCustomization } from '../../../models/types/unitDetails';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'booking-service-unit-facilities',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './facilities.html',
  styleUrl: './facilities.scss',
})
export class Facilities {
  readonly facilities = input.required<UnitCustomization[]>();

  facilityIcon(facilityType: string): string {
    switch (facilityType) {
      case 'Parking':
        return 'local_parking';
      case 'Internet':
        return 'wifi';
      case 'Breakfast':
        return 'free_breakfast';
      case 'Kitchen':
        return 'kitchen';
      case 'Bedroom':
        return 'bed';
      case 'Bathroom':
        return 'bathtub';
      case 'Living Area':
        return 'weekend';
      case 'Media':
        return 'tv';
      case 'Pets':
        return 'pets';
      case 'Miscellaneous':
        return 'miscellaneous_services';
      default:
        return 'help_outline';
    }
  }
}
