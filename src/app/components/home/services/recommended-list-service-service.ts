import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GraphQLQueries } from './graphql-queries';
import type { PropertyCard, PropertiesData } from '../../../models/types/propertyCard';
import { environment } from '../../../../environments/environment';

const GRAPHQL_URL = `${environment.apiUrl}/graphql`;

interface GraphQlResponse<T> {
  data: T;
  errors?: { message: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class RecommendedListService {
  private http: HttpClient = inject(HttpClient);

  getTopPropertiesByCity(city: string, count = 6): Observable<PropertyCard[]> {
    return this.http
      .post<GraphQlResponse<PropertiesData>>(GRAPHQL_URL, {
        query: GraphQLQueries.topPropertiesQuery,
        variables: { city, count },
      })
      .pipe(
        map((res) => {
          console.log('raw response:', res);
          if (res.errors?.length) {
            throw new Error(res.errors.map((e) => e.message).join(', '));
          }
          return res.data.topPropertiesByCity;
        }),
      );
  }
}
