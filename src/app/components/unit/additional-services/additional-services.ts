import { Component, effect, inject, input, signal } from '@angular/core';
import { UnitService } from '../services/unit-service';
import { UnitAdditionalService } from '../../../models/types/unitAdditionalServices';
import { withLoadingState } from '../../../operators/with-loading-state';
import { MatCardModule } from '@angular/material/card';
import { DecimalPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'booking-service-unit-additional-services',
  imports: [MatCardModule, MatCheckboxModule, DecimalPipe],
  templateUrl: './additional-services.html',
  styleUrl: './additional-services.scss',
})
export class AdditionalServices {
  readonly service = inject(UnitService);

  readonly unitId = input.required<string>();

  readonly additionalServices = signal<UnitAdditionalService[]>([]);
  readonly loading = signal(true);

  selectedAdditionalServices: string[] = [];

  constructor() {
    effect(() => {
      this.loadAdditionalServices();
    });
  }

  isSelected(serviceId: string): boolean {
    return this.selectedAdditionalServices.includes(serviceId);
  }

  toggleService(serviceId: string) {
    if (this.isSelected(serviceId)) {
      const index = this.selectedAdditionalServices.indexOf(serviceId);
      this.selectedAdditionalServices.splice(index, 1);
    } else {
      this.selectedAdditionalServices.push(serviceId);
    }
  }

  private loadAdditionalServices() {
    return this.service
      .getUnitAdditionalServices(this.unitId())
      .pipe(withLoadingState({ loading: this.loading }))
      .subscribe((s) => this.additionalServices.set(s));
  }
}
