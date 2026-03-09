import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import type { PropertyCard } from '../models/types/propertyCard';
import type { HousingFilterOptions } from '../models/filters/housingFilterOptions';
import type { PageRequest } from '../models/requests/pageRequest';

const GRAPHQL_URL = 'http://localhost:5275/graphql';

const SEARCH_PROPERTIES_QUERY = `
  query SearchProperties($filter: HousingFilterOptionsInput!, $page: PageRequestInput!) {
    searchProperties(filter: $filter, page: $page) {
      id
      name
      address
      city
      state
      country
      price
      pictureUrl
      rating
      rankingScore
      reviewCount
      availableUnits
      tags
    }
  }
`;

interface GraphQlResponse<T> {
  data: T;
  errors?: { message: string }[];
}

interface SearchData {
  searchProperties: PropertyCard[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  searchProperties(filter: HousingFilterOptions, page: PageRequest): Observable<PropertyCard[]> {
    const gqlFilter = this.mapFilterToGql(filter);

    return this.http.post<GraphQlResponse<SearchData>>(GRAPHQL_URL, {
        query: SEARCH_PROPERTIES_QUERY,
        variables: { filter: gqlFilter, page },
      })
      .pipe(
        map(res => {
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