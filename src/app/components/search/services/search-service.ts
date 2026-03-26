import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GraphQLQueries } from './graphql-queries';
import type { PropertyCard } from '../../../models/types/propertyCard';
import type { HousingFilterOptions } from '../../../models/filters/housingFilterOptions';
import type { PageRequest } from '../../../models/requests/pageRequest';

const GRAPHQL_URL = `${environment.apiUrl}/graphql`;

interface GraphQlResponse<T> {
  data: T;
  errors?: { message: string }[];
}

interface SearchData {
  searchProperties: PropertyCard[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http: HttpClient = inject(HttpClient);

  searchProperties(filter: HousingFilterOptions, page: PageRequest): Observable<PropertyCard[]> {
    const gqlFilter = this.mapFilterToGql(filter);

    return this.http
      .post<GraphQlResponse<SearchData>>(GRAPHQL_URL, {
        query: GraphQLQueries.SEARCH_PROPERTIES_QUERY,
        variables: { filter: gqlFilter, page },
      })
      .pipe(
        map((res) => {
          if (res.errors?.length) {
            console.error('GraphQL errors:', res.errors);
          }
          return res.data?.searchProperties ?? [];
        }),
      );
  }

  private mapFilterToGql(filter: HousingFilterOptions) {
    return {
      period: {
        from: filter.period.from,
        to: filter.period.to,
      },
      searchQuery: filter.searchQuery ?? '',
      city: filter.city ? filter.city.split(',')[0].trim() : null,
      country: filter.country ?? null,
      minPrice: filter.minPrice,
      maxPrice: filter.maxPrice,
      tags: filter.tags ?? null,
      minRating: filter.minRating,
      capacities: filter.capacities ?? null,
    };
  }
}
