import { Component, effect, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { GraphQlService } from '../../services/graphql-service';
import { PeriodRequest } from '../../models/requests/periodRequest';
import { withLoadingState } from '../../operators/with-loading-state';
import { FALLBACK_IMAGE_URL } from '../../data/fallback-image';
import type { PropertyCard } from '../../models/types/propertyCard';

@Component({
  selector: 'booking-service-recommended-list',
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
  readonly properties = signal<PropertyCard[]>([]);
  readonly loading = signal(true);

  private readonly graphQlService = inject(GraphQlService);
  private readonly router = inject(Router);

  private readonly defaultPeriod: PeriodRequest = {
    from: new Date().toISOString().split('T')[0],
    to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };

  constructor() {
    effect(() => {
      this.graphQlService
        .getTopPropertiesByCity(this.city())
        .pipe(withLoadingState({ loading: this.loading }))
        .subscribe((props) =>
          this.properties.set(
            props.map((p) => ({ ...p, pictureUrl: p.pictureUrl ?? FALLBACK_IMAGE_URL })),
          ),
        );
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/property', id], {
      queryParams: { from: this.defaultPeriod.from, to: this.defaultPeriod.to },
    });
  }
}
