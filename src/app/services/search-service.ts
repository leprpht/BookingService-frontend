import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import type { PropertyCard } from '../models/types/propertyCard';

const GRAPHQL_URL = 'http://localhost:5275/graphql';

const TOP_PROPERTIES_QUERY = `
  query topPropertiesByCity($city: String!, $count: Int) {
    topPropertiesByCity(city: $city, count: $count) {
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

interface GraphQlResponse<Type> {
  data: Type;
  errors?: { message: string }[];
}

interface PropertiesData {
  topPropertiesByCity: PropertyCard[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  getTopPropertiesByCity(city: string, count = 6): Observable<PropertyCard[]> {
    return this.http.post<GraphQlResponse<PropertiesData>>(GRAPHQL_URL, {
        query: TOP_PROPERTIES_QUERY,
        variables: { city, count },
      })
      .pipe(
        map(res => {
          console.log('raw response:', res);
          return res.data.topPropertiesByCity;
        })
      )
  }
}