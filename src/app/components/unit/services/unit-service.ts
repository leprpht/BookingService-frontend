import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GraphQLQueries } from './graphql-queries';
import type { UnitDetails } from '../../../models/types/unitDetails';
import type { PeriodRequest } from '../../../models/requests/periodRequest';
import { environment } from '../../../../environments/environment';
import { UnitAdditionalService } from '../../../models/types/unitAdditionalServices';

const GRAPHQL_URL = `${environment.apiUrl}/graphql`;

interface GraphQlResponse<T> {
  data: T;
  errors?: { message: string }[];
}

interface UnitDetailsData {
  unitById: UnitDetails;
}

interface UnitAdditionalServicesData {
  unitAdditionalServices: UnitAdditionalService[];
}

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private readonly http: HttpClient = inject(HttpClient);

  getUnitById(unitId: string, period: PeriodRequest): Observable<UnitDetails> {
    return this.http
      .post<GraphQlResponse<UnitDetailsData>>(GRAPHQL_URL, {
        query: GraphQLQueries.getUnitById,
        variables: { unitId, period },
      })
      .pipe(
        map((res) => {
          if (res.errors?.length) {
            throw new Error(res.errors.map((e) => e.message).join(', '));
          }
          return res.data.unitById;
        }),
      );
  }

  getUnitAdditionalServices(unitId: string): Observable<UnitAdditionalService[]> {
    return this.http
      .post<GraphQlResponse<UnitAdditionalServicesData>>(GRAPHQL_URL, {
        query: GraphQLQueries.getUnitAdditionalServices,
        variables: { unitId },
      })
      .pipe(
        map((res) => {
          if (res.errors?.length) {
            throw new Error(res.errors.map((e) => e.message).join(', '));
          }
          return res.data.unitAdditionalServices;
        }),
      );
  }
}
