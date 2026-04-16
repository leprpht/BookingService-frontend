import { Component, effect, inject, input, output, signal } from '@angular/core';
import { UnitService } from '../services/unit-service';
import { UnitAdditionalService } from '../../../models/types/unitAdditionalServices';
import { withLoadingState } from '../../../operators/with-loading-state';
import { MatCardModule } from '@angular/material/card';
import { DecimalPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'booking-service-unit-additional-services',
  imports: [MatCardModule, MatCheckboxModule, DecimalPipe, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './additional-services.html',
  styleUrl: './additional-services.scss',
})
export class AdditionalServices {
  readonly service = inject(UnitService);

  readonly unitId = input.required<string>();

  readonly additionalServices = signal<UnitAdditionalService[]>([]);
  readonly loading = signal(true);
  readonly selectedIds = signal<string[]>([]);

  readonly selectionChange = output<UnitAdditionalService[]>();

  constructor() {
    effect(() => {
      this.loadAdditionalServices();
    });
  }

  isSelected(serviceId: string): boolean {
    return this.selectedIds().includes(serviceId);
  }

  toggleService(serviceId: string): void {
    this.selectedIds.update((ids) => {
      const updated = ids.includes(serviceId)
        ? ids.filter((id) => id !== serviceId)
        : [...ids, serviceId];

      const selected = this.additionalServices().filter((s) => updated.includes(s.id));
      this.selectionChange.emit(selected);
      return updated;
    });
  }

  private loadAdditionalServices(): void {
    this.service
      .getUnitAdditionalServices(this.unitId())
      .pipe(withLoadingState({ loading: this.loading }))
      .subscribe((s) => this.additionalServices.set(s));
  }
}
