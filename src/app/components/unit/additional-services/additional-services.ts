import { Component, effect, inject, input, signal } from '@angular/core';
import { UnitService } from '../services/unit-service';
import { UnitAdditionalService } from '../../../models/types/unitAdditionalServices';
import { withLoadingState } from '../../../operators/with-loading-state';

@Component({
  selector: 'booking-service-additional-services',
  imports: [],
  templateUrl: './additional-services.html',
  styleUrl: './additional-services.scss',
})
export class AdditionalServices {
  readonly service = inject(UnitService);

  readonly unitId = input.required<string>();

  readonly additionalServices = signal<UnitAdditionalService[]>([]);
  readonly loading = signal(true);

  constructor() {
    effect(() => {
      this.loadAdditionalServices();
    });
  }

  private loadAdditionalServices() {
    return this.service
      .getUnitAdditionalServices(this.unitId())
      .pipe(withLoadingState({ loading: this.loading }))
      .subscribe((services) => this.additionalServices.set(services));
  }
}
