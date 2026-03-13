import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {GraphQLQueries} from './graphql-queries';
import type {PropertyCard, PropertiesData} from '../models/types/propertyCard';
import type {PropertyDetails, PropertyDetailsData} from '../models/types/propertyDetails';

const GRAPHQL_URL = 'http://localhost:5275/graphql';

interface GraphQlResponse<Type> {
  data: Type;
  errors?: { message: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class GraphQlService {
  constructor(private readonly http: HttpClient) {
  }

  getTopPropertiesByCity(city: string, count = 6): Observable<PropertyCard[]> {
    return this.http.post<GraphQlResponse<PropertiesData>>(GRAPHQL_URL, {
      query: GraphQLQueries.topPropertiesQuery,
      variables: {city, count},
    })
      .pipe(
        map(res => {
            console.log('raw response:', res);
            return res.data.topPropertiesByCity;
          }
        )
      );
  }

  getPropertyDetails(propertyId: string, period: { from: string; to: string }): Observable<PropertyDetails> {
    return this.http.post<GraphQlResponse<PropertyDetailsData>>(GRAPHQL_URL, {
      query: GraphQLQueries.getPropertyDetails,
      variables: {propertyId, period},
    })
      .pipe(
        map(res => {
            console.log('raw response:', res);
            return res.data.getPropertyDetails;
          }
        )
      );
  }
}
