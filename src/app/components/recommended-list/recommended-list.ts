import {Component, effect, inject, input, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';
import {GraphQlService} from '../../services/graphql-service';
import {PeriodRequest} from '../../models/requests/periodRequest';
import type {PropertyCard} from '../../models/types/propertyCard';

@Component({
  selector: 'booking-service-recommended-list',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    DecimalPipe
  ],
  templateUrl: './recommended-list.html',
  styleUrl: './recommended-list.scss',
})
export class RecommendedList {
  readonly city = input.required<string>();
  properties = signal<PropertyCard[]>([]);
  loading = signal(true);
  private readonly graphQlService = inject(GraphQlService);
  private readonly router = inject(Router);
  private readonly defaultPeriod: PeriodRequest = {
    from: new Date().toISOString().split('T')[0],
    to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };

  constructor() {
    effect(() => {
      this.loading.set(true);

      this.graphQlService
        .getTopPropertiesByCity(this.city())
        .subscribe({
          next: props => {
            this.properties.set(props);
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
          },
        });
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['/property', id], {queryParams: {from: this.defaultPeriod.from, to: this.defaultPeriod.to}});
  }
}
