import {Component, effect, inject, input, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {DecimalPipe} from '@angular/common';
import type {PropertyCard} from '../../models/types/propertyCard';
import {GraphQlService} from '../../services/graphql-service';

@Component({
  selector: 'app-recommended-list',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    DecimalPipe,
  ],
  templateUrl: './recommended-list.html',
  styleUrl: './recommended-list.scss',
})
export class RecommendedList {
  readonly city = input.required<string>();
  properties = signal<PropertyCard[]>([]);
  loading = signal(true);
  private readonly graphQlService = inject(GraphQlService);

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
}
