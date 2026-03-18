import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GraphQLQueries } from './graphql-queries';
import type { PropertyCard, PropertiesData } from '../models/types/propertyCard';
import type { PropertyDetails } from '../models/types/propertyDetails';
import { PeriodRequest } from '../models/requests/periodRequest';

const GRAPHQL_URL = 'http://localhost:5275/graphql';

interface GraphQlResponse<Type> {
  data: Type;
  errors?: { message: string }[];
}

interface PropertyDetailsData {
  propertyDetails: PropertyDetails;
}

@Injectable({
  providedIn: 'root',
})
export class GraphQlService {
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

  getPropertyDetails(propertyId: string, period: PeriodRequest): Observable<PropertyDetails> {
    return this.http
      .post<GraphQlResponse<PropertyDetailsData>>(GRAPHQL_URL, {
        query: GraphQLQueries.getPropertyDetails,
        variables: { propertyId, period },
      })
      .pipe(
        map((res) => {
          console.log('raw response:', res);
          if (res.errors?.length) {
            throw new Error(res.errors.map((e) => e.message).join(', '));
          }
          return res.data.propertyDetails;
        }),
      );
  }
}
