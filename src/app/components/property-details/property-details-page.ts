import {Component, computed, inject, OnDestroy, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {GraphQlService} from '../../services/graphql-service';
import {PropertyHeader} from '../property-header/property-header';
import {PropertyUnitsList} from '../property-units-list/property-units-list';
import type {PropertyDetails} from '../../models/types/propertyDetails';
import { UnitListItem } from '../../models/types/unitListItem';

@Component({
  selector: 'app-property-details',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    PropertyHeader,
    PropertyUnitsList
  ],
  templateUrl: './property-details-page.html',
  styleUrl: './property-details-page.scss',
})
export class PropertyDetailsPage implements OnDestroy {
  readonly property = signal<PropertyDetails | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly period = signal<{from: string; to: string} | null>(null);

  readonly nightsCount = computed(() => {
    const p = this.period();
    if (!p) return 1;
    const from = new Date(p.from);
    const to = new Date(p.to);
    return Math.max(1, Math.round((to.getTime() - from.getTime()) / 86_400_000));
  });

  readonly dateRangeLabel = computed(() => {
    const p = this.period();
    if (!p) return '';
    const fmt = (d: Date) => d.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    return `${fmt(new Date(p.from))} - ${fmt(new Date(p.to))}`;
  });

  readonly locationLabel = computed(() => {
    const prop = this.property();
    if (!prop) return '';
    return [prop.city, prop.state, prop.country].filter(Boolean).join(', ');
  });

  readonly availableUnits = computed(() =>
    this.property()?.units.filter(u => u.availableRooms > 0) ?? [],
  );

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly graphQlService = inject(GraphQlService);
  private readonly sub = new Subscription();

  constructor() {
    this.sub.add(
      combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
      ]).subscribe(([params, query]) => {
  
        const propertyId = params.get('id');
        const from = query.get('from');
        const to = query.get('to');
  
        if (!propertyId) return;
  
        if (from && to) {
          this.period.set({ from, to });
        } else {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
  
          this.period.set({
            from: today.toISOString().split('T')[0],
            to: tomorrow.toISOString().split('T')[0],
          });
        }
  
        this.fetchProperty(propertyId, this.period()!);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  bookUnit(unit: UnitListItem): void {
    console.log('Book unit:', unit.id);
  }

  private fetchProperty(propertyId: string, period: {from: string; to: string}): void {
    this.loading.set(true);
    this.error.set(null);

    this.graphQlService.getPropertyDetails(propertyId, period).subscribe({
      next: prop => {
        this.property.set(prop);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load property details. Please try again.');
        this.loading.set(false);
      },
    });
  }
}